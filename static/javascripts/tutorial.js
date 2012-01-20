var currentStep = parseInt(window.localStorage.getItem("current-step"));
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
  elements: []
}

$(function(){
  _.each(Tutorial.steps, function(step, n) {
    $('.tutorial').append($('<div data-title="'+step.title+'"class="step-dialog'+n+'">'+step.description+'</div>'));
  });
  Tutorial.promptStep();
})

var Tutorial = {
  promptStep: function() {
    if (currentStep > Tutorial.steps.length - 1) {
      $('#current-step').attr('class',"tutorial-finished");
    } else {
      if (currentStep == undefined) {
        currentStep = 0
        window.localStorage.setItem("key", 0);
      }
      $('#current-step').attr('class', 'step-'+currentStep);
      Tutorial.steps[currentStep].draw();
      $('.step-dialog'+currentStep).dialog({modal: true, title: Tutorial.steps[currentStep].title});
    }
  },
  runStepSpec: function() {
    if (Tutorial.steps[currentStep].spec()) {
      Tutorial.steps[currentStep].undraw();
      window.localStorage.setItem("current-step", currentStep + 1);
      currentStep = parseInt(window.localStorage.getItem("current-step"));
      setTimeout(function() {Tutorial.promptStep()},400);
    }
  },
  steps: [
    $.extend({}, Step, {
      title: "First Steps",
      description: "Hello and welcome to hopscotch!<br/><br/>"+
                   "Try figuring out how to move Daisy into the red circle.",
      spec: function() {
        return ($('.program .command').length == 1 &&
        $('.program .move select').val() == "Forward");
      },
      draw: function() {
        this.elements = [
          Stage.paper.circle(190,175,50).attr({'stroke-width': 4, 'stroke': 'red'})
        ];
      }
    }),
    $.extend({}, Step, {
      title: "Reach for the clouds!",
      description: "Now the red circle is a little higher. Use the jump method to reach it.",
      spec: function() {
        var gotSteps = _.map($('.program .command .name'), function(command){return $(command).html()});
        var expectedSteps = ["move", "jump"];
        return _.isEqual(expectedSteps,gotSteps);
      },
      draw: function() {
        this.elements = [
          Stage.paper.circle(200,135,40).attr({'stroke-width': 4, 'stroke': 'red'})
        ];
      }
    }),
    $.extend({}, Step, {
      title: "Great Work!",
      description: "OK, you've mastered all we can teach you. Make Daisy do a dance!"
    })
  ]
}

// Only for testing purposes, for now
window.resetTutorial = function() {
  window.localStorage.setItem("current-step", 0);
}
