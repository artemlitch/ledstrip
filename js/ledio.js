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

const init = () => {
  LedController.setColors(100,100,100);
  setTimeout(
    () => {
      LedController.setColors(0,0,0);
      setTimeout(
        () => {
          LedController.setColors(100,0,0);
          setTimeout(
            () => {
              LedController.setColors(0,100,0);
              setTimeout(
                () => {
                  LedController.setColors(0,0,100);
                  setTimeout(
                    () => {
                      LedController.setColors(0,0,0);
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
  getValues: getValues,
  init: init,
}
