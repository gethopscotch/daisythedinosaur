var Method = {
  args: [],
  call: function() {}
}

var Methods = {

  move: $.extend({}, Method, {args: ['Left', 'Right', 'Up', 'Down'], call: function(arg) {
    eval("PrivateMethods.move"+ arg + "()");
  }}),

  loop: Method,

  roll: $.extend({}, Method, {call: function() {
    var anim = Hopscotch.dino.animate(
      {transform: "r360,"+(Hopscotch.dino.width / 2)+","+(Hopscotch.dino.height / 2)},
      500, 'linear', function(){ Hopscotch.dino.transform("r0") });
  }}),

  jump: $.extend({}, Method, {call: function() {
    setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/3.png')  }, 10)
    setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/4.png')  }, 250)
    setTimeout(function(){ Hopscotch.dino.attr('src', '/images/sprites/1.png')  }, 500)
    Hopscotch.dino.animate(
      {y: Hopscotch.dino.attr('y') - 50}, 250, 'linear',
      function(){ Hopscotch.dino.animate({y: Hopscotch.dino.attr('y') + 50}, 250, 'linear') });
  }})

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
