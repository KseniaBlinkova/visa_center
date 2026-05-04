const express = require('express');
const router = express.Router();
const visaController = require('../controllers/visasController.js');

router.get('/', visaController.getAllVisa);
router.get('/:id', visaController.getVisaById);
router.post('/', visaController.createVisa);
router.patch('/:id', visaController.updateVisa);
router.delete('/:id', visaController.removeVisa);

module.exports = router;