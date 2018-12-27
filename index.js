const Gpio = require('pigpio').Gpio;
const fs = require('fs');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 1337;

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

const LED_RED = new Gpio(23, {mode: Gpio.OUTPUT});
const LED_GREEN = new Gpio(24, {mode: Gpio.OUTPUT});
const LED_BLUE = new Gpio(25, {mode: Gpio.OUTPUT});

http
  .createServer((req, res) => {
    if (req.method === 'POST') {
      console.log("POST");
      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        console.log("Body, ", body);
        const settings = JSON.parse(body);
        const brightness = settings.brightness || 1;
        const red =  settings.red || 0;
        const green =  settings.green || 0;
        const blue =  settings.blue || 0;
        console.log(settings.brightness, brightness);
        console.log("settings colors to ", red*brightness, green*brightness, blue*brightness)
        LED_RED.pwmWrite(parseInt(red*brightness));
        LED_GREEN.pwmWrite(parseInt(green*brightness));
        LED_BLUE.pwmWrite(parseInt(blue*brightness));
      });
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('post received');
    } else {
      var filePath = '.' + req.url;
      if (filePath == './')
        filePath = './index.html';

      var contentType = getExtension(filePath);

      fs.readFile(filePath, function(error, content) {
        if (error) {
          if(error.code == 'ENOENT'){
            fs.readFile('./404.html', function(error, content) {
              response.writeHead(200, { 'Content-Type': contentType });
              response.end(content, 'utf-8');
            });
          }
          else {
            response.writeHead(500);
            response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            response.end();
          }
        }
        else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }
  })
  .listen(PORT,() => console.log(`Listening on ${ PORT }`));
