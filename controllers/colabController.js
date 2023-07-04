const asyncHandler = require('express-async-handler');
const express = require('express');
const colabService = require('../services/colabService');
const colabController = express.Router();
colabController.post('/register', asyncHandler(async (req, res) => {
    const colab = await colabService.register(req.body.firstName, req.body.lastName, req.body.identifiant, req.body.password);
    res.json(colab);
}
));
colabController.post('/login', asyncHandler(async (req, res) => {
    const colab = await colabService.login(req.body.identifiant, req.body.password);
    res.json(colab);
}
));
colabController.get('/get/:id', asyncHandler(async (req, res) => {
    const colab = await colabService.getColabById(req.params.id);
    res.json(colab);
}
));
module.exports = colabController;