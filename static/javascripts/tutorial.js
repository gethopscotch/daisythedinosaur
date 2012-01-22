var currentStep = window.localStorage.getItem("current-step");
if (currentStep == undefined) {
  currentStep = 0;
  window.localStorage.setItem("current-step", 0);
} else {
  currentStep = parseInt(currentStep);
}


$(function(){
  _.each(Tutorial.steps, function(step, n) {
    $('.tutorial').append($('<div data-title="'+step.title+'"class="step-dialog'+n+'">'+step.description+'</div>'));
  });
  Tutorial.promptStep();
})

var Tutorial = {
  promptStep: function(dialog) {
    if (currentStep >= Tutorial.steps.length - 1) {
      $('#current-step').attr('class',"tutorial-finished");
    } else {
      if (currentStep == undefined || isNaN(currentStep)) {
        currentStep = 0
        window.localStorage.setItem("current-step", 0);
      }
      $('#current-step').attr('class', 'tutorial-step step-'+currentStep);
      var step = Tutorial.steps[currentStep];
      step.draw();
      _.each(step.methods, function(method) {
        $("#current-step").find("." + method ).show();
      });
      if ($(".ui-dialog").length > 0) {
        $(dialog).dialog('option', 'title', step.title);
        $(dialog).dialog('option', 'buttons', {
          "Let's go!": function() {
            $(this).dialog('close');
          }
        });
        $(".ui-dialog-content").html($('.step-dialog' + currentStep));
      } else {
        $('.step-dialog'+currentStep).dialog({
          modal: true,
          title: step.title,
          buttons: {
            "Let's go!": function() {
              $(this).dialog('close');
            }
          }
        });
      }
    }
  },
  runStepSpec: function() {
    if (Tutorial.steps[currentStep].spec()) {
      Tutorial.steps[currentStep].success(Tutorial.nextStep);
    }
  },
  nextStep: function(dialog) {
    Stage.dino.animate({x: Stage.position.x, y: Stage.position.y}, 0, 'linear', function() {
      Tutorial.steps[currentStep].undraw();
      window.localStorage.setItem("current-step", currentStep + 1);
      currentStep = parseInt(window.localStorage.getItem("current-step"));
      setTimeout(function() {Tutorial.promptStep(dialog)},400);
      $(".nestedCommands").remove();
      $("#command-area > .command-list").html('');
    });
  },
  steps: Step.all
}

// Only for testing purposes, for now
window.resetTutorial = function() {
  window.localStorage.setItem("current-step", 0);
}
