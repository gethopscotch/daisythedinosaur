$(function(){

  if ($("body.code-editor").length > 0) {
    window.menuView = Backbone.View.extend({
      tagName: 'li',
      render: function() {
        this.$el.text(this.className);
        $("#menu_selector ul").append(this.$el);
      },
      events: {
        "longTap" : "switchMenu",
        "click" : "switchMenu"
      },
      switchMenu: function() {
        $("#left").attr('class', this.className);
      }
    });

    window.menuModel = Backbone.Model.extend({
      initialize: function() {
        this.view = new menuView({className: this.get('name')});
      }
    });

    window.menuCollection = Backbone.Collection.extend({
      model: menuModel,
      render: function() {
        this.each(function(menu) {
          menu.view.render();
        });
      }
    });

    window.Menus = new menuCollection([{name: "motion"}])
    Menus.render();
  }
});
