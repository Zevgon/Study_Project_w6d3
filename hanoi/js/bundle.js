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

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);


	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	  // console.log("bundle and main are working");
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      console.log("In move");
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        console.log(this.towers);
	        return true;
	      } else {
	        console.log(this.towers);
	        return false;
	      }

	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class HanoiView {
	  constructor(game, rootEl) {
	    this.game = game;
	    this.$rootEl = rootEl;
	    this.setupTowers();
	    // this.render();
	    this.startTower = undefined;
	    this.clickTower();
	  }

	  setupTowers() {
	    for (let i=0; i<3; i++){
	      let ul = $("<ul>");
	      for (let j=2; j>-1; j--) {
	        let li = $("<li>");

	        // let pos =
	        ul.data("pos", `${i}`);
	        if (this.game.towers[i][j] !== undefined ){
	          li.css("background-color", "pink");
	          li.css("border", "2px solid blue");
	          li.css("width", this.game.towers[i][j] * 20);
	          ul.append(li);
	        } else {
	          li.addClass("invisible");
	          li.css("border", "2px solid white");
	          ul.append(li);
	        }

	          // this.grid[i][j]
	          // call({ "width": , valu * 100)""
	      }
	      $('figure').append(ul);
	      // $("ul")[0].addEventListener("click", this.clickTower());
	    }
	    $('figure').addClass('group');
	  }

	  render() {
	    // document.body.innerHTML = "";
	    $('ul').remove();
	    this.setupTowers();
	    this.clickTower();
	  }

	  clickTower () {
	    //   $('ul').on("click", event => {
	    //     if (this.startTower === undefined) {
	    //     let startTower = $(event.currentTarget);
	    //   });
	    // } else {
	    //   let endTower =
	    // }
	    // document.figure.innerHTML = "";
	    $('ul').on("click", event => {
	      // console.log("infinite?");
	      if (this.startTower === undefined) {
	        this.startTower = $(event.currentTarget);
	        this.startTower.css("background-color", "red");
	        for (let i = 0; i < this.startTower.children().length; i++ ){
	          let liClass = $(this.startTower.children()[i]).attr('class');
	          if (liClass === "invisible") {
	            $(this.startTower.children()[i]).css("border", "2px solid red");
	          }
	        }
	        // this.startTower.children.each( () => {
	        //   // if (this
	        //   console.log(this);
	        // });
	        // console.log(this.startTower.data("pos"));
	      } else {
	        let endTower = $(event.currentTarget);
	        // console.log(endTower.data("pos"));
	        this.game.move(this.startTower.data("pos"), endTower.data("pos"));
	        this.render();
	        this.startTower = undefined;
	      }
	    });
	  }

	}

	module.exports = HanoiView;


/***/ }
/******/ ]);