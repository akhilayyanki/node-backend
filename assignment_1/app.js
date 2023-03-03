const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;

    if(url==='/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>')
        res.write('<h1>This is a HTML greeting</h1>');
        res.write('<body><form action="/create-user" method="POST"> <input type="text" name="exist"><button type="submit">Create</button></input></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url==='/users'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>')
        res.write('<body><ul><li>Degree</li><li>Job</li><li>Rat-race</li><li>Death</li></ul></body>');
        res.write('</html>');
        return res.end();

    }
    if(url==='/create-user'&&method=="POST"){
        const body = []
        req.on('data',(chunk)=>{body.push(chunk);});

        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt',message,(err)=>{
                res.statusCode =302;
                res.setHeader('Location','/users');
                return res.end();
            });
        })
    }
});

server.listen(3000);