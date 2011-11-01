var Method = {
  args: [],
  call: function() {}
}

var Methods = {

  move: $.extend({}, Method, {args: ['Left', 'Right', 'Up', 'Down'], call: function(arg) {
    eval("PrivateMethods.move"+ arg + "()");
  }}),

  loop: Method
};

var PrivateMethods = {
  moveRight: function() {
    x = Hopscotch.dino.attr('x');
    Hopscotch.dino.animate({x: x+100}, 1000, 'linear', function() {
      Hopscotch.dino.attr('src', '/images/sprites/1.png');
    });
    _.times(9, function(index) {
      setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/'+(index+1)+'.png')  }, index*100)
    });

    // index = 1;
    // _.times(10, function(index) {
      // x += 10;
      // Hopscotch.dino.animate({x: x+30}, 200, 'linear', function() {
        // Hopscotch.dino.attr('src', 'images/sprites/3.png');
        // Hopscotch.dino.animate({x: x+60}, 200, "linear", function() {
          // Hopscotch.dino.attr('src', 'images/sprites/5.png');
          // Hopscotch.dino.animate({x: x+90}, 200, "linear", function() {
            // Hopscotch.dino.attr('src', 'images/sprites/7.png');
            // Hopscotch.dino.animate({x: x+120}, 200, "linear", function() { })
          // })
        // })
      // });
    // })
  },

  moveLeft: function() {
    var anim = Hopscotch.dino.animate({x: Hopscotch.dino.attr('x') - 100}, 500, 'linear');
  },

  moveUp: function() {
    var anim = Hopscotch.dino.animate({y: Hopscotch.dino.attr('y') - 100}, 500, 'linear');
  },

  moveDown: function() {
    var anim = Hopscotch.dino.animate({y: Hopscotch.dino.attr('y') + 100}, 500, 'linear');
  },
}
