/*!
 * prototype.js
 * author: youzhiping
 * date: 2017.10.17
 */
(function(w) {

    var extends = {};
    /**
     * sidebarNav
     * @param item            一级菜单item
     * @param sunItem         二级菜单item
     * @param itemActive      一级菜单激活样式
     * @param sunActive       二级菜单激活样式
     * @param el              容器
     * @param url             data请求url
     * @param tempUrl         模板请求url
     * @param fn              二级菜单点击回调函数，传入当前元素
     */
    function VerticalMenu(config) {
        this.item = config.item;
        this.sunItem = config.sunItem;
        this.itemActive = config.itemActive || 'open';
        this.sunActive = config.sunActive || 'active';
        this.fn = config.fn || function() {};
        this.el = config.el;
        this.url = config.url;
        this.tempUrl = config.tempUrl;
    }

    VerticalMenu.prototype = {
        init: function() {
            if (this.url) this.loadTemp();
            this.titleHandler();
            this.sunHandler();
        },
        titleHandler: function() {
            var aItem = $(this.item);
            var iClass = this.itemActive;

            aItem.click(function() {
                var _this = $(this);
                var _parent = _this.parent();
                var _sun = _this.next();

                $.each(aItem, function(index, el) {
                    if ($(el).parent().hasClass(iClass)) {
                        $(el).parent().removeClass(iClass);
                        $(el).next().stop().slideUp(300);
                        return false;
                    }
                });

                if (_sun.is(":hidden")) {
                    _sun.stop().slideDown(300);
                    _parent.addClass(iClass);
                } else {
                    _sun.stop().slideUp(300);
                    _parent.removeClass(iClass);
                }
            });
        },
        sunHandler: function() {
            var aChildren = $(this.sunItem).children();
            var iActive = this.sunActive;
            var fn = this.fn;

            aChildren.click(function() {
                var _this = $(this);

                $.each(aChildren, function(index, el) {
                    if ($(el).hasClass(iActive)) {
                        $(el).removeClass(iActive);
                        return false;
                    }
                });

                _this.addClass(iActive);
                fn(_this);
            });
        },
        loadTemp: function() {
            var _this = this;

            $.ajax({
                type: "GET",
                url: _this.url,
                async: false,
                dataType: "json",
                success: function(data, status, xhr) {
                    if (xhr.status == 200) {
                        $.ajax({
                            type: 'GET',
                            url: _this.tempUrl,
                            async: false,
                            dataType: 'text',
                            success: function(temp) {
                                if (xhr.status == 200) {
                                    var html = juicer(temp, data);
                                    $(_this.el).html(html);
                                }
                            }
                        });
                    }
                }
            });
        }
    };
    extends.sidebarMenu = function(config) {
        return new VerticalMenu(config).init();
    }

    /**
     * Whell 鼠标滚轮事件
     * @param el      元素对象
     * @param up      鼠标向上滚动出发事件
     * @param down    鼠标向下滚动出发事件
     */
    function Wheel(config) {
        this.el = config.el.get(0);
        this.up = config.up || function() {};
        this.down = config.down || function() {};
    }

    Wheel.prototype = {
        init: function() {
            var obj = this.el;
            var fn = this.wheelHandler;
            var _this = this;

            obj.onmousewheel = function(e) {
                fn(e, _this);
            };
            if (obj.addEventListener) obj.addEventListener('DOMMouseScroll', function(e) {
                fn(e, _this);
            }, false);
        },
        wheelHandler: function(ev, _this) {
            var ev = ev || event;
            var b = true;

            if (ev.wheelDelta) {
                b = ev.wheelDelta > 0 ? true : false;
            } else {
                b = ev.detail < 0 ? true : false;
            }

            if (b) {
                _this.up();
            } else {
                _this.down();
            }

            if (ev.preventDefault) ev.preventDefault();

            return false;
        }
    }
    extends.wheel = function(element, upFn, downFn) {
        return new Wheel({
            el: element,
            up: upFn,
            down: downFn
        }).init();
    }
    extends.wheelUp = function(element, fn) {
        return new Wheel({
            el: element,
            up: fn
        }).init();
    }
    extends.wheelDown = function(element, fn) {
        return new Wheel({
            el: element,
            down: fn
        }).init();
    }

    /**
     * 拖拽
     * @param el          元素
     * @param container   限制范围(选择容器的元素)
     * @param direction   限制方向 x y
     * @param limit       限制范围(document) true false(default)
     * @param callback    回调函数:{scaleX,scaleY} 相对于父级拖拽比例
     */

    function Drag(config) {
        this.el = config.el;
        this.container = config.container;
        this.direction = config.direction;
        this.limit = config.limit || false;
        this.callback = config.callback || function() {};
    }

    Drag.prototype = {
        init: function() {
            this.drag(this.el, this.container, this.el.get(0));
        },
        drag: function(el, wrap, obj) {
            var _this = this;

            el.mousedown(function(ev) {
                var ev = ev || event;
                var iLeft = el.offset().left;
                var iTop = el.offset().top;
                var disX = ev.clientX - iLeft;
                var disY = ev.clientY - iTop;

                if (wrap) {
                    wrap.css('position', 'relative');
                    iLeft = el.offset().left - wrap.offset().left;
                    iTop = el.offset().top - wrap.offset().top;
                }

                el.css({
                    "position": "absolute",
                    "top": iTop,
                    "left": iLeft
                });

                if (obj.setCapture) {
                    obj.setCapture();
                }

                _this.move(el, wrap, obj, disX, disY);
                _this.up(obj);

                return false;
            });
        },
        move: function(el, wrap, obj, disX, disY) {
            var _this = this;

            $(document).on('mousemove', function(ev) {
                var ev = ev || event;
                var L = ev.clientX - disX;
                var T = ev.clientY - disY;
                var limitH = 0;
                var limitW = 0;

                if (wrap) {
                    L = L - wrap.offset().left;
                    T = T - wrap.offset().top;
                    limitH = wrap.height() - el.height();
                    limitW = wrap.width() - el.width();
                } else if (_this.limit) {
                    limitH = $(window).height() - el.height();
                    limitW = $(window).width() - el.width();
                }

                if (wrap || _this.limit) {
                    if (_this.direction == 'y' || !_this.direction) {
                        if (T < 0) {
                            T = 0
                        } else if (T > limitH) {
                            T = limitH;
                        }
                    }

                    if (_this.direction == 'x' || !_this.direction) {
                        if (L < 0) {
                            L = 0;
                        } else if (L > limitW) {
                            L = limitW;
                        }
                    }
                }

                if (_this.direction == 'x' || !_this.direction) el.css('left', L);
                if (_this.direction == 'y' || !_this.direction) el.css('top', T);
                _this.callback({
                    scaleY: T / limitH,
                    scaleX: L / limitW
                });
            });
        },
        up: function(obj) {
            $(document).on('mouseup', function() {
                $(document).off('mousemove');
                $(document).off('mouseup');
                if (obj.releaseCapture) {
                    obj.releaseCapture();
                }
            });
        }
    }
    extends.drag = function(config){
        return new Drag(config).init();
    };

    $.extend(extends);
})(window);