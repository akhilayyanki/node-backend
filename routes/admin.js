const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminController = require('../contollers/admin');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postProduct);

// /admin/products => GET
router.get('/products',adminController.getProducts);

router.get('/edit-product/:productId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct);

module.exports = router;


