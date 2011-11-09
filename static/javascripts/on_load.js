var CommandList = {
  commands: "",
  command: "",
  executeMethods: function() {
    if (CommandList.commands.length == 0) {
      return;
    } else {
      CommandList.command = _.first(CommandList.commands);
      var name = CommandList.command.find('.name').html();
      CommandList.commands = _.rest(CommandList.commands, 1);
      eval('Methods.' + name + '.call("'+ CommandList.command.find('.args').val() +'", CommandList.executeMethods)');
    }
  }
};



$(function() {

  Hopscotch.init();

  _.each(_.keys(Methods), function(method) {
    if (method == "loop") {
      $("<li class='loop command'><span class='name'>Loop</span></li>").append(
        $("<span class='times'> 5</span>")).appendTo("#methods");
    } else {
      var command = $("<li class='command'><span class='name'>"
        + method + "</span></li>");
      if (Methods[method].args.length > 0) {
        command.append('<select class="args">'+
          _.foldl(Methods[method].args,function(memo, option){
            return memo+"<option>"+option+"</option>" }, '')+"</select></form>");
      }
      $('#methods').append(command)
    }
  });

  $("#share").click(function(e) {
    e.preventDefault();
    $("#share-dialog").dialog({
      title: $("#share-dialog").data("title"),
      resizable: false
    });
  });

  $("#help").click(function(e) {
    e.preventDefault();
    $("#help-dialog").dialog({
      title: $("#help-dialog").data("title"),
      resizable: false
    });
  });

  $("#play").click(function(e){
    e.preventDefault();
    if( $("#command-list > .command").length == 0 ) {
      $("#play-dialog").dialog({
        title: $("#play-dialog").data('title'),
        resizable: false
      });

    }
    else {
      CommandList.commands = _.map($("#command-list .command"), function(command) {return $(command)});
      CommandList.command = _.first(CommandList.commands);
      Hopscotch.dino.animate({x: Hopscotch.position.x, y: Hopscotch.position.y}, 0, 'linear', function() {
        Hopscotch.dino.attr({"src" : "/images/sprites/1.png"});
        CommandList.executeMethods();
      });
    }
  });

  $("#command-list").sortable({ connectWith: '.loop-commands',
    placeholder: "ui-state-highlight",
    receive: function(e, ui) {
      if ($(ui.item).attr("class") == "loop command ui-draggable") {
        $("#command-list .loop-commands").sortable({ connectWith: '#command-list',
          placeholder: "ui-state-highlight",
          tolerance: 'pointer'
        });
      }
  }});


  $("#methods .command").draggable({ revert: true,
    revertDuration: 0,
    helper: 'clone',
    connectToSortable: '#command-list'});

  $("#trash-bin, #command-library").droppable({ accept: "#command-list .command",
    activeClass: 'trash-highlight',
    drop: function(event, ui) {
      ui.draggable.remove();
  }})

});
