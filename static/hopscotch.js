var Hopscotch = {
  init: function() {
    this.paper = Raphael($("#print-area"), 50, 600, 600);
    this.circle = this.paper.circle(50, 40, 10);
    this.circle.attr("fill", "#f00");
  },

  moveLeft: function() {
    var anim = this.circle.animate({cx: this.circle.attr('cx') + 100}, 500, 'linear');
  },

  commandsToRun: function() {
    return _.map($("#command-list .command"), function(command) {
      return $(command).html();
    });
  }
}
$(function() {
  Hopscotch.init();

  $("#play").click(function(){
    _.each(Hopscotch.commandsToRun(), function(command, index) {
      setTimeout(function() {eval('Hopscotch.' + command + '()')}, 500*index);
    });
  })
});

