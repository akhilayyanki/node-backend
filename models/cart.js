const fs = require('fs')
const path = require('path')

const p =path.join(require.main.filename,"..","data","cart.json");

module.exports = class Cart{
    static addProduct(productId, productPrice){
        //fetch prev cart
        fs.readFile(p,(err,fileContent)=>{
            let cart = {products:[],totalPrice:0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
        //analyse the cart => find existing prod
        const existingProductIndex = cart.products.findIndex(product => productId===product.id);
        const existingProduct = cart.products[existingProductIndex];

        //add new product /inc quantity
        let updatedProduct ;

        if(existingProduct){
            updatedProduct = {...existingProduct};
            updatedProduct.qty = updatedProduct.qty+1;
            cart.products[existingProductIndex] = updatedProduct;
        }
        else{
            updatedProduct = {id:productId,qty:1};
            cart.products = [...cart.products,updatedProduct];
        }
        
        cart.totalPrice = cart.totalPrice + +productPrice;

        fs.writeFile(p,JSON.stringify(cart), (err)=>{
            console.log(err);
        });

      });
    }
}