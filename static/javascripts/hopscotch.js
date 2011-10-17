var Hopscotch = {
  init: function() {
    this.paper = Raphael("print-area", 500, 200);
    this.circle = this.paper.circle(50, 40, 10);
    this.circle.attr("fill", "#f00");

    _.each(_.keys(Methods), function(method) {
      $('#methods').append("<div class='command'>" + method + "</div>");
    });
  },

  commandsToRun: function() {
    return _.map($("#command-list .command"), function(command) {
      return $(command).html();
    });
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
    if ( Hopscotch.isInsideDroppable(element, $("#command-list")) ) {
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
