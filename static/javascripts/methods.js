var Method = {
  args: [],
  call: function() {}
}

var Methods = {
  "repeat": $.extend({}, Method, {call: function(arg, callback, command, commandList) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: "played_loop"},  type: "POST"})
  }}),
  when: $.extend({}, Method, {args: ['shake', 'touch'], call: function(arg, callback, command, commandList) {
    PrivateMethods[arg](callback, command, commandList);
  }}),
  move: $.extend({}, Method, {args: ['Forward', 'Backward'], call: function(arg, callback, command, commandList) {
    PrivateMethods["move" + arg](function() {callback(command, commandList)});
  }}),

  roll: $.extend({}, Method, {call: function(arg, callback, command, commandList) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: "played_roll"},  type: "POST"})
    if  (Stage.dinoDirection == "right") {
      var anim = Stage.dino.animate(
        {transform: "r360,"+(Stage.dino.width / 2)+","+(Stage.dino.height / 2)},
        500, 'linear', function(){
          Stage.dino.transform("r0");
          callback(command, commandList);
        });
    } else if (Stage.dinoDirection == "left") {
      var anim = Stage.dino.animate(
        {transform: "r-360,"+(-Stage.dino.width / 2)+","+(Stage.dino.height / 2)},
        500, 'linear', function(){
          Stage.dino.transform("r0");
          callback(command, commandList);
        });
    }
  }}),

  jump: $.extend({}, Method, {call:
                 function(args, callback, command, commandList) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: "played_jump"},  type: "POST"})
    if  (Stage.dinoDirection == "right") {
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/3.png')  }, 10);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/4.png')  }, 250);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/1.png')  }, 500);
      Stage.dino.animate(
        {y: Stage.dino.attr('y') - 50}, 250, 'linear',
        function(){
          Stage.dino.animate({y: Stage.dino.attr('y') + 50}, 250, 'linear', function() {callback(command, commandList)})
        });
    } else if (Stage.dinoDirection == "left") {
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/l3.png')  }, 10);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/l4.png')  }, 250);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/l1.png')  }, 500);
      Stage.dino.animate(
        {y: Stage.dino.attr('y') - 50}, 250, 'linear',
        function(){ Stage.dino.animate({y: Stage.dino.attr('y') + 50}, 250, 'linear', function() {callback(command, commandList)}) });
    }
  }
  }),

  turn: $.extend({}, Method, {call: function(args, callback, command, commandList) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: "played_turn"},  type: "POST"})
    if (Stage.dinoDirection == "left") {
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/back.png')  }, 150);
      setTimeout(function(){
                  Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/1.png');
                  Stage.dinoDirection = "right";
                  callback(command, commandList);
      }, 300);
    } else if(Stage.dinoDirection == "right") {
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/front.png')  }, 150)
      setTimeout(function(){
        Stage.dinoDirection = "left"
        Stage.dino.attr('src', 'images/'+ Stage.spriteDir +'/l1.png');
        callback(command, commandList);
      }, 300)
    };
  }}),

  grow: $.extend({}, Method, {call: function(args, callback, command, commandList) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: "played_grow"},  type: "POST"})
    var scale = Stage.dino.data("scale");
    if (scale == 2) {
      Stage.spriteDir = "sprites_lg";
      src = Stage.dino.attr('src');
      Stage.dino.attr('src', src.split('/sprites/').join('/sprites_lg/'))
    }
    if (scale < 5) {
      var height = Stage.dino.attrs.height;
      var width = Stage.dino.attrs.width;
      console.log(height*1.25)
      console.log(180 - 0.5 * (height * 1.25))
      Stage.dino.animate({width: width * 1.25, height: height * 1.25, y: (194 - 0.66 * (height * 1.25))}, 500, function(){
        Stage.dino.data("scale", scale + 1);
        callback(command, commandList);
      });
    } else {
      callback(command, commandList);
    }
  }}),
  shrink: $.extend({}, Method, {call: function(args, callback, command, commandList) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: "played_shrink"},  type: "POST"})
    var scale = Stage.dino.data("scale");
    if (scale == 2) {
      Stage.spriteDir = "sprites";
      src = Stage.dino.attr('src');
      Stage.dino.attr('src', src.split('/sprites_lg/').join('/sprites/'))
    }
    if (scale > - 5) {
      var height = Stage.dino.attrs.height
      var width = Stage.dino.attrs.width
      Stage.dino.animate({width: width*0.8, height: height*0.8, y: (200 - 0.66 * (height * 0.8))}, 500, function(){
        Stage.dino.data("scale", scale - 1);
        callback(command, commandList);
      });
    } else {
      callback(command, commandList);
    }
  }}),
  spin: $.extend({}, Method, {call: function(args, callback, command, commandList) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: "played_spin"},  type: "POST"})
    if (Stage.dinoDirection == "left") {
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/back.png')  }, 150);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/1.png'); }, 300);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/front.png')  }, 450)
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/l1.png'); }, 600);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/back.png')  }, 750);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/1.png'); }, 900);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/front.png')  }, 1050)
      setTimeout(function(){
        Stage.dino.attr('src', 'images/'+ Stage.spriteDir +'/l1.png');
        callback(command, commandList);
      }, 1250);
    } else if(Stage.dinoDirection == "right") {
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/front.png')  }, 150);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/l1.png'); }, 300);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/back.png')  }, 450)
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/1.png'); }, 600);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/front.png')  }, 750);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/l1.png'); }, 900);
      setTimeout(function(){ Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/back.png')  }, 1050)
      setTimeout(function(){
        Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/1.png');
        callback(command, commandList);
      }, 1250);
    }
  }})
};

