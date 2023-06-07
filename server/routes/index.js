const express = require('express');
const router = express.Router();
const loginRoutes = require('./loginRoutes');

router.use('/api', loginRoutes);

module.exports = router;
