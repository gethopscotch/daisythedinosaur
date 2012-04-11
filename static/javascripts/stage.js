$(function() {

  if ($("body.code-editor").length > 0) {
    var paper = Raphael(768, 0, 256, 256);
    paper.rect(0,0,256, 256).attr('fill','white');
    window.sprite = paper.image("images/daisy.png", 106, 106, 72, 78);

    window.Stage = Backbone.Model.extend({
      initialize: function() {
        this.paper = Raphael(768, 0, 256, 256);
        this.background = paper.rect(0,0,256, 256).attr('fill','white');
        this.activeSprite = new Sprite(
          { element: paper.image("images/daisy.png", 106, 106, 72, 78) }
        );
      }
    });

    window.Sprite = Backbone.Model.extend({
      move: function(xOffset) {
        var x = this.get('element').attr('x');
        xOffset = parseInt(xOffset, 10);
        this.get('element').animate({x: x + xOffset}, 100, 'linear');
      }
    });

    window.stage = new Stage();
  }

});
