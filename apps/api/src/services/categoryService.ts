// import { PrismaClient } from '@prisma/client' // TODO: Descomentar quando Roberto configurar banco
import { createCategorySchema, updateCategorySchema } from '../schemas'
import { z } from 'zod'

// const prisma = new PrismaClient() // TODO: Descomentar quando Roberto configurar banco

const prisma = new PrismaClient()

export interface Category {
  id: string
  name: string
  type: 'INCOME' | 'EXPENSE'
  color?: string
  icon?: string | null
  parentId?: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
  parent?: Category | null
  children?: Category[]
  _count?: {
    transactions: number
  }
}

// Mock data para desenvolvimento (remover após Roberto configurar banco)
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Alimentação',
    type: 'EXPENSE',
    color: '#ef4444',
    icon: '🍕',
    parentId: null,
    userId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
    children: [
      {
        id: '2',
        name: 'Restaurantes',
        type: 'EXPENSE',
        color: '#ef4444',
        icon: '🍽️',
        parentId: '1',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: 'Supermercado',
        type: 'EXPENSE',
        color: '#ef4444',
        icon: '🛒',
        parentId: '1',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
  },
  {
    id: '4',
    name: 'Transporte',
    type: 'EXPENSE',
    color: '#f59e0b',
    icon: '🚗',
    parentId: null,
    userId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Salário',
    type: 'INCOME',
    color: '#22c55e',
    icon: '💰',
    parentId: null,
    userId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

class CategoryService {
  async create(data: z.infer<typeof createCategorySchema>, userId: string): Promise<Category> {
    try {
      // TODO: Substituir por Prisma quando Roberto configurar banco
      // return await prisma.category.create({
      //   data: { ...data, userId },
      //   include: { parent: true, children: true }
      // })

      // Mock implementation
      const newCategory: Category = {
        id: Date.now().toString(),
        ...data,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockCategories.push(newCategory)
      return newCategory
    } catch (error) {
      console.error('Error creating category:', error)
      throw new Error('Erro ao criar categoria')
    }
  }

  async findAll(userId: string, type?: 'INCOME' | 'EXPENSE'): Promise<Category[]> {
    try {
      // TODO: Substituir por Prisma quando Roberto configurar banco
      // const where: any = { userId }
      // if (type) where.type = type
      
      // return await prisma.category.findMany({
      //   where,
      //   include: { 
      //     parent: true, 
      //     children: true,
      //     _count: { select: { transactions: true } }
      //   },
      //   orderBy: { name: 'asc' }
      // })

      // Mock implementation
      let categories = mockCategories.filter(cat => cat.userId === userId)
      if (type) {
        categories = categories.filter(cat => cat.type === type)
      }
      
      return categories.sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw new Error('Erro ao buscar categorias')
    }
  }

  async findById(id: string, userId: string): Promise<Category | null> {
    try {
      // TODO: Substituir por Prisma quando Roberto configurar banco
      // return await prisma.category.findFirst({
      //   where: { id, userId },
      //   include: { parent: true, children: true }
      // })

      // Mock implementation
      return mockCategories.find(cat => cat.id === id && cat.userId === userId) || null
    } catch (error) {
      console.error('Error fetching category:', error)
      throw new Error('Erro ao buscar categoria')
    }
  }

  async update(id: string, data: z.infer<typeof updateCategorySchema>, userId: string): Promise<Category> {
    try {
      // TODO: Substituir por Prisma quando Roberto configurar banco
      // const category = await prisma.category.findFirst({
      //   where: { id, userId }
      // })
      
      // if (!category) {
      //   throw new Error('Categoria não encontrada')
      // }

      // return await prisma.category.update({
      //   where: { id },
      //   data: { ...data, updatedAt: new Date() },
      //   include: { parent: true, children: true }
      // })

      // Mock implementation
      const categoryIndex = mockCategories.findIndex(cat => cat.id === id && cat.userId === userId)
      if (categoryIndex === -1) {
        throw new Error('Categoria não encontrada')
      }

      mockCategories[categoryIndex] = {
        ...mockCategories[categoryIndex],
        ...data,
        updatedAt: new Date()
      }

      return mockCategories[categoryIndex]
    } catch (error) {
      console.error('Error updating category:', error)
      throw new Error('Erro ao atualizar categoria')
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    try {
      // TODO: Substituir por Prisma quando Roberto configurar banco
      // const category = await prisma.category.findFirst({
      //   where: { id, userId },
      //   include: { children: true, transactions: true }
      // })

      // if (!category) {
      //   throw new Error('Categoria não encontrada')
      // }

      // if (category.children.length > 0) {
      //   throw new Error('Não é possível excluir categoria que possui subcategorias')
      // }

      // if (category.transactions.length > 0) {
      //   throw new Error('Não é possível excluir categoria que possui transações')
      // }

      // await prisma.category.delete({ where: { id } })

      // Mock implementation
      const categoryIndex = mockCategories.findIndex(cat => cat.id === id && cat.userId === userId)
      if (categoryIndex === -1) {
        throw new Error('Categoria não encontrada')
      }

      // Verificar se tem filhos
      const hasChildren = mockCategories.some(cat => cat.parentId === id)
      if (hasChildren) {
        throw new Error('Não é possível excluir categoria que possui subcategorias')
      }

      mockCategories.splice(categoryIndex, 1)
    } catch (error) {
      console.error('Error deleting category:', error)
      throw new Error('Erro ao excluir categoria')
    }
  }

  async getHierarchy(userId: string, type?: 'INCOME' | 'EXPENSE'): Promise<Category[]> {
    try {
      // TODO: Substituir por Prisma quando Roberto configurar banco
      // const where: any = { userId, parentId: null }
      // if (type) where.type = type

      // return await prisma.category.findMany({
      //   where,
      //   include: {
      //     children: {
      //       include: {
      //         children: true,
      //         _count: { select: { transactions: true } }
      //       }
      //     },
      //     _count: { select: { transactions: true } }
      //   },
      //   orderBy: { name: 'asc' }
      // })

      // Mock implementation
      let rootCategories = mockCategories.filter(cat => 
        cat.userId === userId && cat.parentId === null
      )
      
      if (type) {
        rootCategories = rootCategories.filter(cat => cat.type === type)
      }

      // Adicionar children a cada categoria pai
      rootCategories.forEach(parent => {
        parent.children = mockCategories.filter(cat => cat.parentId === parent.id)
      })

      return rootCategories.sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
      console.error('Error fetching category hierarchy:', error)
      throw new Error('Erro ao buscar hierarquia de categorias')
    }
  }
}

export const categoryService = new CategoryService()