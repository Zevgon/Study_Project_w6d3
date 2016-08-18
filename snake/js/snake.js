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
