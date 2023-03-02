const http = require('http'); //'./http'->searches for a local file
const routes = require('./routes');

const server = http.createServer(routes.handler); 
//each request upon receipt would execute requestListener
// this is event driven architecture - If X happens do Y

server.listen(3000);