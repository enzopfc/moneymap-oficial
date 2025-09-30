import type { FastifyInstance } from 'fastify'
import { categoryService } from '../services/categoryService'
import { createCategorySchema, updateCategorySchema } from '../schemas'

export async function categoryRoutes(fastify: FastifyInstance) {
  // GET /categories - Listar todas as categorias
  fastify.get('/categories', {
    onRequest: [fastify.authenticate],
    schema: {
      description: 'Listar todas as categorias do usuário',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }]
    }
  }, async (request: any, reply) => {
    try {
      const userId = request.user?.id || 'user1' // Mock para desenvolvimento
      const type = request.query?.type as 'INCOME' | 'EXPENSE' | undefined

      const categories = await categoryService.findAll(userId, type)

      return reply.send({
        success: true,
        data: categories,
        message: 'Categorias listadas com sucesso'
      })
    } catch (error: any) {
      console.error('Error fetching categories:', error?.message)
      return reply.status(500).send({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  })

  // GET /categories/hierarchy - Listar categorias em hierarquia
  fastify.get<{
    Querystring: CategoryQuery
  }>('/categories/hierarchy', {
    onRequest: [fastify.authenticate],
    schema: {
      description: 'Listar categorias organizadas em hierarquia (pais e filhos)',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }],
      querystring: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['INCOME', 'EXPENSE'],
            description: 'Filtrar por tipo de categoria'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
                  color: { type: 'string' },
                  icon: { type: 'string', nullable: true },
                  children: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        type: { type: 'string', enum: ['INCOME', 'EXPENSE'] }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Querystring: CategoryQuery }>, reply: FastifyReply) => {
    try {
      const userId = request.user.id
      const { type } = request.query

      const categories = await categoryService.getHierarchy(userId, type)

      return reply.send({
        success: true,
        data: categories,
        message: 'Hierarquia de categorias listada com sucesso'
      })
    } catch (error) {
      fastify.log.error('Error fetching category hierarchy:', error)
      return reply.status(500).send({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  })

  // GET /categories/:id - Buscar categoria por ID
  fastify.get<{
    Params: CategoryParams
  }>('/categories/:id', {
    onRequest: [fastify.authenticate],
    schema: {
      description: 'Buscar uma categoria específica por ID',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID da categoria' }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
                color: { type: 'string' },
                icon: { type: 'string', nullable: true },
                parentId: { type: 'string', nullable: true },
                userId: { type: 'string' }
              }
            }
          }
        },
        404: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: CategoryParams }>, reply: FastifyReply) => {
    try {
      const userId = request.user.id
      const { id } = request.params

      const category = await categoryService.findById(id, userId)

      if (!category) {
        return reply.status(404).send({
          success: false,
          message: 'Categoria não encontrada'
        })
      }

      return reply.send({
        success: true,
        data: category,
        message: 'Categoria encontrada com sucesso'
      })
    } catch (error) {
      fastify.log.error('Error fetching category:', error)
      return reply.status(500).send({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  })

  // POST /categories - Criar nova categoria
  fastify.post<{
    Body: z.infer<typeof createCategorySchema>
  }>('/categories', {
    onRequest: [fastify.authenticate],
    schema: {
      description: 'Criar uma nova categoria',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            description: 'Nome da categoria'
          },
          type: {
            type: 'string',
            enum: ['INCOME', 'EXPENSE'],
            description: 'Tipo da categoria'
          }
        },
        required: ['name', 'type']
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
                userId: { type: 'string' }
              }
            },
            message: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            errors: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: z.infer<typeof createCategorySchema> }>, reply: FastifyReply) => {
    try {
      const userId = request.user.id
      const validation = createCategorySchema.safeParse(request.body)

      if (!validation.success) {
        return reply.status(400).send({
          success: false,
          message: 'Dados inválidos',
          errors: validation.error.errors.map(err => err.message)
        })
      }

      const category = await categoryService.create(validation.data, userId)

      return reply.status(201).send({
        success: true,
        data: category,
        message: 'Categoria criada com sucesso'
      })
    } catch (error) {
      fastify.log.error('Error creating category:', error)
      return reply.status(500).send({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  })

  // PUT /categories/:id - Atualizar categoria
  fastify.put<{
    Params: CategoryParams
    Body: z.infer<typeof updateCategorySchema>
  }>('/categories/:id', {
    onRequest: [fastify.authenticate],
    schema: {
      description: 'Atualizar uma categoria existente',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID da categoria' }
        },
        required: ['id']
      },
      body: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            description: 'Nome da categoria'
          },
          type: {
            type: 'string',
            enum: ['INCOME', 'EXPENSE'],
            description: 'Tipo da categoria'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                type: { type: 'string', enum: ['INCOME', 'EXPENSE'] }
              }
            },
            message: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: CategoryParams; Body: z.infer<typeof updateCategorySchema> }>, reply: FastifyReply) => {
    try {
      const userId = request.user.id
      const { id } = request.params
      const validation = updateCategorySchema.safeParse(request.body)

      if (!validation.success) {
        return reply.status(400).send({
          success: false,
          message: 'Dados inválidos',
          errors: validation.error.errors.map(err => err.message)
        })
      }

      const category = await categoryService.update(id, validation.data, userId)

      return reply.send({
        success: true,
        data: category,
        message: 'Categoria atualizada com sucesso'
      })
    } catch (error) {
      if (error instanceof Error && error.message === 'Categoria não encontrada') {
        return reply.status(404).send({
          success: false,
          message: error.message
        })
      }

      fastify.log.error('Error updating category:', error)
      return reply.status(500).send({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  })

  // DELETE /categories/:id - Excluir categoria
  fastify.delete<{
    Params: CategoryParams
  }>('/categories/:id', {
    onRequest: [fastify.authenticate],
    schema: {
      description: 'Excluir uma categoria',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID da categoria' }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: CategoryParams }>, reply: FastifyReply) => {
    try {
      const userId = request.user.id
      const { id } = request.params

      await categoryService.delete(id, userId)

      return reply.send({
        success: true,
        message: 'Categoria excluída com sucesso'
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Categoria não encontrada') {
          return reply.status(404).send({
            success: false,
            message: error.message
          })
        }
        
        if (error.message.includes('subcategorias') || error.message.includes('transações')) {
          return reply.status(400).send({
            success: false,
            message: error.message
          })
        }
      }

      fastify.log.error('Error deleting category:', error)
      return reply.status(500).send({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  })
}