const View = require('./ttt-view.js');
const Game = require('../../solution/game.js');

$( () => {
  let game = new Game();
  let $el = $('ttt');
  new View(game, $el);
});
