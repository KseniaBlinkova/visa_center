const stocksService = require('../services/stocksService');

const getAllStocks = (req, res) => {
    const { title } = req.query;
    const stocks = stocksService.findAll(title);
    res.json(stocks);
};

const getStockById = (req, res) => {
    const id = parseInt(req.params.id);
    const stock = stocksService.findOne(id);
    if (!stock) return res.status(404).json({ error: 'Виза не найдена' });
    res.json(stock);
};

const createStock = (req, res) => {
    const newStock = stocksService.create(req.body);
    res.status(201).json(newStock);
};

const updateStock = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStock = stocksService.update(id, req.body);
    if (!updatedStock) return res.status(404).json({ error: 'Не удалось обновить' });
    res.json(updatedStock);
};

const removeStock = (req, res) => {
    const id = parseInt(req.params.id);
    const success = stocksService.remove(id);
    if (!success) return res.status(404).json({ error: 'Не удалось удалить' });
    res.status(204).send();
};

module.exports = { getAllStocks, getStockById, createStock, updateStock, removeStock };