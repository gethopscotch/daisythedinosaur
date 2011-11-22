describe("on_load", function() {
  it("should have a commandList", function() {
    expect(CommandList.commands).toEqual("");
  });

  describe("clicking the play button", function() {
    it("should run the commands in the program area", function() {
      var html = "<div id='command-list'>" +
        '<ul id="command-list" class="ui-sortable">' +
          '<li class="command ui-draggable" style="display: list-item; "><span class="name">turn</span></li>'+
          '<li class="command ui-draggable" style="display: list-item; "><span class="name">jump</span></li>' +
          '<li class="loop command ui-draggable" style="display: list-item; ">' +
              '<span class="name">loop</span><span class="times"> 5</span>' +
              '<div class="nestedCommands">' +
                '<div class="loop-commands ui-dialog-content ui-widget-content" style="width: auto; min-height: 66px; height: auto; " scrolltop="0" scrollleft="0">' +
                  '<ul class="ui-sortable">' +
                    '<li class="command ui-draggable" style="display: list-item; "><span class="name">turn</span></li>' +
                    '<li class="command ui-draggable" style="display: list-item; "><span class="name">jump</span></li>' +
                  '</ul>' +
                '</div>' +
              '</div>' +
            '</li>' +
          '</ul>' +

        "</div>";
      $('#jasmine_content').append($(html));
      Onload.init();

    });
  });
});
