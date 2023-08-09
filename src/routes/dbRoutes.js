const express = require('express');
const router = express.Router();
const db = require('../services/db');


router.post('/', db.create);


module.exports = router;