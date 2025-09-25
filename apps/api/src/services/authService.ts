import bcrypt from 'bcryptjs';
import type { FastifyRequest } from 'fastify';
import type { LoginInput, RegisterInput } from '../schemas/index.js';

// Mock user storage (in real app, this would be database)
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

// Simulated database
const users: User[] = [];
let userIdCounter = 1;

export class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterInput): Promise<{ user: Omit<User, 'passwordHash'> }> {
    // Check if user already exists
    const existingUser = users.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    // Create user
    const now = new Date();
    const user: User = {
      id: `user_${userIdCounter++}`,
      name: data.name,
      email: data.email,
      passwordHash,
      createdAt: now,
      updatedAt: now,
    };

    users.push(user);

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  }

  /**
   * Authenticate user and return user data
   */
  async login(data: LoginInput): Promise<{ user: Omit<User, 'passwordHash'> }> {
    // Find user by email
    const user = users.find(u => u.email === data.email);
    if (!user) {
      throw new Error('Email ou senha inválidos');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Email ou senha inválidos');
    }

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<Omit<User, 'passwordHash'> | null> {
    const user = users.find(u => u.id === id);
    if (!user) {
      return null;  
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Update user data
   */
  async updateUser(id: string, data: Partial<Pick<User, 'name' | 'email'>>): Promise<Omit<User, 'passwordHash'>> {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    // Check email uniqueness if updating email
    if (data.email && data.email !== users[userIndex].email) {
      const existingUser = users.find(u => u.email === data.email && u.id !== id);
      if (existingUser) {
        throw new Error('Email já está em uso');
      }
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...data,
      updatedAt: new Date(),
    };

    const { passwordHash: _, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  }

  /**
   * Extract user from JWT payload
   */
  getUserFromRequest(request: FastifyRequest): { userId: string } {
    const payload = request.user as { userId: string };
    if (!payload || !payload.userId) {
      throw new Error('Token JWT inválido');
    }
    return payload;
  }

  /**
   * Create mock users for development
   */
  async createMockUsers(): Promise<void> {
    if (users.length > 0) return; // Don't create if users already exist

    const mockUsers = [
      {
        name: 'João Silva',
        email: 'joao@moneymap.com',
        password: 'MinhaSenh@123',
      },
      {
        name: 'Maria Santos', 
        email: 'maria@moneymap.com',
        password: 'OutraSenh@456',
      },
    ];

    for (const userData of mockUsers) {
      try {
        await this.register(userData);
        console.log(`Mock user created: ${userData.email}`);
      } catch (error) {
        console.log(`Mock user already exists: ${userData.email}`);
      }
    }
  }
}

export const authService = new AuthService();