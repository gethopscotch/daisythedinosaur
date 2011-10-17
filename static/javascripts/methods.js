var Methods = {
  moveRight: function() {
    var anim = Hopscotch.circle.animate({cx: Hopscotch.circle.attr('cx') + 100}, 500, 'linear');
  },

  moveLeft: function() {
    var anim = Hopscotch.circle.animate({cx: Hopscotch.circle.attr('cx') - 100}, 500, 'linear');
  },

  moveUp: function() {
    var anim = Hopscotch.circle.animate({cy: Hopscotch.circle.attr('cy') - 100}, 500, 'linear');
  },

  moveDown: function() {
    var anim = Hopscotch.circle.animate({cy: Hopscotch.circle.attr('cy') + 100}, 500, 'linear');
  }
};

