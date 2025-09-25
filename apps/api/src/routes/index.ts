import type { FastifyInstance } from 'fastify';
import healthRoutes from './health.js';
import { AuthController } from '../controllers/authController.js';
import { categoryRoutes } from '../controllers/categoryController.js';

export async function setupRoutes(fastify: FastifyInstance) {
  // Register health routes first (no prefix)
  await fastify.register(healthRoutes);
  
  // Register API routes
  await fastify.register(async function(fastify) {
    // API v1 prefix
    fastify.addHook('preHandler', async (request, reply) => {
      if (request.url.startsWith('/api/v1/')) {
        reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    });

    // Auth routes
    await fastify.register(AuthController.register, { prefix: '/api/v1/auth' });
    
    // Protected routes
    await fastify.register(protectedRoutes, { prefix: '/api/v1' });
  });
}



// Protected routes (require auth)
async function protectedRoutes(fastify: FastifyInstance) {
  // JWT authentication hook for all protected routes
  fastify.addHook('preHandler', fastify.authenticate);

  // Accounts
  fastify.get('/accounts', {
    schema: { 
      tags: ['accounts'],
      security: [{ Bearer: [] }],
    },
  }, async (_request, _reply) => {
    return { success: true, data: [], message: 'Accounts endpoint placeholder' };
  });

  // Transactions
  fastify.get('/transactions', {
    schema: { 
      tags: ['transactions'],
      security: [{ Bearer: [] }],
    },
  }, async (_request, _reply) => {
    return { success: true, data: [], message: 'Transactions endpoint placeholder' };
  });

  // Categories - registrar rotas completas
  await fastify.register(categoryRoutes);

  // Budgets
  fastify.get('/budgets', {
    schema: { 
      tags: ['budgets'],
      security: [{ Bearer: [] }],
    },
  }, async (_request, _reply) => {
    return { success: true, data: [], message: 'Budgets endpoint placeholder' };
  });
}
