const ledControl = require('./ledio');

function postDefault(body, res) {
  const settings = JSON.parse(body);
  const brightness = settings.brightness || 1;
  const red = settings.red || 0;
  const green = settings.green || 0;
  const blue = settings.blue || 0;
  ledControl.setColor(red, green, blue, brightness);
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('post received');
}

function postSpotify(body, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('post received');
}

function handlePost(body, req, res) {
  try {
    switch (req.url) {
      case "/spotify":

      default:
        postDefault(body, res);
        break;
    }
  }catch (err) {
    console.log(err);
    res.writeHead(500);
    res.end(err.message);
    res.end();
  }
}

module.exports = {
  handlePost: handlePost
}
