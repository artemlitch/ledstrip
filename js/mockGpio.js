class Gpio {
  constructor(port, options) {
    this.port = port;
    this.value = 0;
  }
  pwmWrite(val) {
    console.log("writing the value of ", this.port, " to ", val);
    this.value = val;
  }
}

module.exports = Gpio;
