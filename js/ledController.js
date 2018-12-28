let Gpio = undefined;
if (process.env.demo) {
  Gpio = require('./mockGpio');
} else {
  Gpio = require('pigpio').Gpio;
}

class Controller {
  constructor() {
    console.log("Initialized the LED controller");
    this.red = {
      io: new Gpio(23, {mode: Gpio.OUTPUT}),
      value: 0,
    }
    this.green = {
      io: new Gpio(24, {mode: Gpio.OUTPUT}),
      value: 0,
    }
    this.blue = {
      io: new Gpio(25, {mode: Gpio.OUTPUT}),
      value: 0,
    }
  }

  setColors(red, green, blue) {
    this.red.io.pwmWrite(parseInt(red));
    this.green.io.pwmWrite(parseInt(green));
    this.blue.io.pwmWrite(parseInt(blue));
    this.red.value = parseInt(red);
    this.green.value = parseInt(green);
    this.blue.value = parseInt(blue);
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
