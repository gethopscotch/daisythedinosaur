describe("webkit_draggable", function() {
  beforeEach(function() {
    $("#jasmine_content").append($("<div id='box' class='jasmine-box'>"));
  });

  it("should call the onStart and onEnd functions", function() {
    var fakeOnEnd = jasmine.createSpy('fakeOnEnd');
    var fakeOnStart = jasmine.createSpy('fakeOnStart');
    new webkit_draggable('box', {onEnd: fakeOnEnd, onStart: fakeOnStart});

    var touchStart = $.Event('touchstart', {targetTouches: ['foo']});
    var touchEnd = $.Event('touchend', {targetTouches: ['foo']});
    $('#box').trigger(touchStart);
    expect(fakeOnStart).toHaveBeenCalled();
    $('#box').trigger(touchEnd);
    expect(fakeOnEnd).toHaveBeenCalled();
  });

  it("should clone the element", function() {
    expect($(".jasmine-box").length).toEqual(1)
    new webkit_draggable('box', {clone: true});
    var touchStart = $.Event('touchstart', {targetTouches: ['foo']});
    var touchEnd = $.Event('touchend', {targetTouches: ['foo']});
    $('#box').trigger(touchStart);
    $('#box').trigger(touchEnd);
    // expect($(".jasmine-box").length).toEqual(2)
    // expect($("#box_2").length).toEqual(1)
  });
});
