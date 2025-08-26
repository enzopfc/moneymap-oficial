import type { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { config } from '../lib/config.js';

export async function setupPlugins(fastify: FastifyInstance) {
  // CORS
  await fastify.register(cors, {
    origin: (origin, callback) => {
      const hostname = new URL(origin || '').hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1' || !origin) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'), false);
    },
  });

  // Security headers
  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  });

  // Rate limiting
  await fastify.register(rateLimit, {
    max: config.rateLimitMax,
    timeWindow: config.rateLimitWindow,
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
    },
  });

  // JWT
  await fastify.register(jwt, {
    secret: config.jwtSecret,
    sign: {
      expiresIn: config.jwtExpiresIn,
    },
  });

  // Multipart support for file uploads
  await fastify.register(multipart, {
    limits: {
      fileSize: config.maxFileSize,
    },
  });

  // OpenAPI documentation
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'MoneyMapp API',
        description: 'API para gestão financeira pessoal',
        version: '1.0.0',
      },
      host: 'localhost:3333',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'auth', description: 'Authentication endpoints' },
        { name: 'accounts', description: 'Account management' },
        { name: 'transactions', description: 'Transaction management' },
        { name: 'categories', description: 'Category management' },
        { name: 'budgets', description: 'Budget management' },
        { name: 'goals', description: 'Goals management' },
        { name: 'debts', description: 'Debt management' },
        { name: 'reports', description: 'Reports and analytics' },
        { name: 'imports', description: 'Data import' },
      ],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
  });
}
