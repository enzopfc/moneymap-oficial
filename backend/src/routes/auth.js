const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Rotas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rotas protegidas (requerem autenticação)
router.get('/profile', authMiddleware, authController.profile);

module.exports = router;