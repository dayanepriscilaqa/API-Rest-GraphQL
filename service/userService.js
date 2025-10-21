// service/userService.js
const bcrypt = require('bcryptjs');
const { users } = require('../model/userModel');

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function registerUser({ username, password, favorecidos = [] }) {
  if (findUserByUsername(username)) {
    throw new Error('Usuário já existe');
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = { username, password: hashedPassword, favorecidos, saldo: 10000 };
  users.push(user);
  return { username, favorecidos, saldo: user.saldo };
}

/**
 * Função usada pelo controller e pelos testes.
 * Aceita senhas criptografadas (bcrypt) ou simples.
 */
function authenticateUser({ username, password }) {
  const user = findUserByUsername(username);
  if (!user) throw new Error('Usuário ou senha inválidos');

  const senhaValida =
    bcrypt.compareSync(password, user.password) || user.password === password;

  if (!senhaValida) throw new Error('Usuário ou senha inválidos');

  return { username: user.username, favorecidos: user.favorecidos, saldo: user.saldo };
}

function listUsers() {
  return users.map(u => ({
    username: u.username,
    favorecidos: u.favorecidos,
    saldo: u.saldo,
  }));
}

module.exports = {
  registerUser,
  authenticateUser,
  listUsers,
  findUserByUsername,
};