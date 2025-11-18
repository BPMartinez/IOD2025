const express = require('express');
const router = express.Router();

const { getRandomNumber } = require('../controllers/extraController');

router.get('/random', getRandomNumber);

module.exports = router;
