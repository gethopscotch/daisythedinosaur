function preloader() {
  if (document.images) {
    var img1 = new Image();
    img1.src = "images/sprites_lg/1.png";
    var img2 = new Image();
    img2.src = "images/sprites_lg/2.png";
    var img3 = new Image();
    img3.src = "images/sprites_lg/3.png";
    var img4 = new Image();
    img4.src = "images/sprites_lg/4.png";
    var img5 = new Image();
    img5.src = "images/sprites_lg/5.png";
    var img6 = new Image();
    img6.src = "images/sprites_lg/6.png";
    var img7 = new Image();
    img7.src = "images/sprites_lg/7.png";
    var img8 = new Image();
    img8.src = "images/sprites_lg/8.png";
    var img9 = new Image();
    img9.src = "images/sprites_lg/9.png";
    var img10 = new Image();
    img10.src = "images/sprites_lg/10.png";
    var img11 = new Image();
    img10.src = "images/play-active.png";
    var img11 = new Image();
    img10.src = "images/help-active.png";
    var img11 = new Image();
    img10.src = "images/share-active.png";
    var imgback = new Image();
    imgback.src = "images/sprites_lg/back.png"
    var imgfront = new Image();
    imgfront.src = "images/sprites_lg/front.png"
    var imgl1 = new Image();
    imgl1.src = "images/sprites_lg/l1.png";
    var imgl2 = new Image();
    imgl2.src = "images/sprites_lg/l2.png";
    var imgl3 = new Image();
    imgl3.src = "images/sprites_lg/l3.png";
    var imgl4 = new Image();
    imgl4.src = "images/sprites_lg/l4.png";
    var imgl5 = new Image();
    imgl5.src = "images/sprites_lg/l5.png";
    var imgl6 = new Image();
    imgl6.src = "images/sprites_lg/l6.png";
    var imgl7 = new Image();
    imgl7.src = "images/sprites_lg/l7.png";
    var imgl8 = new Image();
    imgl8.src = "images/sprites_lg/l8.png";
    var imgl9 = new Image();
    imgl9.src = "images/sprites_lg/l9.png";
    var img1 = new Image();
    img1.src = "images/sprites/1.png";
    var img2 = new Image();
    img2.src = "images/sprites/2.png";
    var img3 = new Image();
    img3.src = "images/sprites/3.png";
    var img4 = new Image();
    img4.src = "images/sprites/4.png";
    var img5 = new Image();
    img5.src = "images/sprites/5.png";
    var img6 = new Image();
    img6.src = "images/sprites/6.png";
    var img7 = new Image();
    img7.src = "images/sprites/7.png";
    var img8 = new Image();
    img8.src = "images/sprites/8.png";
    var img9 = new Image();
    img9.src = "images/sprites/9.png";
    var img10 = new Image();
    img10.src = "images/sprites/10.png";
    var img11 = new Image();
    img10.src = "images/play-active.png";
    var img11 = new Image();
    img10.src = "images/help-active.png";
    var img11 = new Image();
    img10.src = "images/share-active.png";
    var imgback = new Image();
    imgback.src = "images/sprites/back.png"
    var imgfront = new Image();
    imgfront.src = "images/sprites/front.png"
    var imgl1 = new Image();
    imgl1.src = "images/sprites/l1.png";
    var imgl2 = new Image();
    imgl2.src = "images/sprites/l2.png";
    var imgl3 = new Image();
    imgl3.src = "images/sprites/l3.png";
    var imgl4 = new Image();
    imgl4.src = "images/sprites/l4.png";
    var imgl5 = new Image();
    imgl5.src = "images/sprites/l5.png";
    var imgl6 = new Image();
    imgl6.src = "images/sprites/l6.png";
    var imgl7 = new Image();
    imgl7.src = "images/sprites/l7.png";
    var imgl8 = new Image();
    imgl8.src = "images/sprites/l8.png";
    var imgl9 = new Image();
    imgl9.src = "images/sprites/l9.png";
    (new Image()).src = 'images/controls/next.png';
    (new Image()).src = 'images/controls/next-active.png';
    (new Image()).src = 'images/controls/previous.png';
    (new Image()).src = 'images/controls/previous-active.png';
    (new Image()).src = 'images/loop-dialog-bottom.png';
    (new Image()).src = 'images/loop-dialog-middle.png';
    (new Image()).src = 'images/loop-dialog-top.png';
  }
};
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
addLoadEvent(preloader);

