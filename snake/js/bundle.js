/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const SnakeView = __webpack_require__(1);
	const Board = __webpack_require__(3);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(3);

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


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	class Snake {

	  constructor() {
	    this.directions = (["N", "E", "S", "W"]);
	    this.currentDirection = "N";
	    this.segments = [[15, 4]];
	  }

	  move(dir) {
	    let seg = this.segments;
	    let last = seg[seg.length-1];
	    seg.shift();
	    let head;
	    switch (dir) {
	      case "N":
	        head = [last[0] - 1, last[1]];
	        break;
	      case "E":
	        head = [last[0], last[1] + 1];
	        break;
	      case "S":
	        head = [last[0] + 1, last[1]];
	        break;
	      case "W":
	        head = [last[0], last[1] - 1];
	        break;
	    }

	    seg.push(head);

	  }

	  turn(str) {

	    console.log(`this is: ${str}`);
	    this.currentDirection = str;
	  }

	}


	class Coord {
	  constructor(){

	  }

	  plus() {

	  }

	  equals(){

	  }

	  isOpposite() {

	  }

	}

	class Board {
	  constructor(dims = 20){
	    this.$board = $("<ul>");
	    this.$board.addClass("grid group");
	    this.snake = new Snake();
	    for (let i = 0; i < dims; i++) {
	      for (let j = 0; j < dims; j++) {
	        let $li = $("<li>");
	        $li.data("pos", [i, j]);
	        $li.addClass("blank");
	        // $li.addClass("group");
	        this.$board.append($li);
	      }
	    }
	    $('figure').append(this.$board);
	    this.renderSnake();
	  }



	  renderSnake(){
	    // console.log(this.snake.segments);
	    let segs = this.snake.segments;
	    for(let i=0; i<segs.length; i++){
	      let pos = segs[i];
	      let children = this.$board.children();

	      for (let j = 0; j < children.length; j++) {
	        if (($(children[j]).data("pos")[0] === pos[0]) && ($(children[j]).data("pos")[1] === pos[1])) {
	          $(children[j]).addClass("snake");
	        }
	      }

	    }

	  }

	}

	module.exports = Snake;
	module.exports = Board;


/***/ }
/******/ ]);