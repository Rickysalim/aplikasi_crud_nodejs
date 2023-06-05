const router = require('express').Router();
const product = require('../controllers/product');
const productController = new product()
const uploadImage = require('../middleware/multer')
const restrict = require("../middleware/restrict");

router.get('/product', restrict, productController.findAllProduct);
router.post('/product', restrict, uploadImage.single('gambar'), productController.createProduct);
router.post('/product/:id', restrict, productController.updateProduct);
router.get('/product/:id',  restrict, productController.deleteProduct);
router.get('/*', (req, res) => {
    res.send('<h1>404</h1>')
})

module.exports = router

