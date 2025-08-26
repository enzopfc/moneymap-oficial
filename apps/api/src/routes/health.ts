import type { FastifyPluginAsync } from 'fastify';

const healthRoutes: FastifyPluginAsync = async (fastify) => {
  // Basic health check
  fastify.get('/health', {
    schema: {
      tags: ['Health'],
      description: 'Health check endpoint',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' },
            uptime: { type: 'number' },
            version: { type: 'string' },
            environment: { type: 'string' },
            services: {
              type: 'object',
              properties: {
                database: { type: 'string' },
                redis: { type: 'string' },
                smtp: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const startTime = Date.now();
    
    // Check database connection
    let dbStatus = 'unknown';
    try {
      if ((fastify as any).prisma) {
        await (fastify as any).prisma.$queryRaw`SELECT 1`;
        dbStatus = 'healthy';
      } else {
        dbStatus = 'disabled';
      }
    } catch (error) {
      dbStatus = 'unhealthy';
    }

    // Check Redis connection
    let redisStatus = 'unknown';
    try {
      if ((fastify as any).redis) {
        await (fastify as any).redis.ping();
        redisStatus = 'healthy';
      } else {
        redisStatus = 'disabled';
      }
    } catch (error) {
      redisStatus = 'unhealthy';
    }

    // SMTP check (basic - just check if configured)
    const smtpStatus = process.env.SMTP_HOST ? 'configured' : 'not-configured';

    const responseTime = Date.now() - startTime;
    
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      responseTime: `${responseTime}ms`,
      services: {
        database: dbStatus,
        redis: redisStatus,
        smtp: smtpStatus
      }
    };

    // Set status code based on service health
    const hasUnhealthy = Object.values(health.services).some(status => status === 'unhealthy');
    const statusCode = hasUnhealthy ? 503 : 200;

    return reply.status(statusCode).send(health);
  });

  // Detailed health check for monitoring
  fastify.get('/health/detailed', {
    schema: {
      tags: ['Health'],
      description: 'Detailed health check with metrics',
      response: {
        200: {
          type: 'object',
          additionalProperties: true
        }
      }
    }
  }, async (request, reply) => {
    const startTime = Date.now();
    const checks: Record<string, any> = {};

    // Database check with timing
    try {
      const dbStart = Date.now();
      if ((fastify as any).prisma) {
        const result = await (fastify as any).prisma.$queryRaw`SELECT version() as version, now() as timestamp`;
        checks.database = {
          status: 'healthy',
          responseTime: `${Date.now() - dbStart}ms`,
          details: result
        };
      } else {
        checks.database = {
          status: 'disabled',
          message: 'Database not configured'
        };
      }
    } catch (error) {
      checks.database = {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    // Redis check with timing
    try {
      const redisStart = Date.now();
      if ((fastify as any).redis) {
        const info = await (fastify as any).redis.info('server');
        checks.redis = {
          status: 'healthy',
          responseTime: `${Date.now() - redisStart}ms`,
          details: {
            uptime: info.split('\n').find((line: string) => line.startsWith('uptime_in_seconds')),
            version: info.split('\n').find((line: string) => line.startsWith('redis_version'))
          }
        };
      } else {
        checks.redis = {
          status: 'disabled',
          message: 'Redis not configured'
        };
      }
    } catch (error) {
      checks.redis = {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    // System metrics
    checks.system = {
      memory: {
        used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
        total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`
      },
      cpu: process.cpuUsage(),
      uptime: `${Math.floor(process.uptime())}s`,
      nodeVersion: process.version
    };

    const totalResponseTime = Date.now() - startTime;
    
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      responseTime: `${totalResponseTime}ms`,
      checks
    };

    // Determine overall status
    const hasUnhealthy = Object.values(checks).some(check => check.status === 'unhealthy');
    const statusCode = hasUnhealthy ? 503 : 200;

    return reply.status(statusCode).send(health);
  });

  // Readiness check (for Kubernetes)
  fastify.get('/health/ready', {
    schema: {
      tags: ['Health'],
      description: 'Readiness check for orchestration',
      response: {
        200: { type: 'object', properties: { status: { type: 'string' } } }
      }
    }
  }, async (request, reply) => {
    // Check if essential services are ready
    let isReady = true;
    const checks: string[] = [];

    // Database readiness
    try {
      if ((fastify as any).prisma) {
        await (fastify as any).prisma.$queryRaw`SELECT 1`;
        checks.push('database:ready');
      }
    } catch (error) {
      isReady = false;
      checks.push('database:not-ready');
    }

    const status = isReady ? 200 : 503;
    return reply.status(status).send({
      status: isReady ? 'ready' : 'not-ready',
      checks
    });
  });

  // Liveness check (for Kubernetes)
  fastify.get('/health/live', {
    schema: {
      tags: ['Health'],
      description: 'Liveness check for orchestration',
      response: {
        200: { type: 'object', properties: { status: { type: 'string' } } }
      }
    }
  }, async (request, reply) => {
    // Simple check if the application is alive
    return reply.status(200).send({
      status: 'alive',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime())
    });
  });
};

export default healthRoutes;
