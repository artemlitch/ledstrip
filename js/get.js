const fs = require('fs');
const utils = require('./utils');
const ledControl = require('./ledio');


function getCurrentLightVal(req, res) {
  const colors = ledControl.getValues();
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(colors));
}

function getDefault(req, res) {
  var filePath = '.' + req.url;
  if (filePath == './')
    filePath = './public/index.html';

  var contentType = utils.getExtension(filePath);

  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./404.html', function (error, content) {
          res.writeHead(200, {'Content-Type': contentType});
          res.end(content, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        res.end();
      }
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content, 'utf-8');
    }
  });
}

function handleGet(req, res) {
  try {
    switch (req.url) {
      case "/currentLightVal":
        getCurrentLightVal(req, res);
        break;
      default:
        getDefault(req, res);
    }
  } catch {
    console.log(err);
    res.writeHead(500);
    res.end(err.message);
    res.end();
  }
}

module.exports = {
  handleGet: handleGet
}

