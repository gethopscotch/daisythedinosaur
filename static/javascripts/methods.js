$(function() {

  if ($("body.code-editor").length > 0) {
    window.methodView = Backbone.View.extend({
      tagName: "li",
      render: function() {
        var name = this.model.get('name').join(this.model.get('default'));
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
          viewId: this.id,
          default: this.model.get('default'),
          methodName: this.model.get('methodName')
        });
        newActiveMethod.view.render();
        activeMethods.add(newActiveMethod);
      }
    });

    window.activeMethodView = Backbone.View.extend({
      tagName: "div",
      render: function() {
        this.$el.html(this.model.get('name').join("<input type='text' value=" + this.model.get('default') + ">"));
        $("#middle").append(this.$el);
        this.draggable = new webkit_draggable(this.id, {revert: true});
      },
      events: {
        "doubleTap" : "runMethod",
        "dblclick" : "runMethod"
      },
      runMethod: function() {
        var xOffset = this.$el.find('input').val();
        stage.activeSprite[this.model.get('methodName')](xOffset);
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
      {
        methodName: "move",
        name: ["move ", " steps"],
        viewClass: 'motion',
        id: "move_steps",
        default: 10
      },
      {
        methodName: "turn",
        name: ["turn ", " degrees"],
        viewClass: 'motion',
        id: "turn_degrees",
        default: 180,
      }
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
