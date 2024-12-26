const express = require('express');
const { addLocation } = require('../controllers/Location');
const auth = require('../auth/middleware');

const router = express.Router();

router.post('/', auth, addLocation);
module.exports = router;