var Hopscotch = {
  position: {x: 50, y: 100},
  height: 305,
  width: 804,
  init: function() {
    this.paper = Raphael("print-area", Hopscotch.width, Hopscotch.height);
    this.paper.safari()
    var grass = this.paper.rect(0, 206, Hopscotch.width, 99);
    grass.attr({
      "fill" : "#95a640",
      "stroke-opacity": 0
    });
    var sky = this.paper.rect(0, 0, Hopscotch.width, 206);
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

    var sun = this.paper.circle(Hopscotch.width, 0, 80, 80);
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

  },


  methodDownCallback: function() {
    var $self = $(this).clone();
    $self.css("position", "absolute");
    $self.offset($(this).offset());
    $("body").append($self);

    $("body").bind("touchmove", function(e) {
      e.preventDefault();
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      Hopscotch.move(touch, $self);
    });
    $("body").bind("mousemove", function(e) {
      e.preventDefault();
      Hopscotch.move(e, $self);
    });

    $('body').bind('touchend', function(e) {
      Hopscotch.upCallbackCommandList($self, e);
    });

    $('body').bind('mouseup', function(e) {
      Hopscotch.upCallbackCommandList($self, e);
    });
  },
listDownCallback: function() {
    var $self = $(this);
    var oldOffset = $(this).offset();
    $self.css("position", "absolute");
    $self.offset(oldOffset);

    $("body").bind("touchmove", function(e) {
      e.preventDefault();
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      Hopscotch.move(touch, $self);
    });
    $("body").bind("mousemove", function(e) {
      e.preventDefault();
      Hopscotch.move(e, $self);
    });

    $('body').bind('touchend', function(e) {
      Hopscotch.upCallbackTrash($self, e);
    });

    $('body').bind('mouseup', function(e) {
      Hopscotch.upCallbackTrash($self, e);
    });
  },

  move: function(e, $element) {
    $element.css("top", e.pageY - 10);
    $element.css('left', e.pageX - 80);
  },

  upCallbackCommandList: function(element, e) {
    var insideLoop = false;
    $('#command-list .loop').each(function() {
      if ( Hopscotch.isInsideDroppable(element, $(this)) ) {
        insideLoop = true;
        $(this).append(element);
        element.css({
          'position': 'relative',
          'top' : '0',
          'left': '0'
        });
      }
    });

    if (insideLoop) {
    } else if ( Hopscotch.isInsideDroppable(element, $("#command-list")) ) {
      $("#command-list").append(element);
      element.css({
        'position': 'relative',
        'top' : '0',
        'left': '0'
      });
    } else {
      element.remove();
    }
    Hopscotch.unbindEvents();
  },

  upCallbackTrash: function(element, e) {
    if ( Hopscotch.isInsideDroppable(element, $("#trash-bin")) ) {
      element.remove();
    } else {
      $("#command-list").append(element);
      element.css({
        'position': 'relative',
        'top' : '0',
        'left': '0'
      });
    }
    Hopscotch.unbindEvents();
  },

  unbindEvents: function() {
    $("body").unbind("mouseup");
    $("body").unbind("touchend");
    $("body").unbind("mousemove");
    $("body").unbind("touchmove");
  },

  isInsideDroppable: function($draggable, $droppable) {
    var height = $droppable.height();
    var width = $droppable.width();
    var topPos = $droppable.position().top;
    var leftPos = $droppable.position().left;

    if ($draggable.position().left >= leftPos && $draggable.position().left <= leftPos + width && $draggable.position().top >= topPos && $draggable.position().top <= topPos + height) {
      return true;
    } else {
      return false;
    }
  }
}
