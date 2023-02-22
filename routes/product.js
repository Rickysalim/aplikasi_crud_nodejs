const router = require('express').Router();
const product = require('../controllers/product');
const productController = new product()

router.get('/product',productController.findAllProduct);
router.post('/product', productController.createProduct);
router.post('/product/:id', productController.updateProduct);
router.get('/product/:id', productController.deleteProduct);
router.get('/*', (req, res) => {
    res.send('<h1>404</h1>')
})

module.exports = router

