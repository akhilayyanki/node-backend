const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('add-product',{
      prods : products,
      pageTitle: "Add product page", 
      path:"/",
      hasProducts:products.length>0,
      activeShop: true,
      productCSS: true
});
};

exports.postProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts =(req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {
      prods : products, 
      pageTitle: "All products", 
      path:"/",
      hasProducts:products.length>0,
      activeShop: true,
      productCSS: true
    });
  }


