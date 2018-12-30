const ledControl = require('./ledio');
const request = require('request');

let CHECKING = false;

let HANDLER = undefined;
let OLD_SCORE = undefined;

let TEAM = 'CLE';

const TEAM_COLORS = {
  'CLE': {
    red: 255,
    green: 47,
    blue: 0
  }
}

function startPolling() {
  HANDLER = setInterval(() => {
    try{
      checkNFL();
    } catch (err) {
      console.log(err.message);
    }
  }, 1000);
}

function stopPolling() {
  OLD_SCORE = undefined;
  clearInterval(HANDLER);
}

function toggle() {
  CHECKING = !CHECKING;
  if (CHECKING ) {
    startPolling();
    ledControl.flashColors(TEAM_COLORS[TEAM]);
    return CHECKING;
  }
  stopPolling();
  return CHECKING;
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
      if (game['h'] === TEAM) {
        score = game['hs'];
      }
      if (game['v'] === TEAM) {
        score = game['vs'];
      }
    }
    if (score > OLD_SCORE) {
      ledControl.flashColors(TEAM_COLORS[TEAM])
    }
    OLD_SCORE = score;
  });
}



module.exports = {
  toggle: toggle
}
