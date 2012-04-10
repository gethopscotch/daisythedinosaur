var Step = Backbone.Model.extend({
  defaults: {
    title: "",
    description: "",
    elements: []
  },
  undraw: function() {
    _.each(this.get('elements'), function(e){
      e.remove();
    })
  },
  success: function() {
    var buttons;
    if (this == this.collection.last()) {
      buttons = [{
        text: "You win! Go to freeplay mode",
        click: function() { 
          $(this).dialog("close");
          window.location.href = "freeplay.html";
        }
      }];
    } else {
      buttons = [{
        text: "Try the next challenge",
        click: function() { $(this).dialog("close"); }
      }];
    }
    $('#success').dialog({
      modal: true,
      dialogClass: 'success',
      width: 600,
      title: "Congratulations!",
      buttons: buttons
    });
  },
  star: function(left, topCoord) {
    var star = Stage.paper.path("M100,225, S125,190,350,175, L115,375, L200,100, S250,200,285,375, M285,375, S192.5,315,100,225").attr('stroke-width', 0).attr('fill', 'gold').transform("R10,100,100S.25,T" + left + "," + topCoord );
    var glow = star.glow({width: '2'}).transform("R5");
    return [star, glow];
  },
  prompt: function() {
    this.get('draw')(this);
    $('#current-step #command-library .command').hide();
    _.each(this.get('methods'), function(method) {
      $("#current-step").find("." + method ).show();
    });

    $(".tutorial .title").html( this.get('title'));
    $(".tutorial .text").html(this.get('description'));
  }
});

var Tutorial = Backbone.Collection.extend({ 
  prompt: function() {
    var currentStep = this.currentStep();
    currentStep.prompt(currentStep);
    if (currentStep == this.first()) {
      $(".tutorial .previous-step").hide();
    } else {
      $(".tutorial .previous-step").show();
    }
  },
  model: Step,
  currentStep: function() {
    var currentStep = window.localStorage.getItem('current-step');
    if (currentStep == undefined || isNaN(currentStep)) {
      currentStep = 0;
      window.localStorage.setItem("current-step", 0);
    } else {
      currentStep = parseInt(currentStep);
    }
    return this.at(currentStep);
  },
  moveStep: function(displacement) {
    var currentStep = this.currentStep();
    currentStep.undraw();
    var tutorial = this;
    var stepIndex = parseInt(window.localStorage.getItem('current-step'), 10);
    if((currentStep == this.first() && displacement < 0)|| (currentStep == this.last() && displacement > 0)) {
      Stage.dino.animate({x: Stage.position.x, y: Stage.position.y}, 0, 'linear', function() {
        setTimeout(function() {tutorial.prompt()},400);
        $(".nestedCommands").remove();
        $("#command-area > .command-list").html('');
      });
    } else {
      Stage.dino.animate({x: Stage.position.x, y: Stage.position.y}, 0, 'linear', function() {
        setTimeout(function() {tutorial.prompt()},400);
        window.localStorage.setItem("current-step", stepIndex + displacement);
        $(".nestedCommands").remove();
        $("#command-area > .command-list").html('');
      });
    }
  },
  runSpec: function() {
    if (this.currentStep().get('spec')()) {
      this.moveStep(1);
      this.currentStep().success();
    }
  }
});

