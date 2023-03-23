const fs = require('fs');
const path = require('path');

module.exports = class Product{
    constructor(title){
        this.title = title;
    }

    save(){
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

}