const ledControl = require('./ledio');
const request = require('request');

let checking = false;

let handler = undefined;
let oldScore = undefined;

let team = 'CLE';

function startPolling() {
  handler = setInterval(() => {
    try{
      checkNFL();
    } catch (err) {
      console.log(err.message);
    }
  }, 1000);
}

function stopPolling() {
  oldScore = undefined;
  clearInterval(handler);
}

function toggle() {
  checking = !checking;
  if (checking ) {
    startPolling();
    return checking;
  }
  stopPolling();
  return checking;
}

const checkNFL = () => {
  request('http://www.nfl.com/liveupdate/scorestrip/ss.json', function (error, response, body) {
    if (error) {
      throw new Error("some NFL error");
    }
    const parsedBody = JSON.parse(body);
    let score = undefined;
    for (let i = 0; i < parsedBody['gms'].length; i++ ) {
      const game = parsedBody['gms'][i];
      if (game['h'] === team) {
        score = game['hs'];
      }
      if (game['v'] === team) {
        score = game['vs'];
      }
    }
    if (score > oldScore) {
      ledControl.flashColors({
        red: 63,
        green: 54,
        blue: 168
      })
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('nfl post received');
    }
    oldScore = score;
  });
}



module.exports = {
  toggle: toggle
}
