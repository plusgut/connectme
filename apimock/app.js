var http = require('http');
var fs   = require('fs');
http.createServer((req, res) => {
  res.end(fs.readFileSync(__dirname + '/state.json'));
}).listen(8080);
