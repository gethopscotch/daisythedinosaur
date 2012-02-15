var CommandLibrary = {
  init: function() {
    _.each(_.keys(Methods), function(method) {
      if (method == "repeat") {
        $("<li class='loop command'><span class='name'>repeat</span></li>").append(
          $("<span class='times'> 5</span>")).appendTo("#methods");
        } else {
        var command = $("<li class='command "+method+"'><span class='name'>"
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
  attachNestedSortables: function (e, ui) {
    $('.command-list > li').each(function(i, e){
      if($(this).attr('id') == undefined) {
        var id = Date.now();
        $(this).attr('id', "command-"+id);
        if ($(this).hasClass("loop")||$(this).hasClass('when')) {
          $("#command-area > .command-list").addClass("with-loop");
          var nestedID = 'loop-'+id
          $('.program').append("<div class='nestedCommands' id='loop-"+id+"'>"+
            "<div class='loop-commands'><ul class='command-list'>"+
            "</li></ul></div><div class='bottom'></div></div>");
          Program.init()
        }
      }
    })
    $('.nestedCommands').each(function(){
      var id = _.last($(this).attr('id').split('-'))
      if ($('#command-'+id).length > 0) {
        var pos = $('#command-'+id).offset()
        $('#loop-'+id).css({top: pos.top+12+'px', left: pos.left+138+'px'});
      } else {
        $(this).remove();
      }
    })
  },
  init: function(){
    $(".command-list").sortable({
      placeholder: "ui-state-highlight",
      stop: Program.attachNestedSortables,
      receive: Program.attachNestedSortables,
      connectWith: '.command-list'
    });
  },
  executeMethods: function(command, rest) {
    if (rest.length == 0) {
      command.removeClass("active");
      if ($('body.tutorial-page').length > 0) {
        tutorial.runSpec();
      }
      return;
    } else {
      command.removeClass("active");
      command = _.first(rest);
      command.addClass("active");

      var name = command.find('.name').html();
      rest = _.rest(rest, 1);
      if(command.find('.args').length == 0) {
        Analytics.record("played_"+name);
      } else {
        Analytics.record("played_"+name+"_"+command.find('.args').val());
      }
      Methods[name].call(command.find('.args').val(), Program.executeMethods, command, rest);
    }
  },
  executeEvent: function(command) {
    var id = command.attr("id").split("-")[1];
    Program.parse("loop-" + id);
  },
  parse: function(id) {
    var flattenCommand = function(command) {
      if ($(command).find(".name").html() == "repeat") {
        var range = $(command).find(".times").html();
        var loopBodyID = "#loop-"+_.last(command.id.split('-'));
        var array = _.map(_.range(range), function() {
          return _.map($(loopBodyID).find(".command"), function(commandInner) {
            if ($(commandInner).find(".name").html() == "repeat") {
              return flattenCommand(commandInner);
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
    var commands = _.flatten(_.map($("#" + id + " .command-list > .command"), function(command) {
      return flattenCommand(command);
    }));

    var command = _.first(commands);
    Program.executeMethods(command, commands);
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
      var dialog = $("#play-dialog").dialog({
        title: $("#play-dialog").data('title'),
        resizable: false,
        modal: true,
        width: 400,
        buttons: {
          "Ok": function() {
            $(this).dialog('close');
          }
        }
      });
    }
    else {
      Stage.dino.animate({x: Stage.position.x, y: Stage.position.y}, 0, 'linear', function() {
        Stage.dinoDirection = "right";
        Stage.dino.data("scale", 0)
        Stage.spriteDir = "sprites"
        Stage.dino.attr({"src" : "images/sprites/1.png", height: 80, width: 70});
        if ($('.program .nestedCommands').length > 1) {
          Analytics.record("pressed_play_with_two_loops")
        }
        Program.parse("command-area");
      });
    }
  },
  share: function(e){
    e.preventDefault();
    Analytics.record("tapped_share");
    var dialog = $("#share-dialog").dialog({
      title: $("#share-dialog").data("title"),
      resizable: false,
      close: function(){
        $('.overlay').unbind('touchstart')
        $(".overlay").removeClass("shown");
      }
    });
    $(".overlay").addClass("shown");
    $('.overlay').bind("touchstart", function() {
        dialog.dialog("close");
    });
  },
  help: function(e){
    e.preventDefault();
    Analytics.record("tapped_help");
    var dialog = $("#help-dialog").dialog({
      title: $("#help-dialog").data("title"),
      resizable: false,
      close: function(){
        $('.overlay').unbind('touchstart')
        $(".overlay").removeClass("shown");
      }
    });
    $(".overlay").addClass("shown");
    $('.overlay').bind("touchstart", function() {
      dialog.dialog("close");
    });
  }
}

$(function() {
  Stage.init();
  Analytics.init();
  CommandLibrary.init();
  Program.init();
  $("#share").click(Controls.share);
  $("#help").click(Controls.help);
  $("#play").click(Controls.play);

  $('head meta[name=viewport]').remove();
  $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0" />');

  $("#methods .command").bind("mousedown", function() {
    $(".command-list").addClass("highlight");
    if($('.command-list li').length == 0) {
      $('.arrow').show();
      var pos = $(this).offset()
      $('.arrow').css({top: pos.top-30+'px', left: pos.left+50+'px'});
      $('.arrow').animate({left:pos.left+150+'px', opacity: '1'},'slow','swing',function(){
        $('.arrow').animate({opacity:'0'},1500,function(){
          $('.arrow').hide();
        });
      });
    }
  });
  $("#methods .command").bind("touchend", function() {
    $(".command-list").removeClass("highlight");
  });
  $("#methods .command").bind("touchstart", function() {
    $(".command-list").addClass("highlight");
    if($('.command-list li').length == 0) {
      $('.arrow').show();
      var pos = $(this).offset()
      $('.arrow').css({top: pos.top-30+'px', left: pos.left+50+'px'});
      $('.arrow').animate({left:pos.left+150+'px', opacity: '1'},'slow','swing',function(){
        $('.arrow').animate({opacity:'0'},1500,function(){
          $('.arrow').hide();
        });
      });
    }
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
    drop: function(event, ui) {
      ui.draggable.remove();
      if ($(".command-list").find(".command-list").length == 0) {
        $("#command-area > .command-list").removeClass("with-loop");
      }
    }
  });
});

$('select').live('change', function(){
  var selected = $(this).find('option:selected');
  $(this).find('option').attr('selected', false);
  selected.attr('selected', 'selected');
});
