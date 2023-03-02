const fs = require('fs');

const requestHandler = (req,res)=>{
    const url = req.url;
    const method = req.method;
    if(url==='/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>A node course</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('<html>');
        return res.end();
    }

    if(url==='/message'&&method=='POST'){
        const body = []
        req.on('data',(chunk)=> {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message, (err)=>{
                //redirecting to another page
                res.statusCode =302;
                res.setHeader('Location','/');
                return res.end();
            });

        });

    }
}

module.exports = {handler :requestHandler,
    metaText: 'subtext that check passing objects on module'
};