const express = require('express');
const router = express.Router();

const itemRouter = require('../modules/items/router');

router.use( '/items', itemRouter );

module.exports = router;
