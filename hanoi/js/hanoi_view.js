class HanoiView {
  constructor(game, rootEl) {
    this.game = game;
    this.$rootEl = rootEl;
    this.setupTowers();
    this.render();
  }

  setupTowers() {
    for (let i=0; i<3; i++){
      let ul = $("<ul>");
      for (let j=0; j<3; j++) {
        let li = $("<li>");
        ul.append(li);
      }
      $('.hanoi').append(ul);
    }
  }

  render() {

  }

}
