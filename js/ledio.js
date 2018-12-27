const Gpio = require('pigpio').Gpio;
const LED_RED = new Gpio(23, {mode: Gpio.OUTPUT});
const LED_GREEN = new Gpio(24, {mode: Gpio.OUTPUT});
const LED_BLUE = new Gpio(25, {mode: Gpio.OUTPUT});

const setColor = (red, green, blue, brightness=1) => {
  console.log("settings colors to ", red*brightness, green*brightness, blue*brightness)
  LED_RED.pwmWrite(parseInt(red*brightness));
  LED_GREEN.pwmWrite(parseInt(green*brightness));
  LED_BLUE.pwmWrite(parseInt(blue*brightness));
};

const init = () => {
  LED_RED.pwmWrite(parseInt(100));
  LED_GREEN.pwmWrite(parseInt(100));
  LED_BLUE.pwmWrite(parseInt(100));
  setTimeout(
    () => {
      LED_RED.pwmWrite(parseInt(0));
      LED_GREEN.pwmWrite(parseInt(0));
      LED_BLUE.pwmWrite(parseInt(0));
      setTimeout(
        () => {
          LED_RED.pwmWrite(parseInt(100));
          LED_GREEN.pwmWrite(parseInt(0));
          LED_BLUE.pwmWrite(parseInt(0));
          setTimeout(
            () => {
              LED_RED.pwmWrite(parseInt(0));
              LED_GREEN.pwmWrite(parseInt(100));
              LED_BLUE.pwmWrite(parseInt(0));
              setTimeout(
                () => {
                  LED_RED.pwmWrite(parseInt(0));
                  LED_GREEN.pwmWrite(parseInt(0));
                  LED_BLUE.pwmWrite(parseInt(100));
                  setTimeout(
                    () => {
                      LED_RED.pwmWrite(parseInt(0));
                      LED_GREEN.pwmWrite(parseInt(0));
                      LED_BLUE.pwmWrite(parseInt(0));
                    },
                    500
                  );
                },
                500
              );
            },
            500
          );
        },
        500
      );
    },
    500
  );
}
module.exports = {
  setColor: setColor,
  init: init,
}
