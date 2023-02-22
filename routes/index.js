const product = require('./product')
const router = require('express').Router();

router.use(product)

module.exports = router;