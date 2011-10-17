$(function() {
  Hopscotch.init();

  $('#command-list .command').live('mousedown', Hopscotch.listDownCallback);
  $("#command-list .command").live('touchstart', Hopscotch.listDownCallback);
  $('#methods .command').live('mousedown', Hopscotch.methodDownCallback);
  $("#methods .command").live('touchstart', Hopscotch.methodDownCallback);

  $("#play").click(function(){
    _.each(Hopscotch.commandsToRun(), function(command, index) {
      setTimeout(function() {eval('Methods.' + command + '()')}, 500*index);
    });
  })
});


