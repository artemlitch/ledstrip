const fs = require('fs');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 1337;
const ledControl = require('./js/ledio');

function getExtension(filePath) { const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
  }
  return contentType;
}

ledControl.init();

http
  .createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if ( req.method === 'OPTIONS' ) {
      res.writeHead(200);
      res.end();
      return;
    }
    if (req.method === 'POST') {
      console.log("POST");
      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        console.log("Body, ", body);
        try {
            const settings = JSON.parse(body);
            const brightness = settings.brightness || 1;
            const red =  settings.red || 0;
            const green =  settings.green || 0;
            const blue =  settings.blue || 0;
            ledControl.setColor(red, green, blue, brightness);
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end('post received');
        } catch (err) {
            console.log(err);
            res.writeHead(500);
            res.end(err.message);
            res.end();
        }
      });
    } else {
      var filePath = '.' + req.url;
      if (filePath == './')
        filePath = './index.html';

      var contentType = getExtension(filePath);

      fs.readFile(filePath, function(error, content) {
        if (error) {
          if(error.code == 'ENOENT'){
            fs.readFile('./404.html', function(error, content) {
              res.writeHead(200, { 'Content-Type': contentType });
              res.end(content, 'utf-8');
            });
          }
          else {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            res.end();
          }
        }
        else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    }
  })
  .listen(PORT,() => console.log(`Listening on ${ PORT }`));
