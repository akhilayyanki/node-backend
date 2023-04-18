const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {       
    const products = Product.fetchAll( products =>{
    res.render('admin/edit-product',{
      prods : products,
      pageTitle: "Add Product", 
      editing: false,
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
    const product = new Product(null,title,imageUrl,description,price);

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

exports.getEditProduct = (req, res, next) => {  
    const editing = req.query.edit   
    const prodId = req.params.productId;
    Product.findByID(prodId, (product)=>{
        res.render('admin/edit-product',{
            pageTitle: "Edit Product", 
            path:"/admin/edit-product",
            editing: editing,
            product: product
        });
    })

};

exports.postEditProduct = (req,res,next) => {
    const prodId = req.body.productId;
    console.log("hello "+prodId);
    const updatedTitle =  req.body.title;
    const updatedDesc = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;

    const updatedProduct = new Product(prodId,updatedTitle,updatedImageUrl,updatedDesc,updatedPrice);
    updatedProduct.save();
    res.redirect('/');

}