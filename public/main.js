function throttle(func, delay) { // allows [func] to run once every [delay] ms
  var func = func.bind(func),
    last = Date.now();
  return function (color) {
    if (Date.now() - last > delay) {
      func(color);
      last = Date.now();
    }
  }
}

const sendChangeColor = (color) => {
  const {r, g, b} = color.rgb;
  const data = {
    red: r,
    green: g,
    blue: b,
  };
  $.post("/", JSON.stringify(data), function () {
      console.log("success");
    },
    "json"
  ).done(() => {
    console.log("sucesss")
  })
};

function init() {
  $.get("/currentLightVal", (data) => {
    console.log(data);
    const demoColorPicker = new iro.ColorPicker("#color-picker-container", {
      'wheelLightness': false,

    });
    demoColorPicker.color.rgb = {r: data.red, g: data.green, b: data.blue};
    demoColorPicker.on('color:change', throttle(sendChangeColor, 300))
  })
};

window.onload = () => {
  init();
};
