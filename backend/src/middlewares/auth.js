const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token de acesso requerido' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'moneymap_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      error: 'Token inválido' 
    });
  }
};

module.exports = authMiddleware;