const product = require('./product')
const user = require('./user')
const router = require('express').Router();

router.use(user)
router.use(product)

module.exports = router;