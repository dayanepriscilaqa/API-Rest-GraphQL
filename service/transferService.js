// service/transferService.js
const { users } = require('../model/userModel');
const { transfers } = require('../model/transferModel');

function findUser(username) {
  return users.find(u => u.username === username);
}

function transfer({ from, to, value }) {
  const sender = findUser(from);
  const receiver = findUser(to);

  if (!sender || !receiver) {
    throw new Error('Usuário remetente ou destinatário não encontrado');
  }
  if (typeof value !== 'number' || value <= 0) {
    throw new Error('Valor inválido para transferência');
  }
  if (value > sender.saldo) {
    throw new Error('Saldo insuficiente');
  }
  // regra: transferências acima de 5000 só para favorecidos
  if (value > 5000 && (!sender.favorecidos || !sender.favorecidos.includes(to))) {
    throw new Error('Transferências acima de 5000 só podem ser feitas para favorecidos');
  }

  sender.saldo -= value;
  receiver.saldo = (receiver.saldo || 10000) + value;

  const t = { from, to, value, date: new Date().toISOString() };
  transfers.push(t);
  return t;
}

function listTransfers() {
  return transfers;
}

module.exports = { transfer, listTransfers };