var tutorial = new Tutorial([
  {
    title: "First Step",
    description: "Hello and welcome to hopscotch!<br/><br/>"+
                 "Try figuring out how to move Daisy so that she stops in the center of the star.",
    spec: function() {
      return (Stage.dino.attr('x') >= 150);
    },
    draw: function(model) {
      model.set("elements", model.star(0,-80));
    },
    methods: ["move"]
  },
  {
    title: "Reach for the clouds!",
    description: "Now the circle is a little higher. Use the jump method to reach it.",
    spec: function() {
      var gotSteps = _.map($('.program .command .name'), function(command){return $(command).html()});
      var x = 50;
      // Cheating and assuming they only move forward
      var hitTheStar = false;
      _.map(gotSteps, function(step) {
        if (step == "move") {
          x += 100;
        } else if (step == "jump" && x == 150) {
          hitTheStar = true;
        }
      });
      return hitTheStar;
    },
    draw: function(model) {
      model.set('elements', model.star(0,-170));
    },
    methods: ["move", "jump"]
  },
  {
    title: "Make daisy dizzy",
    description: "Make daisy spin five times.",
    spec: function() {
      var numSpins = _.foldl($('.program .command .name'), function(memo, command) {
        if ($(command).html() == 'spin') {
          return memo + 1;
        } else {
          return memo;
        }
      }, 0);
      return (numSpins > 4);
    },
    draw: function(model) {},
    methods: ["move", "jump", "spin"]
  },
  {
    title: "Loop-de-loop",
    description: "Try making Daisy spin 5 times while only using the spin method once. Hint: put the spin inside the repeat 5.",
    spec: function() {
      var numLoops = _.foldl($('.program .command .name'), function(memo, command) {
        if ($(command).html() == 'repeat') {
          return memo + 1;
        } else {
          return memo;
        }
      }, 0);
      var totalSpins = _.foldl($('.program .command .name'), function(memo, command) {
        if ($(command).html() == 'spin') {
          return memo + 1;
        } else {
          return memo;
        }
      }, 0);
      var numLoopSpins = _.foldl($('.nestedCommands .command .name'), function(memo, command) {
        if ($(command).html() == 'spin') {
          return memo + 1;
        } else {
          return memo;
        }
      }, 0);
      return (totalSpins == 1 && numLoopSpins == 1 && numLoops > 0);
    },
    draw: function(model) {},
    methods: ["move", "jump", "spin", "loop"]
  },
  {
    title: "Control Daisy yourself",
    description: "Here's something new: when. If you put a method inside when it will run every time you shake (or touch). Try moving Daisy to the end of the screen using only when.",
    spec: function() {
      var numWhen = _.foldl($('.program .command .name'), function(memo, command) {
        if ($(command).html() == 'when') {
          return memo + 1;
        } else {
          return memo;
        }
      }, 0);
      var numNestedMove = _.foldl($('.nestedCommands .command .name'), function(memo, command) {
        if ($(command).html() == 'move') {
          return memo + 1;
        } else {
          return memo;
        }
      }, 0);
      var unNestedMove = _.foldl($('#command-area .command .name'), function(memo, command) {
        if ($(command).html() == 'move') {
          return memo + 1;
        } else {
          return memo;
        }
      }, 0);
      var hitStar = false;
      if (Stage.dino.attr('x') > 730) {
        hitStar = true;
      } else if (numWhen > 0 && numNestedMove > 0 && unNestedMove == 0) {
        setTimeout(function() {
          tutorial.runSpec()
        }, 1000);
      }
      return hitStar;
    },
    draw: function(model) {
      model.set('elements', model.star(580,-80));
    },
    methods: ["move", "jump", "spin", "loop", "when"]
  }
]);

$(function() {
  tutorial.prompt();
  $(".tutorial .previous-step").bind("click", function(e) {
    e.preventDefault();
    tutorial.moveStep(-1);
  });
});

// For development purposes
window.resetTutorial = function() {
  window.localStorage.setItem("current-step", 0);
}



  // $.extend({}, Step_old, {
    // title: "Moonwalk to the sun",
    // description: "Try turning the dino around and walking backwards- it can moonwalk! See if you can moonwalk the dino all the way to the sun and make him big enough to touch it.",
    // spec: function() {
      // var height = Stage.dino.attr('height');
      // var x = Stage.dino.attr('x');
      // if (x > 680 && height > 140 ) {
        // var numTurns = _.foldl($('.program .command .name'), function(memo, command) {
          // if ($(command).html() == 'turn') {
            // return memo + 1;
          // } else {
            // return memo;
          // }
        // }, 0);
        // var numBackward = _.foldl($('.program .command .args option:selected'), function(memo, command) {
          // if ($(command).html() == 'Backward') {
            // return memo + 1;
          // } else {
            // return memo;
          // }
        // }, 0);
        // if (numTurns%2 == 1 && numBackward > 6) {
          // return true
        // } else {
          // return false
        // }
      // } else {
        // return false
      // }
    // },
    // draw: function() {
      // this.elements = [
      // ];
    // }
  // }),
  // $.extend({}, Step_old, {
    // title: "Great Work!",
    // description: "<h1>OK, you've mastered all we can teach you. Make Daisy do a dance!</h1>"
  // })
