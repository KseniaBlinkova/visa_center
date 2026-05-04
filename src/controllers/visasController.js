const visasService = require('../services/visasService.js');

const getAllVisa = (req, res) => {
    const { title } = req.query;
    const stocks = visasService.findAll(title);
    res.json(stocks);
};

const getVisaById = (req, res) => {
    const id = parseInt(req.params.id);
    const stock = visasService.findOne(id);
    if (!stock) return res.status(404).json({ error: 'Виза не найдена' });
    res.json(stock);
};

const createVisa = (req, res) => {
    const newStock = visasService.create(req.body);
    res.status(201).json(newStock);
};

const updateVisa = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStock = visasService.update(id, req.body);
    if (!updatedStock) return res.status(404).json({ error: 'Не удалось обновить' });
    res.json(updatedStock);
};

const removeVisa = (req, res) => {
    const id = parseInt(req.params.id);
    const success = visasService.remove(id);
    if (!success) return res.status(404).json({ error: 'Не удалось удалить' });
    res.status(204).send();
};

module.exports = { getAllVisa, getVisaById, createVisa, updateVisa, removeVisa };