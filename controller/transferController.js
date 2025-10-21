// controller/transferController.js
const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, (req, res) => {
  const { from, to, value } = req.body;
  if (!from || !to || typeof value !== 'number') {
    return res.status(400).json({ error: 'Campos obrigatórios: from, to, value' });
  }
  try {
    const transfer = transferService.transfer({ from, to, value });
    return res.status(201).json(transfer);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get('/', authenticateToken, (req, res) => {
  return res.json(transferService.listTransfers());
});

module.exports = router;
