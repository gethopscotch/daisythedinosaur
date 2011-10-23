$(function() {
  Hopscotch.init();

  var loop = $("<li class='loop command'>Loop</li>").append($("<span class='times'> 5</span>")).append("<ul class='loop-commands'></ul>");

  var command = function(command) {
    return $("<li class='command'><span class='name'>" + command + "</span></li>").append("<div class='handle'></div>");
  };

  _.each(_.keys(Methods), function(method) {
    if (method == "loop") {
      loop.appendTo("#methods");
    } else {
      $('#methods').append(command(method));
    }
  });

  $("#play").click(function(){
    var index = 0;
    Hopscotch.circle.animate({cx: Hopscotch.circlePosition.x, cy: Hopscotch.circlePosition.y}, 0, 'linear')
    _.each($("#command-list > .command"), function(command) {
      command = $(command);
      if(command.hasClass("loop")) {
        _.times(command.find("span.times").html(), function() {
          command.find(".command .name").each(function() {
            var that = $(this)
            setTimeout(function() {eval('Methods.' + that.html() + '()')}, 500*(index));
            index++;
          });
        });
      } else {
        setTimeout(function() {eval('Methods.' + command.find('.name').html() + '()')}, 500*index);
        index++;
      }
    });
  });

  $("#command-list").sortable({ connectWith: '.loop-commands',
    placeholder: "ui-state-highlight",
    receive: function(e, ui) {
    if ($(ui.item).attr("class") == "loop command ui-draggable") {
      $("#command-list .loop-commands").sortable({ connectWith: '#command-list',
        placeholder: "ui-state-highlight",
        tolerance: 'pointer',
        handle: '.handle'});
    }
  }});


  $("#methods .command").draggable({ revert: true,
    revertDuration: 0,
    helper: 'clone',
    connectToSortable: '#command-list'});

  $("#trash-bin").droppable({ accept: "#command-list .command",
    activeClass: 'trash-highlight',
    drop: function(event, ui) {
      ui.draggable.remove();
  }})

});


