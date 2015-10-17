/**
 * jQuery Cross2 Plugin v1.0
 * Created by Nxeed
 * https://github.com/nxeed
 */
if (typeof Object.create !== "function") {
    Object.create = function(obj) {
        function F() {
        }
        F.prototype = obj;
        return new F();
    };
}

(function($, window, document) {
    var Cross2 = {
        $elem: null,
        $slider: null,
        $before: null,
        $after: null,
        $dummy: null,
        $overlay: null,
        $images: null,

        options: {},

        width: 0,
        height: 0,
        val: 0.5,

        init: function(options, el) {
            var base = this;

            this.$elem = $(el);

            this.options = $.extend({}, $.fn.cross2.options, this.$elem.data(), options);

            if (this.options.vertical == true) {
                this.$elem.addClass('cross2-vertical');
            }

            this.val = this.options.value;

            this.$images = this.$elem.find('img');

            this.$before = $('<div style="position: relative" class="cross2-item cross2-item-before"></div>');
            this.$after = $('<div style="position: relative" class="cross2-item cross2-item-after"></div>');

            this.$elem.append(this.$before);
            this.$elem.append(this.$after);

            if (this.$images.eq(0).parent().is('a')) {
                this.$before.append(this.$images.eq(0).parent());
                this.$after.append(this.$images.eq(1).parent());
            } else {
                this.$before.append(this.$images.eq(0));
                this.$after.append(this.$images.eq(1));
            }

            if (this.options.titlesEnabled) {
                this.$before.append('<span style="z-index: 2" class="cross2-item-title">' + this.options.titleBefore + '</span>');
                this.$after.append('<span style="z-index: 2" class="cross2-item-title">' + this.options.titleAfter + '</span>');
            }

            this.$before.css({
                position: 'absolute',
                width: '100%',
                zIndex: 2
            });

            this.$after.css({
                position: 'absolute',
                width: '100%',
                zIndex: 1
            });

            this.$dummy = $('<img src="'+this.$images.eq(0).attr('src')+'" alt="Cross2 Dummy" />');

            this.$dummy.css({
                position: 'relative',
                visibility: 'hidden'
            });

            this.$elem.append(base.$dummy);

            if (base.options.mousemoveEnabled == false) {
                this.$slider = $('<a href="#" class="cross2-slider"><span></span></a>');
            } else {
                this.$slider = $('<div class="cross2-slider"><span></span></div>');
            }

            this.$elem.append(base.$slider);

            this.$overlay = $('<div class="cross2-overlay" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 5;"></div>');
            this.$elem.append(base.$overlay);
            this.$overlay.hide();

            this.$slider.bind('click.cross2', function(e) {
                if (base.options.mousemoveEnabled == false) {
                    $(this).focus();
                    base.refresh();
                }

                e.preventDefault();
            });

            if (this.options.mousemoveEnabled == false) {
                this.$slider.bind('focusin.cross2', function(e) {
                    base.$elem.addClass('cross2-focused');
                });

                this.$slider.bind('focusout.cross2', function(e) {
                    base.$elem.removeClass('cross2-focused');
                });
            }

            if (this.options.mousemoveEnabled == false) {
                this.$slider.bind('keydown.cross2', function(e) {

                    if (base.options.vertical == true && (e.keyCode == 38 || e.keyCode == 40)) {
                        base.set(e.keyCode == 38 ? base.val - 0.05 : base.val + 0.05);
                        base.refresh();
                    } else if(base.options.vertical == false && (e.keyCode == 37 || e.keyCode == 39)) {
                        base.set(e.keyCode == 37 ? base.val - 0.05 : base.val + 0.05);
                        base.refresh();
                    }
                });
            }

            this.$slider.css({
                zIndex: 3
            });

            $(window).resize(function() {
                base.refresh();
                base.$elem.stop(true, false);
            });

            var currentVal = 0;

            if (this.options.mousemoveEnabled == false) {
                this.$slider.bind('dblclick.cross2', function(e) {
                    base.showHalfs();
                });
            }

            if (this.options.clickEnabled == true && this.options.mousemoveEnabled == false) {
                this.$elem.bind('mousedown.cross2', function(e) {
                    var offset = base.options.vertical == true ? e.pageY - $(this).offset().top : e.pageX - $(this).offset().left;
                    base.moveToOffset(offset);
                });
            }

            if (this.options.mousemoveEnabled == true) {
                this.$elem.bind('mousemove.cross2', function(e) {
                    var offset = base.options.vertical == true ? e.pageY - $(this).offset().top : e.pageX - $(this).offset().left;
                    base.setOffset(offset);
                    base.refresh();
                });
            }

            if (this.options.mousewheelEnabled == true && this.options.mousemoveEnabled == false) {
                this.$elem.bind('mousewheel.cross2', function(e) {
                    if (e.deltaY < 0 && base.val == (base.options.vertical == true ? 1 : 0) || e.deltaY > 0 && base.val == (base.options.vertical == true ? 0 : 1)) {
                        return false;
                    }

                    e.preventDefault();

                    var upVal = base.options.vertical == true ? base.val - 0.05 : base.val + 0.05;
                    var downVal = base.options.vertical == true ? base.val + 0.05 : base.val - 0.05;

                    base.set(e.deltaY > 0 ? upVal : downVal);
                    base.refresh();
                });
            }

            this.$slider.bind('dragstart.cross2', function(e, dd) {
                base.$elem.addClass('cross2-drag');
                currentVal = base.val;
                base.$overlay.show();

                if (base.options.mousemoveEnabled == false) {
                    base.$slider.focus();
                }
            }).bind('drag.cross2', function(e, dd) {
                var k = base.options.vertical == true ? dd.deltaY : dd.deltaX;
                var k2 = base.options.vertical == true ? base.height : base.width;

                var offset = currentVal * k2 + k;

                base.setOffset(offset);
                base.refresh();
            }).bind('dragend.cross2', function(e, dd) {
                base.$elem.removeClass('cross2-drag');
                base.$overlay.hide();
            });

            base.refresh();

            return this;
        },
        setOffset: function(offset) {
            var k = this.options.vertical == true ? this.height : this.width;

            if (offset > k) {
                offset = k;
            } else if(offset < 0) {
                offset = 0;
            }

            var val = offset / k;
            this.val = val;
            return this;
        },
        set: function(val) {
            var k = this.options.vertical == true ? this.height : this.width;

            this.setOffset(k * val);

            return this;
        },
        refresh: function() {
            this.width = this.$dummy.outerWidth();
            this.height = this.$dummy.outerHeight();
            this.$elem.scrollTop(0);
            this.$elem.scrollLeft(0);
            var k = this.options.vertical == true ? this.height : this.width;

            var offset = Math.floor(k * this.val);
            var offsetType = this.options.vertical == true ? 'top' : 'left';
            this.$slider.css(offsetType, offset + 'px');

            var clip = this.options.vertical == true 
                ? 'rect(0, ' + this.width + 'px,' + offset + 'px, 0)'
                : 'rect(0, ' + offset + 'px,' + this.height + 'px, 0)';

            this.$before.css('clip', clip);

            return this;
        },
        moveToOffset: function(offset) {
            var base = this;
            var offsetType = this.options.vertical == true ? 'top' : 'left';

            var animationOptions = {
                duration: this.options.animationDuration,
                easing: this.options.easing,
                step: function() {
                    base.setOffset(parseInt(base.$slider.css(offsetType))).refresh();
                },
                complete: function() {
                    base.setOffset(parseInt(base.$slider.css(offsetType))).refresh();
                }
            };

            if (this.options.vertical == true) {
                this.$slider.stop(true, false).animate({top: offset}, animationOptions);
            } else {
                this.$slider.stop(true, false).animate({left: offset}, animationOptions);
            }

            return this;
        },
        moveTo: function(val) {
            var k = this.options.vertical == true ? this.height : this.width;
            this.moveToOffset(k * val);

            return this;
        },
        showBefore: function() {
            var k = this.options.vertical == true ? this.height : this.width;
            this.moveToOffset(k);

            return this;
        },
        showAfter: function() {
            this.moveToOffset(0);

            return this;
        },
        showHalfs: function() {
            var k = this.options.vertical == true ? this.height : this.width;
            this.moveToOffset(k / 2);

            return this;
        },
        destroy: function() {
            var base = this;
            this.$elem.unbind('.cross2');
            this.$elem.removeData();
            this.$elem.removeClass('cross2-drag cross2-focused cross2-vertical');
            this.$slider.unbind('.cross2');
            this.$slider.remove();
            this.$dummy.remove();
            this.$overlay.remove();

            this.$images.each(function() {
                base.$elem.append($(this));
            });

            this.$before.remove();
            this.$after.remove();
        }
    };

    $.fn.cross2 = function(options) {
        return this.each(function() {
            if ($(this).data("cross2-init") == true) {
                return false;
            }

            $(this).data("cross2-init", true);
            var cross2 = Object.create(Cross2);

            cross2.init(options, this);
            $.data(this, "cross2", cross2);
        });
    };

    $.fn.cross2.options = {
        value: 0.5,
        vertical: false,
        animationDuration: 150,
        easing: 'swing',
        clickEnabled: false,
        mousemoveEnabled: false,
        mousewheelEnabled: false,
        titlesEnabled: true,
        titleBefore: 'Before',
        titleAfter: 'After'
    };

}(jQuery, window, document));
