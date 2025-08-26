import type { FastifyInstance } from 'fastify';

export async function setupRoutes(fastify: FastifyInstance) {
  // Register API routes
  await fastify.register(async function(fastify) {
    // API v1 prefix
    fastify.addHook('preHandler', async (request, reply) => {
      if (request.url.startsWith('/api/v1/')) {
        reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    });

    // Auth routes
    await fastify.register(authRoutes, { prefix: '/api/v1/auth' });
    
    // Protected routes
    await fastify.register(protectedRoutes, { prefix: '/api/v1' });
  });
}

// Auth routes (public)
async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', {
    schema: {
      tags: ['auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 1 },
        },
      },
    },
  }, async (request, reply) => {
    // TODO: Implement login logic
    return { success: true, message: 'Login endpoint placeholder' };
  });

  fastify.post('/register', {
    schema: {
      tags: ['auth'],
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 },
        },
      },
    },
  }, async (request, reply) => {
    // TODO: Implement register logic
    return { success: true, message: 'Register endpoint placeholder' };
  });
}

// Protected routes (require auth)
async function protectedRoutes(fastify: FastifyInstance) {
  // JWT authentication hook
  fastify.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // Accounts
  fastify.get('/accounts', {
    schema: { tags: ['accounts'] },
  }, async (request, reply) => {
    return { success: true, data: [], message: 'Accounts endpoint placeholder' };
  });

  // Transactions
  fastify.get('/transactions', {
    schema: { tags: ['transactions'] },
  }, async (request, reply) => {
    return { success: true, data: [], message: 'Transactions endpoint placeholder' };
  });

  // Categories
  fastify.get('/categories', {
    schema: { tags: ['categories'] },
  }, async (request, reply) => {
    return { success: true, data: [], message: 'Categories endpoint placeholder' };
  });

  // Budgets
  fastify.get('/budgets', {
    schema: { tags: ['budgets'] },
  }, async (request, reply) => {
    return { success: true, data: [], message: 'Budgets endpoint placeholder' };
  });

  // Goals
  fastify.get('/goals', {
    schema: { tags: ['goals'] },
  }, async (request, reply) => {
    return { success: true, data: [], message: 'Goals endpoint placeholder' };
  });

  // Debts
  fastify.get('/debts', {
    schema: { tags: ['debts'] },
  }, async (request, reply) => {
    return { success: true, data: [], message: 'Debts endpoint placeholder' };
  });
}
