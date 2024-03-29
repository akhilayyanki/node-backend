const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts =(req, res, next) => {
  Product.fetchAll(products =>{
    res.render('shop/product-list', {
      prods : products, 
      pageTitle: "All products", 
      path:"/products"
    });
  });

};

exports.getIndex = (req,res,next) =>{
  Product.fetchAll(products =>{
    res.render('shop/index', {
      prods : products, 
      pageTitle: "Shop", 
      path:"/"
  });
});
};


exports.getCart = (req,res,next) =>{
    res.render('shop/cart',{
      path:'/cart',
      pageTitle: 'Your cart'
    })
}

exports.postCart =(req,res,next) =>{
  const prodId = req.body.productId;
  Product.findByID(prodId,(product)=>{
    Cart.addProduct(product.id,product.price);
  });
  res.redirect('/cart');
}

exports.getCheckout = (req,res,next) => {
  res.render('/shop/checkout',{
    path:'/checkout',
    pageTitle:'Checkout'
  });
}

exports.getOrders = (req,res,next) => {
  res.render('/shop/orders',{
    path:'/orders',
    pageTitle:'Orders'
  });
}

exports.getProductByID = (req,res,next) => {
  const productId = req.params.productID; 
  Product.findByID(productId, product => {
      res.render('shop/product-detail',{
        product:product,
        pageTitle:product.title,
        path:'/products'
      })
  });
}