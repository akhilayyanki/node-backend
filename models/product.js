const fs = require('fs');
const path = require('path');
const cyrpto = require('crypto');


module.exports = class Product{
    constructor(id,title,imageUrl,description,price){
        this.id=id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        this.constructor.getProductsFromFile(products =>{
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id===this.id);
                const updatedProducts =[...products]
                updatedProducts[existingProductIndex] = this;
                const p =path.join(path.dirname(require.main.filename),"data","products.json");
                fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                    console.log(err);
                });
            }
            else{
                this.id = crypto.randomUUID();
                products.push(this);

                const p =path.join(path.dirname(require.main.filename),"data","products.json");
                fs.writeFile(p,JSON.stringify(products),(err)=>{
                    console.log(err);
                });
             }
         }
        );
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