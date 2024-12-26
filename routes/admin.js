const express = require('express');
const { getAllUsers, getAllLocations } = require('../controllers/admin');
const auth = require('../auth/middleware');
const adminAuth = require('../auth/admin');

const router = express.Router();

router.get('/users', auth, adminAuth, getAllUsers);
router.get('/locations', auth, adminAuth, getAllLocations);

module.exports = router;