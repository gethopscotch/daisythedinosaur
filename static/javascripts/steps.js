var Step = {
  title: "",
  description: "",
  spec: function() { return true; },
  draw: function() {},
  undraw: function() {
    _.each(this.elements, function(e){
      e.remove();
    })
  },
  elements: [],
  success: function(callback) {
    $('#success').dialog({
      modal: true,
      dialogClass: 'success',
      width: 600,
      title: "Congratulations!",
      buttons: {
        "Try the next challenge": function() {
          callback(this);
        }
      }
    });
  }
}
Step.all = [
  $.extend({}, Step, {
    title: "First Steps",
    description: "Hello and welcome to hopscotch!<br/><br/>"+
                 "Try figuring out how to move Daisy so that she stops in the center of the circle.",
    spec: function() {

      return (Stage.dino.attr('x') == 150 &&
              Stage.dino.attr('y') == 140);
    },
    draw: function() {
      this.elements = [
        Tutorial.target = Stage.paper.circle(190,175,50).attr({'stroke-width': 4, 'stroke': '#F6498A'})
      ];
    },
    methods: ["move"]
  }),
  $.extend({}, Step, {
    title: "Reach for the clouds!",
    description: "Now the circle is a little higher. Use the jump method to reach it.",
    spec: function() {
      var gotSteps = _.map($('.program .command .name'), function(command){return $(command).html()});
      var expectedSteps = ["move", "jump"];
      return _.isEqual(expectedSteps,gotSteps);
    },
    draw: function() {
      this.elements = [
        Tutorial.target = Stage.paper.circle(190,135,50).attr({'stroke-width': 4, 'stroke': '#F6498A'})
      ];
    },
    methods: ["move", "jump"]
  }),
  $.extend({}, Step, {
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
    draw: function() {
    },
    methods: ["spin"]
  }),
  $.extend({}, Step, {
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
    draw: function() {
    },
    methods: ["spin", "loop"]
  }),
  // $.extend({}, Step, {
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
  $.extend({}, Step, {
    title: "Great Work!",
    description: "<h1>OK, you've mastered all we can teach you. Make Daisy do a dance!</h1>"
  })
]

