var CommandList = {
  commands: "",
  command: "",
  executeMethods: function() {
    if (CommandList.commands.length == 0) {
      CommandList.command.removeClass("active");
      return;
    } else {
      CommandList.command.removeClass("active");
      CommandList.command = _.first(CommandList.commands);
      CommandList.command.addClass("active");

      var name = CommandList.command.find('.name').html();
      CommandList.commands = _.rest(CommandList.commands, 1);
      eval('Methods.' + name + '.call("'+ CommandList.command.find('.args').val() +'", CommandList.executeMethods)');
    }
  }
};




var Onload = {
  init: function() {
    Onload.showMethods();
    Onload.share();
    Onload.play();
    Onload.help();
    Onload.createSortable();
    Onload.bindEvents();
  },

  showMethods: function() {
    _.each(_.keys(Methods), function(method) {
      if (method == "loop") {
        var loopCommands = "<div class='nestedCommands'><div class='loop-commands'> <ul> </ul> </div></div>"
        $("<li class='loop command'><span class='name'>loop</span></li>").append(
          $("<span class='times'> 5</span>")).append(loopCommands).appendTo("#methods");
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
  },

  share: function() {
    $("#share").click(function(e) {
      e.preventDefault();
      var dialog = $("#share-dialog").dialog({
        title: $("#share-dialog").data("title"),
        resizable: false,
        close: function(){
          $('body').unbind('touchstart')
        }
      });
      $('body').bind("touchstart", function() {
          dialog.dialog("close");
      });
    });
  },

  help: function() {
    $("#help").click(function(e) {
      e.preventDefault();
      $("#help-dialog").dialog({
        title: $("#help-dialog").data("title"),
        resizable: false,
        close: function(){
          $('body').unbind('touchstart')
        }
      });
      $('body').bind("touchstart", function() {
          dialog.dialog("close");
      });
    });
  },

  play: function() {
    $("#play").click(function(e){
      e.preventDefault();
      if( $("#command-list > .command").length == 0 ) {
        $("#play-dialog").dialog({
          title: $("#play-dialog").data('title'),
          resizable: false,
          close: function(){
            $('body').unbind('touchstart')
          }
        });
        $('body').bind("touchstart", function() {
            dialog.dialog("close");
        });

      }
      else {
        CommandList.commands = _.flatten(_.map($("#command-list > .command"), function(command) {
          if ($(command).find(".name").html() == "loop") {
            var range = $(command).find(".times").html();
            var array = _.map(_.range(range), function() {
              return _.map($(command).find(".command"), function(command) {
                return $(command);
              });
            });
            return array;
          } else {
            return $(command);
          }
        }));
        CommandList.command = _.first(CommandList.commands);
        Hopscotch.dino.animate({x: Hopscotch.position.x, y: Hopscotch.position.y}, 0, 'linear', function() {
          Hopscotch.dino.attr({"src" : "images/sprites/1.png"});
          CommandList.executeMethods();
        });
      }
    });
  },

  createSortable: function() {
    $("#command-list").sortable({
      placeholder: "ui-state-highlight",
      receive: function(e, ui) {
        if ($(ui.item).attr("class") == "loop command ui-draggable") {

          $('#command-list .loop').doubletap(
              /** doubletap-dblclick callback */
              function(event){
                var loopCommands = $(event.target).parents(".loop").find(".loop-commands").first();
                var dialog = loopCommands.dialog({
                  title: "Drag commands here to add them to the loop",
                  zIndex: 99,
                  close: function() {
                    $(event.target).parents("li").find('.nestedCommands').html("");
                    loopCommands.clone(true).appendTo($(event.target).parents("li").find('.nestedCommands'));
                    $("#methods .command").draggable({ revert: true,
                      revertDuration: 0,
                      helper: 'clone',
                      connectToSortable: '#command-list'
                    });
                  }
                });
                $(dialog).find('ul').first().sortable({ placeholder: 'ui-state-highlight'});
                $("#methods .command").draggable({
                  revert: true,
                  revertDuration: 0,
                  helper: 'clone',
                  connectToSortable: $(dialog).find('ul')
                });

              },
              /** touch-click callback (touch) */
              function(event){
                  // alert('single-tap');
              },
              /** doubletap-dblclick delay (default is 500 ms) */
              400
          );
        }
    }});
  },

  bindEvents: function() {
   $("#methods .command").bind("touchend", function() {
      $("#command-list").removeClass("highlight");
    });

    $("#methods .command").bind("touchstart", function() {
      $("#command-list").addClass("highlight");
    });

    $("#methods .command").draggable({ revert: true,
      revertDuration: 0,
      helper: 'clone',
      connectToSortable: '#command-list'});

    $("#trash-bin, #command-library").droppable({
      accept: "#command-list .command, .loop-commands .command",
      activeClass: 'trash-highlight',
      drop: function(event, ui) {
        ui.draggable.remove();
    }});

    $('select').live('change', function(){
      var selected = $(this).find('option:selected');
      $(this).find('option').attr('selected', false);
      selected.attr('selected', 'selected');
    });
  }

}

$(function() {

  Hopscotch.init();
  $('head meta[name=viewport]').remove();
  $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0" />');

  Onload.init();
});

