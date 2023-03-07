const express = require('express');

const router = express.Router();

//changes to GET "admin/add-product" , admin already checked earlier.
router.get('/add-product',(req,res,next)=>{
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="product-title"><button type="submit">Add Product</button></form>');
});

// a next should be directed at the same route but different need.
router.post('/add-product',(req,res,next)=>{
    console.log(req.body);//added by express
    res.redirect('/');
});

module.exports = router;
