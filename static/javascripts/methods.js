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

  move: $.extend({}, Method, {args: ['Forward', 'Backward'], call: function(arg, callback) {
    eval("PrivateMethods.move"+ arg + "(" + callback + ")");
  }}),

  roll: $.extend({}, Method, {call: function(arg, callback) {
    if  (Hopscotch.dino.attr('src') == "images/candycane.png") {
      var anim = Hopscotch.dino.animate(
        {transform: "r360,"+(Hopscotch.dino.width / 2)+","+(Hopscotch.dino.height / 2)},
        500, 'linear', function(){
          Hopscotch.dino.transform("r0");
          callback();
        });
    } else if (Hopscotch.dino.attr("src") == "images/candycaneleft.png") {
      var anim = Hopscotch.dino.animate(
        {transform: "r-360,"+(-Hopscotch.dino.width / 2)+","+(Hopscotch.dino.height / 2)},
        500, 'linear', function(){
          Hopscotch.dino.transform("r0");
          callback();
        } );
    }
  }}),

  jump: $.extend({}, Method, {call:
   function(args, callback) {
      if  (Hopscotch.dino.attr('src') == "images/candycane.png") {
        setTimeout(function(){ Hopscotch.dino.attr('src', 'images/candycane.png')  }, 10);
        setTimeout(function(){ Hopscotch.dino.attr('src', 'images/candycane.png')  }, 250);
        setTimeout(function(){ Hopscotch.dino.attr('src', 'images/candycane.png')  }, 500);
        Hopscotch.dino.animate(
          {y: Hopscotch.dino.attr('y') - 50}, 250, 'linear',
          function(){
            Hopscotch.dino.animate({y: Hopscotch.dino.attr('y') + 50}, 250, 'linear', callback)
        });
      } else if (Hopscotch.dino.attr('src') == "images/candycaneleft.png") {
        setTimeout(function(){ Hopscotch.dino.attr('src', 'images/candycaneleft.png')  }, 10);
        setTimeout(function(){ Hopscotch.dino.attr('src', 'images/candycaneleft.png')  }, 250);
        setTimeout(function(){ Hopscotch.dino.attr('src', 'images/candycaneleft.png')  }, 500);
        Hopscotch.dino.animate(
          {y: Hopscotch.dino.attr('y') - 50}, 250, 'linear',
          function(){ Hopscotch.dino.animate({y: Hopscotch.dino.attr('y') + 50}, 250, 'linear', callback) });
      }
    }
  }),

  turn: $.extend({}, Method, {call: function(args, callback) {
    if (Hopscotch.dino.attr('src') == "images/candycaneleft.png") {
      setTimeout(function(){ Hopscotch.dino.attr('src', 'images/candycane.png')  }, 150)
      setTimeout(function(){ Hopscotch.dino.attr('src', 'images/candycane.png'); callback(); }, 300)
    } else {
      setTimeout(function(){ Hopscotch.dino.attr('src', 'images/candycaneleft.png')  }, 150)
      setTimeout(function(){ Hopscotch.dino.attr('src', 'images/candycaneleft.png'); callback(); }, 300)
    };
  }}),

  loop: $.extend({}, Method, {call: function(args, callback) {}})
};

var PrivateMethods = {
  moveForward: function(callback) {
    var x = Hopscotch.dino.attr('x');
    if  (Hopscotch.dino.attr('src') == "images/candycaneleft.png") {
      PrivateMethods.animateLeft(1, x, -10, callback);
    } else if (Hopscotch.dino.attr('src') == "images/candycane.png") {
      PrivateMethods.animateRight(1, x, 10, callback);
    }

  },

  moveBackward: function(callback) {
    var x = Hopscotch.dino.attr('x');
    if  (Hopscotch.dino.attr('src') == "images/candycaneleft.png") {
      PrivateMethods.animateLeft(1, x, 10, callback);
    } else if (Hopscotch.dino.attr('src') == "images/candycane.png") {
      PrivateMethods.animateRight(1, x, -10, callback);
    }
  },

  animateRight: function(index, x, offset, callback) {
    if (x + offset > Hopscotch.width - 99  || x + offset < 0) {
      offset = 0;
    }
    if (index < 10) {
      Hopscotch.dino.animate({x: x+offset}, 100, 'linear', function() {
        Hopscotch.dino.attr('src', 'images/candycane.png');
        PrivateMethods.animateRight(index + 1, x + offset, offset, callback);
      });
    } else if (index == 10) {
      Hopscotch.dino.animate({x: x + offset}, 100, 'linear', function() {
        Hopscotch.dino.attr('src', 'images/candycane.png');
        callback();
      });
    }

  },

  animateLeft: function(index, x, offset, callback) {
    if (x + offset > Hopscotch.width - 97  || x + offset < 0) {
      offset = 0;
    }
    if (index < 10) {
      Hopscotch.dino.animate({x: x + offset}, 100, 'linear', function() {
        Hopscotch.dino.attr('src', 'images/candycaneleft.png');
        PrivateMethods.animateLeft(index + 1, x + offset, offset, callback);
      });
    } else if (index == 10) {
      Hopscotch.dino.animate({x: x + offset}, 100, 'linear', function() {
        Hopscotch.dino.attr('src', 'images/candycaneleft.png');
        callback();
      });
    }

  }

}
