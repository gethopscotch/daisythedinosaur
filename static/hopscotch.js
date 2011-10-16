$(function() {
  var paper = Raphael(10, 50, 600, 600);
  var circle = paper.circle(50, 40, 10);
  circle.attr("fill", "#f00");

  $("#play").click(function(){
    console.log(circle);
    var anim = circle.animate({cx: 150}, 500, 'linear');
  })
});

