$(function() {

  if ($("body.code-editor").length > 0) {
    window.methodView = Backbone.View.extend({
      tagName: "li",
      render: function() {
        var name = this.model.get('name').join(10);
        this.$el.text(name);
        $("#command_selector ul." + this.className).append(this.$el);
      },
      events: {
        "longTap" : "addToEditor",
        "click" : "addToEditor"
      },
      addToEditor: function() {
        var newActiveMethod = new activeMethodModel({
          name: this.model.get('name'),
          viewClass: this.className,
          viewId: this.id
        });
        newActiveMethod.view.render();
        activeMethods.add(newActiveMethod);
      }
    });

    window.activeMethodView = Backbone.View.extend({
      tagName: "div",
      render: function() {
        this.$el.html(this.model.get('name').join("<input type='text' value=10>"));
        $("#middle").append(this.$el);
        this.draggable = new webkit_draggable(this.id, {revert: true});
      },
      events: {
        "doubleTap" : "runMethod",
        "dblclick" : "runMethod"
      },
      runMethod: function() {
        var xOffset = this.$el.find('input').val();
        stage.activeSprite.move(xOffset);
      }
    });

    window.methodModel = Backbone.Model.extend({
      initialize: function() {
        this.view = new methodView({
          className: this.get('viewClass'),
          id: this.get('id'),
          model: this
        });
      }
    });

    window.activeMethodModel = Backbone.Model.extend({
      initialize: function() {
        this.view = new activeMethodView({
          className: this.get('viewClass'),
          id: this.get('viewId') + this.cid,
          model: this
        });
      }
    });

    window.methodCollection = Backbone.Collection.extend({
      model: methodModel,
      render: function() {
        this.each(function(method) {
          method.view.render();
        });
      }
    });

    window.motionMethods = new methodCollection([
      {name: ["move ", " steps"],  viewClass: 'motion', id: "move_steps"}
    ]);
    motionMethods.render();

    window.activeMethodCollection = Backbone.Collection.extend({
      model: activeMethodModel,
      render: function() {
        webkit_drop.add('middle');
      }
    });
    window.activeMethods = new activeMethodCollection();
    window.activeMethods.render();
  }
});
