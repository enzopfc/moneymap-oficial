import { fastify } from 'fastify';
import { config } from './lib/config.js';
import { setupPlugins } from './plugins/index.js';
import { setupRoutes } from './routes/index.js';

const server = fastify({
  logger: config.nodeEnv === 'development' ? {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  } : true,
  bodyLimit: config.maxFileSize,
  requestIdHeader: 'x-request-id',
  requestIdLogLabel: 'requestId',
  trustProxy: true,
});

async function start() {
  try {
    // Setup plugins
    await setupPlugins(server);
    
    // Setup routes
    await setupRoutes(server);

    // Start server
    await server.listen({
      port: config.port,
      host: '0.0.0.0',
    });

    console.log(`Server listening on http://localhost:${config.port}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully');
  await server.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully');
  await server.close();
  process.exit(0);
});

start();
