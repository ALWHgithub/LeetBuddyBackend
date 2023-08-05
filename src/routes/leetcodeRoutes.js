const express = require('express');
const router = express.Router();
const leetcode = require('../services/leetcode');


router.post('/', leetcode.getDataFromSlug);


module.exports = router;