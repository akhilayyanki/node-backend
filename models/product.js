const fs = require('fs');
const path = require('path');
const cyrpto = require('crypto');


module.exports = class Product{
    constructor(title,imageUrl,description,price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        this.id = crypto.randomUUID();
        const p =path.join(require.main.filename,"..","data","products.json");
        console.log('path ',p);
        fs.readFile(p,(err, fileContent) => {
            let products = [];
            if(!err)
                products = JSON.parse(fileContent);
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            });
        })
        
    }

    static fetchAll(callback){
        this.getProductsFromFile(callback);
    }

    static getProductsFromFile(callback){
        const p =path.join(path.dirname(require.main.filename),"data","products.json");
        let products=[];
        fs.readFile(p,(err,fileContent)=> {
            if(err)
                return callback([]);
            products = JSON.parse(fileContent);
            return callback(products);

        });
        return products;
    }

    static findByID(id,cb){
        this.getProductsFromFile(products=>{
            const product = products.find(p => p.id===id);
            cb(product);
        });
    }

}