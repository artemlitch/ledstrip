const LedController = require('./ledController');

const getValues = () => {
  return LedController.getValues();
}

const setColor = (red, green, blue, brightness=1) => {
  console.log("settings colors to ", red*brightness, green*brightness, blue*brightness)
  LedController.setColors(
    red*brightness,
    green*brightness,
    blue*brightness
  );
};

const flashColors = async (mainColors) => {
  const {oldRed, oldGreen, oldBlue } = getValues();
  await timeout(100);
  const { red, green, blue } = mainColors;
  LedController.setColors(red,green,blue);
  await timeout(100);
  LedController.setColors(red*0.1,green*0.1,blue*0.1);
  await timeout(100);
  LedController.setColors(red,green,blue);
  await timeout(100);
  LedController.setColors(red*0.1,green*0.1,blue*0.1);
  await timeout(100);
  LedController.setColors(red,green,blue);
  await timeout(100);
  LedController.setColors(red*0.1,green*0.1,blue*0.1);
  await timeout(100);
  LedController.setColors(red,green,blue);
  await timeout(100);
  LedController.setColors(red*0.1,green*0.1,blue*0.1);
  await timeout(100);
  LedController.setColors(red,green,blue);
  await timeout(100);
  LedController.setColors(red*0.1,green*0.1,blue*0.1);
  await timeout(100);
  LedController.setColors(red,green,blue);
  await timeout(100);
  LedController.setColors(red*0.1,green*0.1,blue*0.1);
  await timeout(100);
  LedController.setColors(red,green,blue);
  await timeout(100);
  LedController.setColors(red*0.1,green*0.1,blue*0.1);
  await timeout(100);
  LedController.setColors(oldRed,oldGreen,oldBlue);
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const init = async () => {
  LedController.setColors(100,100,100);
  await timeout(500);
  LedController.setColors(0,0,0);
  await timeout(500);
  LedController.setColors(100,0,0);
  await timeout(500);
  LedController.setColors(0,100,0);
  await timeout(500);
  LedController.setColors(0,0,100);
  await timeout(500);
  LedController.setColors(0,0,0);
}

module.exports = {
  setColor: setColor,
  getValues: getValues,
  flashColors: flashColors,
  init: init,
}
