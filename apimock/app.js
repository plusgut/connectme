var http = require('http');

http.createServer((req, res) => {
  res.end('true');
}).listen(8080);
