const Board = require("./snake.js");

class SnakeView {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.board = new Board();
    $('html').keydown( (key)=> {
      // console.log("In key");
      this.getKey(key.keyCode);
    });
  }

  getKey(key) {
    switch (key) {
      case 37:
        key = "W";
        break;
      case 38:
        key = "N";
        break;
      case 39:
        key = "E";
        break;
      case 40:
        key = "S";
        break;
    }
    this.board.snake.turn(key);
  }

}

module.exports = SnakeView;
