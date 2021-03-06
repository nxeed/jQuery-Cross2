JQuery Cross2
===================
Just another jQuery based image diff tool for creating an animated, customizable image comparison slider to view before and after images.

[Demo page](http://nxeed.github.io/jQuery-Cross2/)
-------------

Features:
-------------
* Horizontal or vertical comparison slider.
* Custom text labels for before / after images.
* Based on [event.drag](https://github.com/threedubmedia/jquery.threedubmedia/tree/master/event.drag).
* Supports [mousewheel](https://github.com/jquery/jquery-mousewheel) and [easing](https://github.com/gdsmith/jquery.easing).
* Focusable.
* Keyboard control supported.
* Responsive

Basic Usage:
-------------
* Include the required jQuery Cross2 plugin's stylesheet.
``` html
<link href="/path/to/jquery.cross2.css" rel="stylesheet">
```
* Include the jQuery Cross2 plugin's script and other required resources.
``` html
<script src="/path/to/jquery.min.js"></script>
<script src="/path/to/jquery.event.drag.min.js"></script>
<script src="/path/to/jquery.cross2.js"></script>
```
*  Include the OPTIONAL jQuery mousewheel plugin for mouse wheel support.
``` html
<script src="/path/to/jquery.mousewheel.js"></script>
```
*  Include the OPTIONAL jQuery easing plugin for additional easing effects.
``` html
<script src="/path/to/jquery.easing.min.js"></script>
```
* Insert before and after images you want to compare into a container like this:
``` html
<div class="cross2">
  <img src="1.jpg" alt="before" />
  <img src="2.jpg" alt="after" />
</div>
<!-- OR -->
<div class="cross2">
  <a href="#"><img src="1.jpg" alt="before" /></a>
  <a href="#"><img src="2.jpg" alt="after" /></a>
</div>
```
*  Initialize the plugin.
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
      vertical: false, // vertial or horizontal slider
      animationDuration: 150, // animation duration in mc
      easing: 'swing', // easing effect(requirs jQuery easing plugin)
      clickEnabled: false, // compare images on click
      mousemoveEnabled: false, // compare images on mouse over
      mousewheelEnabled: false, // enable mouse wheel(requirs jQuery mousewheel plugin)
      titlesEnabled: true, // show before / after text labels
      titleBefore: 'Before', // text label for before image
      titleAfter: 'After', // text label for after image
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
* IOS (iPhone, iPad)
