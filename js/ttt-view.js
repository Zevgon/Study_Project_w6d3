var View = function (game, $el) {
  this.game = game;
  this.el = $el;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  console.log("IN BIND EVENTS");
  $('li').on('click', el => {
    let $square = $(el.currentTarget);
    this.makeMove($square);
  });
};

View.prototype.makeMove = function ($square) {
  $square.css("background-color", "white");

  let span = $("<span>");


  span.addClass(this.game.currentPlayer);
  span.text(this.game.currentPlayer);
  // console.log( typeof $square.attr("pos"));

  let pos = $square.attr("pos").split(",");
  pos.map( el => { parseInt(el); });

  // console.log(pos[0][0]);
  // let pos = $square.attr("pos").split(",");
  // pos = pos.map((el)=> parseInt(el));
  // let intPos = [];
  //
  // for (let i=0; i<pos.length; i++) {
  //   intPos.push(parseInt(pos[i]));
  // }

  // pos = Array.from(pos);
  if (this.game.board.isEmptyPos(pos)) {
    $square.data("pos", pos);
    $square.append(span);
    this.game.playMove($square.data("pos"));
  } else {
    alert("This is not a valid position");
  }


  if (this.game.board.isOver()) {
    let winner;
    if (this.game.currentPlayer === "x") {
      winner = "o";
    } else {
      winner = "x";
    }
    alert(`${winner} won!`);
  }
};

View.prototype.setupBoard = function () {
  const ul = $("<ul>");

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let li = $("<li>");
      li.attr("pos", [i, j]);
      li.addClass("group");

      ul.append(li);
    }
  }
  ul.addClass("group");
  $('.ttt').append(ul);
};

module.exports = View;
