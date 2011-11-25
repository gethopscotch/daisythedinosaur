var CommandLibrary = {
  init: function() {
    _.each(_.keys(Methods), function(method) {
      if (method == "loop") {
        $("<li class='loop command'><span class='name'>loop</span></li>").append(
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
  }
}

var Program = {
  commands: "",
  command: "",
  init: function(){
    $(".command-list").sortable({
      placeholder: "ui-state-highlight",
      receive: function(e, ui) {
        $('#command-area > .command-list > li').each(function(i, e){
          if($(this).attr('id') == undefined) {
            console.log(this);
            var id = i;
            $(this).attr('id', "command-"+id);
            if ($(this).hasClass("loop")) {
              var nestedID = 'loop-'+id
              $('.program').append("<div class='nestedCommands' id='loop-"+id+"'>"+
                "<div class='loop-commands'><ul class='command-list'>"+
                "<li class='command'><span class='name'>roll</span></li></ul></div><div class='bottom'></div></div>");

              pos = $('#command-'+id).offset();
              $('#loop-'+id).css({top: pos.top+15+'px', left: pos.left+153+'px'});
            }
          }
        })
        if ($(ui.item).attr("class") == "loop command ui-draggable") {
          //$('.command-list .loop').doubletap(Program.expandLoop,function(event){},400);
        }
      },
      connectWith: '.command-list'
    });
  },
  executeMethods: function() {
    if (Program.commands.length == 0) {
      Program.command.removeClass("active");
      return;
    } else {
      Program.command.removeClass("active");
      Program.command = _.first(Program.commands);
      Program.command.addClass("active");

      var name = Program.command.find('.name').html();
      Program.commands = _.rest(Program.commands, 1);
      eval('Methods.' + name + '.call("'+ Program.command.find('.args').val() +'", Program.executeMethods)');
    }
  },
  parse: function() {
    var flattenCommand = function(command) {
      if ($(command).find(".name").html() == "loop") {
        var range = $(command).find(".times").html();
        var array = _.map(_.range(range), function() {
          return _.map($(command).find(".command"), function(commandInner) {
            if ($(commandInner).find(".name").html() == "loop") {
              flattenCommand(commandInner)
            } else {
              return $(commandInner);
            }
          });
        });
        return array;
      } else {
        return $(command);
      }
    };
    Program.commands = _.flatten(_.map($(".command-list > .command"), function(command) {
      return flattenCommand(command);
    }));

    Program.command = _.first(Program.commands);
    Stage.dino.animate({x: Stage.position.x, y: Stage.position.y}, 0, 'linear', function() {
      Stage.dino.attr({"src" : "images/sprites/1.png"});
      Program.executeMethods();
    });
  },
  expandLoop: function(event) {
    var loopCommands = $(event.target).parents(".loop").find(".loop-commands").first();
    var dialog = loopCommands.dialog({
      title: "Drag commands here to add them to the loop",
      zIndex: 99,
      close: function() {
        $(event.target).parents("li").find('.nestedCommands').html("");
        loopCommands.clone(true).appendTo($(event.target).parents("li").find('.nestedCommands'));
        $(event.target).parents("li").find('.nestedCommands').append('<div class="bottom"></div>');
        $("#methods .command").draggable({ revert: true,
          revertDuration: 0,
          helper: 'clone',
          connectToSortable: '.command-list'
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
  }
};

var Controls = {
  play: function(e){
    e.preventDefault();
    if( $(".command-list > .command").length == 0 ) {
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
      Program.parse();
    }
  },
  share: function(e){
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
  },
  help: function(e){
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
  }
}

$(function() {
  Stage.init();
  CommandLibrary.init();
  Program.init();
  $("#share").click(Controls.share);
  $("#help").click(Controls.help);
  $("#play").click(Controls.play);

  $('head meta[name=viewport]').remove();
  $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0" />');

  $("#methods .command").bind("touchend", function() {
    $(".command-list").removeClass("highlight");
  });

  $("#methods .command").bind("touchstart", function() {
    $(".command-list").addClass("highlight");
  });

  $("#methods .command").draggable({
    revert: true,
    revertDuration: 0,
    helper: 'clone',
    connectToSortable: '.command-list'
  });


  $("#command-library").droppable({
    accept: ".command-list .command, .loop-commands .command",
    activeClass: 'trash-highlight',
    drop: function(event, ui) { ui.draggable.remove(); }
  });
});

$('select').live('change', function(){
  var selected = $(this).find('option:selected');
  $(this).find('option').attr('selected', false);
  selected.attr('selected', 'selected');
});
