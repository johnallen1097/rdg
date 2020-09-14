const express = require('express');

const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = require('../../controllers/product/product.controller');
const advanceResults = require('../../middlewares/advaceResult.middleware');
const Product = require('../../models/product/Product.model')

const router = express.Router({mergeParams:true});

const {protect,authorize} = require('../../middlewares/auth.middleware');

router.route('/')
    .get(advanceResults(Product,['collections','category']),getProducts)
    .post(protect,authorize('admin'),addProduct)

router.route('/:id')
    .get(getProduct)
    .put(protect,authorize('admin'),updateProduct)
    .delete(protect,authorize('admin'),deleteProduct)

module.exports = router;