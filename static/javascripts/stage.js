$(function() {

  if ($("body.code-editor").length > 0) {
    var paper = Raphael(768, 0, 256, 256);
    paper.rect(0,0,256, 256).attr('fill','white');
    window.sprite = paper.image("images/daisy.png", 106, 106, 72, 78);
  }

});
