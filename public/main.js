function init() {
  $.get("/currentLightVal", (data) => {
    console.log(data);
    const demoColorPicker = new iro.ColorPicker("#color-picker-container", {
      'wheelLightness': false,

    });
    demoColorPicker.color.rgb = {r: data.red, g: data.green, b: data.blue};
    demoColorPicker.on('input:end', (color) => {
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
      ).done(()=> { console.log("sucesss")})
    })
  })
};

window.onload = () => {
  init();
};
