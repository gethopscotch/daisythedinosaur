var Stage = {
  position: {x: 50, y: 140},
  height: 305,
  width: 804,

  spriteDir: "sprites",
  init: function() {
    this.paper = Raphael("print-area", Stage.width, Stage.height);
    this.paper.safari()
    var grass = this.paper.rect(0, 206, Stage.width, 99);
    grass.attr({
      "fill" : "#95a640",
      "stroke-opacity": 0
    });
    var sky = this.paper.rect(0, 0, Stage.width, 206);
    sky.attr({
      'fill': "#b3ffff",
      "stroke-opacity": 0,
      "opacity" : 0.3
    });
    grass.glow({
      color: "#C9D970",
      width: 15,
      opacity: 0.7
    });

    var sun = this.paper.circle(Stage.width, 0, 80, 80);
    sun.attr({
      'fill' : "#ffe500",
      'stroke-opacity' : 0
    });

    sun.glow({
      color: "#ffa316",
      opacity: 0.8,
      width: 30
    });
    this.dino = this.paper.image("images/sprites/1.png", this.position.x, this.position.y, 70, 80);
    this.dino.data("scale", 0)
    this.dinoDirection = "right";
  }
}
