var Hopscotch = {
  init: function() {
    this.paper = Raphael($("#print-area"), 50, 600, 600);
    this.circle = this.paper.circle(50, 40, 10);
    this.circle.attr("fill", "#f00");
  },

  moveLeft: function() {
    var anim = this.circle.animate({cx: 150}, 500, 'linear');
  },

  commands: ['moveLeft']
}
$(function() {
  Hopscotch.init();
  _.each(Hopscotch.commands, function(command) {
    $("#command-area #command-list").append($("<div class='command'>"+command+"</div>"));
  })

  $("#play").click(function(){
    _.each(Hopscotch.commands, function(command) {
      eval('Hopscotch.' + command + '()');
    });
  })
});

