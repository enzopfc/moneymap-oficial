import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { loginSchema, registerSchema, type ApiResponse } from '../schemas/index.js';
import { authService } from '../services/authService.js';

export class AuthController {
  static async register(fastify: FastifyInstance) {
    // Register endpoint
    fastify.post('/register', {
      schema: {
        tags: ['auth'],
        summary: 'Registrar novo usuário',
        body: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { 
              type: 'string', 
              minLength: 1, 
              maxLength: 100,
              description: 'Nome completo do usuário' 
            },
            email: { 
              type: 'string', 
              format: 'email',
              description: 'Email único do usuário' 
            },
            password: { 
              type: 'string', 
              minLength: 8,
              pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)',
              description: 'Senha com pelo menos 8 caracteres, incluindo maiúscula, minúscula e número' 
            },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      email: { type: 'string' },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    },
                  },
                  token: { type: 'string' },
                },
              },
              message: { type: 'string' },
            },
          },
          400: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' },
              errors: { type: 'array', items: { type: 'string' } },
            },
          },
        },
      },
    }, async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        // Validate input
        const validatedData = registerSchema.parse(request.body);

        // Register user
        const { user } = await authService.register(validatedData);

        // Generate JWT token
        const token = fastify.jwt.sign(
          { userId: user.id },
          { expiresIn: '7d' }
        );

        const response: ApiResponse = {
          success: true,
          data: { user, token },
          message: 'Usuário registrado com sucesso',
        };

        return reply.status(201).send(response);
      } catch (error) {
        const response: ApiResponse = {
          success: false,
          message: error instanceof Error ? error.message : 'Erro interno do servidor',
        };

        return reply.status(400).send(response);
      }
    });

    // Login endpoint
    fastify.post('/login', {
      schema: {
        tags: ['auth'],
        summary: 'Fazer login',
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { 
              type: 'string', 
              format: 'email',
              description: 'Email do usuário' 
            },
            password: { 
              type: 'string', 
              minLength: 1,
              description: 'Senha do usuário' 
            },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      email: { type: 'string' },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    },
                  },
                  token: { type: 'string' },
                },
              },
              message: { type: 'string' },
            },
          },
          401: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' },
            },
          },
        },
      },
    }, async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        // Validate input
        const validatedData = loginSchema.parse(request.body);

        // Authenticate user
        const { user } = await authService.login(validatedData);

        // Generate JWT token
        const token = fastify.jwt.sign(
          { userId: user.id },
          { expiresIn: '7d' }
        );

        const response: ApiResponse = {
          success: true,
          data: { user, token },
          message: 'Login realizado com sucesso',
        };

        return reply.status(200).send(response);
      } catch (error) {
        const response: ApiResponse = {
          success: false,
          message: error instanceof Error ? error.message : 'Erro interno do servidor',
        };

        return reply.status(401).send(response);
      }
    });

    // Get current user (protected endpoint)
    fastify.get('/me', {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ['auth'],
        summary: 'Obter dados do usuário atual',
        security: [{ Bearer: [] }],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      email: { type: 'string' },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    },
                  },
                },
              },
            },
          },
          401: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' },
            },
          },
        },
      },
    }, async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        // Extract user from JWT
        const { userId } = authService.getUserFromRequest(request);
        
        // Get user data
        const user = await authService.getUserById(userId);
        if (!user) {
          const response: ApiResponse = {
            success: false,
            message: 'Usuário não encontrado',
          };
          return reply.status(404).send(response);
        }

        const response: ApiResponse = {
          success: true,
          data: { user },
        };

        return reply.status(200).send(response);
      } catch (error) {
        const response: ApiResponse = {
          success: false,
          message: error instanceof Error ? error.message : 'Token inválido',
        };

        return reply.status(401).send(response);
      }
    });
  }
}