$(function() {
  Hopscotch.init();

  $('#command-list > .command').live('mousedown', Hopscotch.listDownCallback);
  $("#command-list > .command").live('touchstart', Hopscotch.listDownCallback);
  $('#methods .command').live('mousedown', Hopscotch.methodDownCallback);
  $("#methods .command").live('touchstart', Hopscotch.methodDownCallback);

  var loop = $("<div class='loop command'>Loop</div>").append($("<span> 5</span>"));

  var command = function(command) {
    return $("<div class='command'>" + command + "</div>");
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
        _.times(command.find("span").html(), function() {
          command.find(".command").each(function() {
            var that = $(this)
            setTimeout(function() {eval('Methods.' + that.html() + '()')}, 500*(index));
            index++;
          });
        });
      } else {
        setTimeout(function() {eval('Methods.' + command.html() + '()')}, 500*index);
        index++;
      }
    });
  })
});


