const express = require('express');
const router = express.Router();

const { getItems, getItem } = require('./controller');

router.get( '/', getItems );
router.get( '/:item_id', getItem );

module.exports = router;