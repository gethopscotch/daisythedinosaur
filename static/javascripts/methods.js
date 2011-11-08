var Method = {
  args: [],
  call: function() {}
}

var Timeouts = {
  none: 0,
  move: 1400,
  jump: 650,
  roll: 650,
  turn: 450
};

var Methods = {

  move: $.extend({}, Method, {args: ['Forward', 'Backward'], call: function(arg) {
    eval("PrivateMethods.move"+ arg + "()");
  }}),

  roll: $.extend({}, Method, {call: function() {
    if  (Hopscotch.dino.attr('src') == "/images/sprites/1.png") {
      var anim = Hopscotch.dino.animate(
        {transform: "r360,"+(Hopscotch.dino.width / 2)+","+(Hopscotch.dino.height / 2)},
        500, 'linear', function(){ Hopscotch.dino.transform("r0") });
    } else if (Hopscotch.dino.attr("src") == "/images/sprites/l1.png") {
      var anim = Hopscotch.dino.animate(
        {transform: "r-360,"+(-Hopscotch.dino.width / 2)+","+(Hopscotch.dino.height / 2)},
        500, 'linear', function(){ Hopscotch.dino.transform("r0") });
    }
  }}),

  jump: $.extend({}, Method, {call:
   function() {
      if  (Hopscotch.dino.attr('src') == "/images/sprites/1.png") {
        setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/3.png')  }, 10);
        setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/4.png')  }, 250);
        setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/1.png')  }, 500);
        Hopscotch.dino.animate(
          {y: Hopscotch.dino.attr('y') - 50}, 250, 'linear',
          function(){ Hopscotch.dino.animate({y: Hopscotch.dino.attr('y') + 50}, 250, 'linear') });
      } else if (Hopscotch.dino.attr('src') == "/images/sprites/l1.png") {
        setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/l3.png')  }, 10);
        setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/l4.png')  }, 250);
        setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/l1.png')  }, 500);
        Hopscotch.dino.animate(
          {y: Hopscotch.dino.attr('y') - 50}, 250, 'linear',
          function(){ Hopscotch.dino.animate({y: Hopscotch.dino.attr('y') + 50}, 250, 'linear') });
      }
    }
  }),

  turn: $.extend({}, Method, {call: function() {
    if (Hopscotch.dino.attr('src') == "/images/sprites/l1.png") {
      setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/back.png')  }, 150)
      setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/1.png')  }, 300)
    } else {
      setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/front.png')  }, 150)
      setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/l1.png')  }, 300)
    };
  }})

};

var PrivateMethods = {
  moveForward: function() {
    var x = Hopscotch.dino.attr('x');
    if  (Hopscotch.dino.attr('src') == "/images/sprites/l1.png") {
      PrivateMethods.animateLeft(1, x, -10);
    } else if (Hopscotch.dino.attr('src') == "/images/sprites/1.png") {
      PrivateMethods.animateRight(1, x, 10);
    }

  },

  moveBackward: function() {
    var x = Hopscotch.dino.attr('x');
    if  (Hopscotch.dino.attr('src') == "/images/sprites/l1.png") {
      PrivateMethods.animateLeft(1, x, 10);
    } else if (Hopscotch.dino.attr('src') == "/images/sprites/1.png") {
      PrivateMethods.animateRight(1, x, -10);
    }
  },

  animateRight: function(index, x, offset) {
    if (x + offset > 444 || x + offset < 0) {
      offset = 0;
    }
    if (index < 10) {
      Hopscotch.dino.animate({x: x+offset}, 100, 'linear', function() {
        Hopscotch.dino.attr('src', '/images/sprites/' + index + '.png');
        PrivateMethods.animateRight(index + 1, x + offset, offset);
      });
    } else if (index == 10) {
      Hopscotch.dino.animate({x: x + offset}, 100, 'linear', function() {
        Hopscotch.dino.attr('src', '/images/sprites/1.png');
      });
    } else {
      Hopscotch.dino.attr('src', '/images/sprites/1.png');
    }

  },

  animateLeft: function(index, x, offset) {
    if (x + offset > 444 || x + offset < 0) {
      offset = 0;
    }
    if (index < 10) {
      Hopscotch.dino.animate({x: x + offset}, 100, 'linear', function() {
        Hopscotch.dino.attr('src', '/images/sprites/l' + index + '.png');
        PrivateMethods.animateLeft(index + 1, x + offset, offset);
      });
    } else if (index == 10) {
      Hopscotch.dino.animate({x: x + offset}, 100, 'linear', function() {
        Hopscotch.dino.attr('src', '/images/sprites/l1.png');
      });
    } else {
      Hopscotch.dino.attr('src', '/images/sprites/l1.png');
    }

  }

}
