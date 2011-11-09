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
      var index = 0;
      Hopscotch.dino.animate({x: Hopscotch.position.x, y: Hopscotch.position.y}, 0, 'linear',
        function(){
          Hopscotch.dino.attr({"src" : "/images/sprites/1.png"})
          var runTime = 0;
          _.each($("#command-list > .command"), function(command) {
            command = $(command);
            if(command.hasClass("loop")) {
              _.times(command.find("span.times").html(), function() {
                command.find(".command").each(function() {
                  var that = $(this)
                  setTimeout(function() {
                    $(".command").removeClass("active");
                    that.addClass("active");
                    eval('Methods.' + that.find('.name').html() + '.call("'+ that.find('.args').val() +'")');
                  }, runTime);
                  runTime += Timeouts[that];
                  index++;
                });
              });
            } else {
              var name = command.find('.name').html();
              setTimeout(function() {
                $(".command").removeClass("active");
                command.addClass("active");
                eval('Methods.' + name + '.call("'+ command.find('.args').val() +'")');
              }, runTime);
              runTime += Timeouts[name];
              index++;
            }
          });
          setTimeout(function() {
            $('.command').removeClass("active");
          }, runTime);
        }
      );
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
