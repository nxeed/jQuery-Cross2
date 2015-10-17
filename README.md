JQuery Cross2
===================
Just another jQuery Before/After Slider.

The possibilities for this plugin are endless. Photographs can show the before and after differences between images, Doctors can have before and after images of patients, Modelers can show the before and after images of projects and on and on.

[Demo page](http://nxeed.github.io/jQuery-Cross2/)
-------------

Features:
-------------
* Powerful customization
* Mobile, IE8 support
* Based on [event.drag](https://github.com/threedubmedia/jquery.threedubmedia/tree/master/event.drag)
* Supports [mousewheel](https://github.com/jquery/jquery-mousewheel) and [easing](https://github.com/gdsmith/jquery.easing)
* Focusable
* Keyboard control supported

Basic Usage:
-------------
* Load the needed resources in the document.
``` html
<link href="jquery.cross2.min.css" rel="stylesheet" />
<script src="jquery.min.js"></script>
<script src="jquery.event.drag.min.js"></script>

<!-- OPTIONAL -->
<script src="https://cdn.jsdelivr.net/mousewheel/3.1.9/jquery.mousewheel.min.js"></script>
<script src="https://cdn.jsdelivr.net/jquery.easing/1.3/jquery.easing.1.3.min.js"></script>
<!-- /OPTIONAL -->

<script src="jquery.cross2.min.js"></script>
```
* Wrap two images into a cross2 container.
``` html
<div class="cross2">
  <img src="imgBefore.jpg" alt="before" />
  <img src="imgAfter.jpg" alt="after" />
</div>
<!-- OR -->
<div class="cross2">
  <a href="#" target="_blank"><img src="imgBefore.jpg" alt="before" /></a>
  <a href="#" target="_blank"><img src="imgAfter.jpg" alt="after" /></a>
</div>
```
* Enable the plugin.
``` html
<script>
  $(window).load(function() {
    $('.cross2').cross2();
  });
</script>
```
Default Options:
-------------
``` html
<script>
  $(window).load(function() {
    $('.cross2').cross2({
      value: 0.5, // initial slider position
      vertical: false, // use vartical orientation
      animationDuration: 150, // animation duration in mc
      easing: 'swing', // extra easing function(jquery.easing required)
      clickEnabled: false, // slide when click
      mousemoveEnabled: false, // slide when mouse track
      mousewheelEnabled: false, // mousewheel scrolling(jquery.mousewheel required)
      titlesEnabled: true, // show titles
      titleBefore: 'Before', // title text for first image
      titleAfter: 'After', // title text for second image
    });
  });
</script>
```
Support:
-------------
* IE8+
* Firefox
* Chrome
* Safari
* Android
* OS (iPhone, iPad)
