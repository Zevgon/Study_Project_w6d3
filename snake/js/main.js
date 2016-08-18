const SnakeView = require('./snake_view.js');
const Board = require('./snake.js');

$( () => {
  let board = new Board();
  let jqueryEl = $('snake');
  new SnakeView(board, jqueryEl);
  // console.log(jqueryEl);
  $('html').keydown(function(e) {
    // console.log(e.keyCode);
  });
  // board.render();
  window.setInterval(function () {
    console.log(board.snake.segments);
    board.snake.move(board.snake.currentDirection);
    board.renderSnake();
  }, 1000);


});
