const http = require('http'); //'./http'->searches for a local file
const fs = require('fs');

const server = http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers);

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



}); //each request upon receipt would execute requestListener
// this is event driven architecture - If X happens do Y

server.listen(3000);