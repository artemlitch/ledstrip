let Gpio = undefined;
if (process.env.demo) {
  Gpio = require('./mockGpio');
} else {
  Gpio = require('pigpio').Gpio;
}

class Controller {
  constructor() {
    console.log("Initialized the LED controller");
    this.red = new Gpio(23, {mode: Gpio.OUTPUT});
    this.green = new Gpio(24, {mode: Gpio.OUTPUT});
    this.blue = new Gpio(25, {mode: Gpio.OUTPUT});
  }

  setColors(red, green, blue) {
    this.red.pwmWrite(parseInt(red));
    this.green.pwmWrite(parseInt(green));
    this.blue.pwmWrite(parseInt(blue));
  }

  getValues() {
    return {
      red: this.red.value,
      green: this.green.value,
      blue: this.blue.value,
    }
  }

}

const CONTROLLER = new Controller();

module.exports = CONTROLLER;
