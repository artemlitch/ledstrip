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
        console.log("Body: " + body);
        console.log('Define each color from RGB Strip light.');
        var ledRed = new Gpio(23, {mode: Gpio.OUTPUT});
        var ledGreen = new Gpio(24, {mode: Gpio.OUTPUT});
        var ledBlue = new Gpio(25, {mode: Gpio.OUTPUT});
        console.log('Power up the red color.');
        //You can set a brightness value between 0 and 255
        //where 0 is off and 255 is maximum brightness
        ledRed.pwmWrite(255);
        console.log("Let's start other colors too");
        //Stop the lights after 5 seconds
        setTimeout(function(){
          console.log('Stop all colors after 5 seconds');
          ledRed.pwmWrite(0);
          ledGreen.pwmWrite(0);
          ledBlue.pwmWrite(0);
        }, 5000);
      });
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('post received');
    } else {
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end('Hello World', 'utf-8');
    }
  })
  .listen(PORT,() => console.log(`Listening on ${ PORT }`));
