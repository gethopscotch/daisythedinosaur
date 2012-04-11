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

        xOffset = parseInt(xOffset, 10);

        var transform = this.transform();
        this.get('element').animate({transform: transform + "t" + xOffset + ",0" }, 500, 'linear');
      },
      turn: function(degrees) {
        degrees = parseInt(degrees, 10);
        var transform = this.transform();
        this.get('element').animate({transform: transform + "r" + degrees}, 500, 'linear');
      },
      transform: function() {
        var element = this.get('element');

        var transform = element.transform();

        var transformString = _.map(transform, function(t) {
          return t[0] + _.rest(t).join(',');
        }).join(' ');
        return transformString;
      }
    });

    window.stage = new Stage();
  }

});
