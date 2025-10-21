// controller/userController.js
const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secretdemo';

// Rota de registro de novo usuário
router.post('/register', (req, res) => {
  const { username, password, favorecidos } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }

  if (favorecidos && !Array.isArray(favorecidos)) {
    return res.status(400).json({ error: 'Favorecidos deve ser uma lista' });
  }

  try {
    const user = userService.registerUser({
      username,
      password,
      favorecidos: favorecidos || [],
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Rota de login (gera token JWT)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }

  try {
    const user = userService.authenticateUser({ username, password });
    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      user: {
        username: user.username,
        favorecidos: user.favorecidos,
        saldo: user.saldo,
      },
      token,
    });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
});

// Rota para listar todos os usuários
router.get('/', (req, res) => {
  try {
    const users = userService.listUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

module.exports = router;
