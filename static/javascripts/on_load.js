$(function() {
  Hopscotch.init();

  _.each(_.keys(Methods), function(method) {
    if (method == "loop") {
      $("<li class='loop command'><span class='name'>Loop</span></li>").append(
        $("<span class='times'> 5</span>")).append("<ul class='loop-commands'></ul>").appendTo("#methods");
    } else {
      var command = $("<li class='command'><span class='name'>"
        + method + "</span></li>").append("<div class='handle'></div>");
      if (Methods[method].args.length > 0) {
        command.append('<select class="args">'+
          _.foldl(Methods[method].args,function(memo, option){
            return memo+"<option>"+option+"</option>" }, '')+"</select></form>");
      }
      $('#methods').append(command)
    }
  });

  $("#play").click(function(){
    var index = 0;
    console.log(Hopscotch.circle);
    Hopscotch.circle.animate({cx: Hopscotch.circlePosition.x, cy: Hopscotch.circlePosition.y}, 0, 'linear',
      function(){
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
                }, 500*index);
                index++;
              });
            });
          } else {
            setTimeout(function() {
              $(".command").removeClass("active");
              command.addClass("active");
              eval('Methods.' + command.find('.name').html() + '.call("'+ command.find('.args').val() +'")');
            }, 500*index);
            index++;
          }
        });
        setTimeout(function() {
          $('.command').removeClass("active");
        }, 500*(index));
      }
    );
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

  $("#trash-bin").droppable({ accept: "#command-list .command",
    activeClass: 'trash-highlight',
    drop: function(event, ui) {
      ui.draggable.remove();
  }})

});
