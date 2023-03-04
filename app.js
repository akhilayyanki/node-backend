const http = require('http'); 

const express = require('express');

const app = express();

//executed for every request
// express uses the 'startswith' operator for path

app.use('/',(req,res,next)=>{
    console.log('zero middlewaar');
    next();

});

app.use('/add-product',(req,res,next)=>{
    console.log('first middlewaar');
    res.send('<h1>Its the product page!</h1>');
});

// a next should be directed at the same route but different need.
app.use('/',(req,res,next)=>{
    console.log('second middlewaar');
    res.send('<h1>Using using express.js!!</h1>');
});




const server = http.createServer(app); 

server.listen(3000);