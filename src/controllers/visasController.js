const visasService = require('../services/visasService.js');

const getAllStocks = (req, res) => {
    const { title } = req.query;
    const stocks = visasService.findAll(title);
    res.json(stocks);
};

const getStockById = (req, res) => {
    const id = parseInt(req.params.id);
    const stock = visasService.findOne(id);
    if (!stock) return res.status(404).json({ error: 'Виза не найдена' });
    res.json(stock);
};

const createStock = (req, res) => {
    const newStock = visasService.create(req.body);
    res.status(201).json(newStock);
};

const updateStock = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStock = visasService.update(id, req.body);
    if (!updatedStock) return res.status(404).json({ error: 'Не удалось обновить' });
    res.json(updatedStock);
};

const removeStock = (req, res) => {
    const id = parseInt(req.params.id);
    const success = visasService.remove(id);
    if (!success) return res.status(404).json({ error: 'Не удалось удалить' });
    res.status(204).send();
};

module.exports = { getAllStocks, getStockById, createStock, updateStock, removeStock };