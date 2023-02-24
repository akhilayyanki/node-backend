const http = require('http'); //'./http'->searches for a local file

const server = http.createServer((req,res)=>{
    console.log(req);
}); //each request upon receipt would execute requestListener
// this is event driven architecture - If X happens do Y

server.listen(3000);