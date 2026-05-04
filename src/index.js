
const express = require('express');
const path = require('path');
const cors = require('cors'); // <--- ДОБАВИТЬ ЭТО
const stocksRouter = require('./routes/visasRouter.js');
const stocksService = require('./services/visasService.js');

const app = express();
const PORT = 3005; 

const DATA_PATH = path.join(__dirname, 'data/visas.json');
stocksService.init(DATA_PATH);

app.use(cors()); // <--- ДОБАВИТЬ ЭТО (лучше до остальных app.use)
app.use(express.json());

// Логирование в терминале
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/visas', stocksRouter);

app.listen(PORT, () => {
    console.log(`Сервер IU5-41B запущен: http://localhost:${PORT}`);
});