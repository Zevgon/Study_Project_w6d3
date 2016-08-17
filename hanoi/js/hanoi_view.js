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