var PrivateMethods = {
  moveForward: function(callback) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: "played_move_forward"},  type: "POST"})
    var x = Stage.dino.attr('x');
    if  (Stage.dinoDirection == "left") {
      PrivateMethods.animateLeft(1, x, -10, callback);
    } else if (Stage.dinoDirection == "right") {
      PrivateMethods.animateRight(1, x, 10, callback);
    }

  },

  moveBackward: function(callback) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: "played_move_backward"},  type: "POST"})
    var x = Stage.dino.attr('x');
    if  (Stage.dinoDirection == "left") {
      PrivateMethods.animateLeft(1, x, 10, callback);
    } else if (Stage.dinoDirection == "right") {
      PrivateMethods.animateRight(1, x, -10, callback);
    }
  },

  animateRight: function(index, x, offset, callback) {
    if (x + offset > Stage.width - 63  || x + offset < 0) {
      offset = 0;
    }
    if (index < 10) {
      Stage.dino.animate({x: x+offset}, 100, 'linear', function() {
        if  (Stage.dinoDirection == "left") {
          Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/l' + index + '.png');
          PrivateMethods.animateLeft(index + 1, x - offset, -offset, callback);
        } else {
          Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/' + index + '.png');
          PrivateMethods.animateRight(index + 1, x + offset, offset, callback);
        }
      });
    } else if (index == 10) {
      if  (Stage.dinoDirection == "left") {
        Stage.dino.animate({x: x - offset}, 100, 'linear', function() {
          Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/l1.png');
          callback();
        });
      } else {
        Stage.dino.animate({x: x + offset}, 100, 'linear', function() {
          Stage.dino.attr('src', 'images/' + Stage.spriteDir + '/1.png');
          callback();
        });
      }
    }

  },

  animateLeft: function(index, x, offset, callback) {
    if (x + offset > Stage.width - 97  || x + offset < 0) {
      offset = 0;
    }
    if (index < 10) {
      Stage.dino.animate({x: x - offset}, 100, 'linear', function() {
        if  (Stage.dinoDirection == "right") {
          Stage.dino.attr('src', 'images/'+ Stage.spriteDir +'/' + index + '.png');
          PrivateMethods.animateRight(index + 1, x - offset, -offset, callback);
        } else {
          Stage.dino.attr('src', 'images/'+ Stage.spriteDir +'/l' + index + '.png');
          PrivateMethods.animateLeft(index + 1, x + offset, offset, callback);
        }
      });
    } else if (index == 10) {
      if  (Stage.dinoDirection == "right") {
        Stage.dino.animate({x: x - offset}, 100, 'linear', function() {
          Stage.dino.attr('src', 'images/'+ Stage.spriteDir +'/1.png');
          callback();
        });
      } else {
        Stage.dino.animate({x: x + offset}, 100, 'linear', function() {
          Stage.dino.attr('src', 'images/'+ Stage.spriteDir +'/l1.png');
          callback();
        });
      }
    }
  },

  shake: function(callback, command, commandList) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: "played_shake"},  type: "POST"});
    var prevX = 1.0;
    var axl = new Accelerometer();
    var threshold = 0.5;
    axl.watchAcceleration(
      function (Accel)
      {
        if (true === Accel.is_updating){
          return;
        }
        var diffX = Math.abs(Accel.x) - prevX;

        if (diffX >= threshold)
        {
          Program.executeEvent(command);
        }
        prevX = Math.abs(Accel.x);
      },
      function(){},
      {frequency : 100}
    );
    callback(command, commandList);
  },

  touch: function(callback, command, commandList) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: "played_touch"},  type: "POST"});
    $("#print-area").unbind("touchstart");
    $("#print-area").bind("touchstart", function() {
      Program.executeEvent(command);
    });
    callback(command, commandList);
  }
}
