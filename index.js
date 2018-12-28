require('dotenv').load();
const http = require('http');
const PORT = process.env.PORT || 1337;
const get = require('./js/get');
const post = require('./js/post');
const ledControl = require('./js/ledio');
ledControl.init();

http
  .createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    try {
      if (req.method === 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
          body += data;
        });
        req.on('end', function () {
          console.log("Body, ", body);
          console.log(req.url);
          return post.handlePost(body, req, res);
        });
      } else {
        console.log("GET");
        console.log(req.url);
        return get.handleGet(req, res);
      }
    } catch (err) {
      console.log(err);
      res.writeHead(500);
      res.end(err.message);
      res.end();
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
