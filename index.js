var Gpio = require('pigpio').Gpio;

const http = require('http');
const PORT = process.env.PORT || 1337;

http
  .createServer((req, res) => {
    if (req.method === 'POST') {
      console.log("POST");
      var body = '';
      req.on('data', function (data) {
        body += data;
        console.log("Partial body: " + body);
      });
      req.on('end', function () {
        console.log("Body, ", body);
        const settings = JSON.parse(body);
        const brightness = 0.5 | 1;
        const red =  settings.red | 0;
        const green =  settings.green | 0;
        const blue =  settings.blue | 0;
        const ledRed = new Gpio(23, {mode: Gpio.OUTPUT});
        const ledGreen = new Gpio(24, {mode: Gpio.OUTPUT});
        const ledBlue = new Gpio(25, {mode: Gpio.OUTPUT});
        ledRed.pwmWrite(red*brightness);
        ledGreen.pwmWrite(green*brightness);
        ledBlue.pwmWrite(blue*brightness);
      });
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('post received');
    } else {
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end('Hello World', 'utf-8');
    }
  })
  .listen(PORT,() => console.log(`Listening on ${ PORT }`));
