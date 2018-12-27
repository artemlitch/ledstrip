function init() {
  const demoColorPicker = new iro.ColorPicker("#color-picker-container", {
    'wheelLightness': false
  });
  demoColorPicker.on('input:end', (color) => {
    const {r, g, b} = color.rgb;
    const data = {
      red: r,
      green: g,
      blue: b,
    };
    $.post("http:/192.168.0.19:1337", JSON.stringify(data), function () {
        console.log("success");
      },
      "json"
    ).done(()=> { console.log("sucesss")})
  })
};

window.onload = () => {
  init();
};
