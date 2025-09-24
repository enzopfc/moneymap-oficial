const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simulando um banco de dados de usuários (em produção, usar banco real)
const users = [];

const authController = {
  // Registrar novo usuário
  register: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;

      // Validação básica
      if (!nome || !email || !senha) {
        return res.status(400).json({
          error: 'Nome, email e senha são obrigatórios'
        });
      }

      // Verificar se usuário já existe
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        return res.status(400).json({
          error: 'Usuário já existe com este email'
        });
      }

      // Criptografar senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(senha, saltRounds);

      // Criar usuário
      const newUser = {
        id: users.length + 1,
        nome,
        email,
        senha: hashedPassword,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);

      // Gerar token JWT
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET || 'moneymap_secret_key',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Usuário registrado com sucesso',
        user: {
          id: newUser.id,
          nome: newUser.nome,
          email: newUser.email,
          createdAt: newUser.createdAt
        },
        token
      });

    } catch (error) {
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  },

  // Login de usuário
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      // Validação básica
      if (!email || !senha) {
        return res.status(400).json({
          error: 'Email e senha são obrigatórios'
        });
      }

      // Buscar usuário
      const user = users.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({
          error: 'Credenciais inválidas'
        });
      }

      // Verificar senha
      const isValidPassword = await bcrypt.compare(senha, user.senha);
      if (!isValidPassword) {
        return res.status(401).json({
          error: 'Credenciais inválidas'
        });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'moneymap_secret_key',
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          createdAt: user.createdAt
        },
        token
      });

    } catch (error) {
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  },

  // Obter perfil do usuário logado
  profile: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const user = users.find(u => u.id === userId);
      if (!user) {
        return res.status(404).json({
          error: 'Usuário não encontrado'
        });
      }

      res.json({
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          createdAt: user.createdAt
        }
      });

    } catch (error) {
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }
};

module.exports = authController;