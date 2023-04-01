const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    const products = Product.fetchAll( products =>{
    res.render('admin/add-product',{
      prods : products,
      pageTitle: "Add product page", 
      path:"/",
      hasProducts:products.length>0,
      activeShop: true,
      productCSS: true
});
});
};

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description; 
    const product = new Product(title,imageUrl,price,description);

    product.save();
    res.redirect('/');
};

exports.getProducts = (req,res,next) =>{
    Product.fetchAll(products =>{
        res.render('admin/products', {
          prods : products, 
          pageTitle: "Admin Products", 
          path:"/"
      });
    });
}