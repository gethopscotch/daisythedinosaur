var Methods = {
  moveRight: function() {
    var anim = Hopscotch.circle.animate({cx: Hopscotch.circle.attr('cx') + 100}, 500, 'linear');
  },

  moveLeft: function() {
    var anim = Hopscotch.circle.animate({cx: Hopscotch.circle.attr('cx') - 100}, 500, 'linear');
  },

  moveUp: function() {
    var anim = Hopscotch.circle.animate({cy: Hopscotch.circle.attr('cy') - 100}, 500, 'linear');
  },

  moveDown: function() {
    var anim = Hopscotch.circle.animate({cy: Hopscotch.circle.attr('cy') + 100}, 500, 'linear');
  }
};

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

  downCallback: function() {
    var $self = $(this).clone();
    $self.css("position", "absolute");
    $self.offset($(this).offset());
    $("body").append($self);
    var move = function(e) {
      $self.css("top", e.pageY);
      $self.css('left', e.pageX);
    }
    $("body").bind("touchmove", function(e) {
      e.preventDefault();
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      move(touch);
    });
    $("body").bind("mousemove", function(e) {
      e.preventDefault();
      move(e);
    });

    $('body').bind('touchend', function(e) {
      Hopscotch.upCallback($self, e);
    });

    $('body').bind('mouseup', function(e) {
      Hopscotch.upCallback($self, e);
    });
  },

  upCallback: function(element, e) {
    $cl = $("#command-list");
    var height = $cl.height();
    var width = $cl.width();
    var topPos = $cl.position().top;
    var leftPos = $cl.position().left;

    if ($(element).position().left >= leftPos && $(element).position().left <= leftPos + width && $(element).position().top >= topPos && $(element).position().top <= topPos + height) {
      $("#command-list").append(element);
      element.css({
        'position': 'relative',
        'top' : '0',
        'left': '0'
      });
    } else {
      element.remove();
    }
    $("body").unbind("mouseup");
    $("body").unbind("touchend");
    $("body").unbind("mousemove");
    $("body").unbind("touchmove");
  }
}
$(function() {
  Hopscotch.init();

  $('#methods .command').live('mousedown', Hopscotch.downCallback);
  $("#methods .command").live('touchstart', Hopscotch.downCallback);




  $("#play").click(function(){
    _.each(Hopscotch.commandsToRun(), function(command, index) {
      setTimeout(function() {eval('Methods.' + command + '()')}, 500*index);
    });
  })
});

