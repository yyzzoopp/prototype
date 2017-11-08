/*!
 * prototype.js
 * author: youzhiping
 * date: 2017.10.17
 */
(function(w) {
    var extendes = {};

    /**
     * table
     * 
     */
    function Table(config) {
        this.container = config.container;
        this.thead = config.thead;
        this.data = config.data;
        this.key = config.key;
        this.class = config.class || 'w-table-strip w-table-hover';
        this.tdCustom = config.tdCustom || '';
        this.callback = config.callback || function(){};
    }

    Table.prototype = {
        show: function() {
            this.createThead();
            this.createTbody(this.data);
        },
        createThead: function() {
            var colHtml = '';
            var iWidth = (100 / this.thead.length);
            var theadHtml = '';

            $.each(this.thead, function(index, el) {
                colHtml += '<col width="' + iWidth + '%" />';
                theadHtml += '<th><div class="w-table-cell">' + el + '</div></th>';
            });

            var html = `
                        <div class="w-table-wrapper ` + this.class + ` margin-top-30">
                            <div class="w-table">
                                <div class="w-table-header">
                                    <table>
                                        <colgroup>` + colHtml + `</colgroup>
                                        <thead>
                                            <tr>` + theadHtml + `</tr>
                                        </thead>
                                    </table>
                                </div>
                                <div class="w-table-body">
                                    <table>
                                        <colgroup>` + colHtml + `</colgroup>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                       `;

            this.container.append(html);
        },
        createTbody: function(data) {
            var tbody = this.container.find('.w-table-body tbody');
            var tbodyHtml = '';
            var tdHtml = '';

            tbodyHtml = '';

            if (data.length == 0) {
                tbodyHtml = '<tr><td class="text-center" colspan="' + this.thead.length + '"><div class="w-table-cell">无数据</div></td></tr>';
            } else {
                for (var i = 0; i < data.length; i++) {
                    tdHtml = '';

                    for (var j = 0; j < this.key.length; j++) {
                        tdHtml += '<td><div class="w-table-cell">' + data[i][this.key[j]] + '</div></td>';
                    }

                    if(this.tdCustom !== ''){
                        tdHtml += '<td><div class="w-table-cell">' + this.tdCustom + '</div></td>';
                    }

                    tbodyHtml += '<tr>' + tdHtml + '</tr>';
                }
            }

            tbody.html(tbodyHtml);
        }
    };

    extendes.table = function(config) {
        return new Table(config);
    };

    /**
     * loading
     * @param container   容器 (默认：body)
     * @param text        显示的文字（默认：无）
     */
    function Load(config) {
        var config = config || {};

        this.container = config.container || $("body");
        this.text = config.text || '';
    }

    Load.prototype = {
        createEle: function() {
            var html = '<div class="w-modal-item"><div class="w-mask-loading"></div><div class="w-loading"><img src="data:image/gif;base64,R0lGODlhEgASAIABAKa4zP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAwABACwAAAAAEgASAEACJwyOoYa3D6N8rVqgLp5M2+x9XcWBTTmGTqqa6qqxFInWUMzhk76TBQAh+QQJAwABACwAAAAAEgASAEACKQyOoYa3D6NUrdHqGJ44d3B9m1ZNZGZ+YXmKnsuq44qaNqSmnZ3rllIAACH5BAkDAAEALAAAAAASABIAQAIpDI6hhrcPo2zt0cRuvG5xoHxfyE2UZJWeKrLtmZ3aWqG2OaOjvfPwUgAAIfkECQMAAQAsAAAAABIAEgBAAigMjqGGtw8jbC3SxO67bnLFhQD4bZRkap4qli37qWSF1utZh7a+41ABACH5BAkDAAEALAAAAAASABIAQAIqDI6hhrcP42pNMgoUdpfanXVgJSaaZ53Yt6kj+a6lI7tcioN5m+o7KSkAACH5BAkDAAEALAAAAAASABIAQAIoDI6hhrcPI2tOKpom3vZyvVEeBgLdKHYhGjZsW63kMp/Sqn4WnrtnAQAh+QQJAwABACwAAAAAEgASAEACKAyOocvtCCN0TB5lM6Ar92hYmChxX2l6qRhqYAui8GTOm8rhlL6/ZgEAIfkECQMAAQAsAAAAABIAEgBAAigMjqHL7QgjdEyeJY2leHOdgZF4KdYJfGTynaq7XmGctuicwZy+j2oBACH5BAkDAAEALAAAAAASABIAQAInDI6hy+0II3RMHrosUFpjbmUROJFdiXmfmoafMZoodUpyLU5sO1MFACH5BAkDAAEALAAAAAASABIAQAImDI6hy+2GDozyKZrspBf7an1aFy2fuJ1Z6I2oho2yGqc0SYN1rRUAIfkECQMAAQAsAAAAABIAEgBAAiYMjqHL7W+QVLJaAOnVd+eeccliRaXZVSH4ee0Uxg+bevUJnuIRFAAh+QQJAwABACwAAAAAEgASAEACKoyBacvtnyI4EtH6QrV6X5l9UYgt2DZ1JRqqIOm1ZUszrIuOeM6x8x4oAAAh+QQJAwABACwAAAAAEgASAEACKIwNqcftryJAMrFqG55hX/wcnlN9UQeipZiGo9vCZ0hD6TbiN7hSZwEAIfkECQMAAQAsAAAAABIAEgBAAiiMH6CL7Z+WNHK2yg5WdLsNQB12VQgJjmZJiqnriZEl1y94423aqlwBACH5BAkDAAEALAAAAAASABIAQAIrjH+gi+2+IjCSvaoo1vUFPHnfxlllBp5mk4qt98KSSKvZCHZ4HtmTrgoUAAAh+QQFAwABACwAAAAAEgASAEACKIyPAcvpr5g0csJYc8P1cgtpwDceGblQmiey69W6oOfEon2f6KirUwEAIfkECQMAAQAsAAAPAAgAAwBAAgSMj6lXACH5BAkDAAEALAAAAAASABIAQAIYjI+JwK0Po5y02glUvrz7bzXiBpbLaD4FACH5BAkDAAEALAAAAAASABIAQAImjI8By8qfojQPTldzw/VymB3aCIidN6KaGl7kSnWpC6ftt00zDRUAIfkECQMAAQAsAAAAABIAEgBAAiaMjwHLyp+iNA9WcO6aVHOneWBYZeUXouJEiu1lWit7jhCX4rMEFwAh+QQJAwABACwAAAAAEgASAEACJ4yPAcvKn6I0r1pA78zWQX51XrWBSzl+Uxia7Jm+mEujW3trubg3BQAh+QQFAwABACwAAAAAEgASAEACJwyOoYa3D6N8rVqgLp5M2+x9XcWBTTmGTqqa6qqxFInWUMzhk76TBQA7"><span class="w-loading-txt">' + this.text + '</span></div></div>';

            this.container.append(html);
        },
        show: function() {
            this.createEle();
            $(".w-modal-item").stop().animate({ "opacity": 1 });
        },
        hide: function() {
            $(".w-modal-item").stop().animate({ "opacity": 0 }, function() {
                $(this).remove();
            });
        }
    };

    extendes.loading = function(config) {
        return new Load(config);
    };

    /**
     * notice
     * @param type       显示的类型('info', 'success', 'warning', 'danger')
     * @param text       显示的文字
     * @param close      是否显示关闭按钮（默认：不显示）
     * @param auto       是否自动关闭（默认：自动关闭）
     * @param callback   关闭后的回调函数
     */
    function Notice(config) {
        this.type = 'w-message-' + config.type || 'w-message-info';
        this.text = config.text || '';
        this.close = config.close || false;
        this.autoHide = config.auto === false ? false : true;
        this.callback = config.callback ? config.callback : function() {};
        this.top = '20px';
        this.defTop = '-200px';
    }

    Notice.prototype = {
        init: function() {
            this.createEle();
        },
        createEle: function() {
            var html = '<div class="w-message ' + this.type + '"><span class="w-message-icon"><i class="icon-ok"></i></span><div class="w-message-group"><p>' + this.text + '</p></div>' + (this.close ? '<span class="w-message-close"><i class="icon-remove"></i></span>' : '') + '</div>';
            $("body").append(html);
            this.show();
        },
        show: function() {
            var _this = this;
            var timer = null;

            $('.w-message').stop().animate({ "top": this.top });

            if (this.close) {
                $('.w-message-close').click(function() {
                    _this.hide();
                });
            }

            if (this.autoHide) {
                timer = setTimeout(function() {
                    _this.hide();
                    clearTimeout(timer);
                }, 2600);
            }
        },
        hide: function() {
            var _this = this;

            $('.w-message').stop().animate({ "top": this.defTop }, function() {
                $(this).remove();
                _this.callback();
            });
        }
    };

    extendes.notice = function(config) {
        return new Notice(config).init();
    };

    /**
     * modal
     * @param width        自定义modal宽度（默认：520px）
     * @param title        modal标题
     * @param html         自定义html内容
     * @param templateUrl  模板路径内容（ajax请求）
     * @param type         modal类型（info, success, warning, danger）
     * @param message      当modal为type类型，content为message
     * @param buttons      自定义按钮
     * @param cancelText   自定义取消按钮文字
     * @param okText       自定义确定按钮文字
     * @param cancel       modal关闭后，回调函数
     * @param ok           modal确定后，回调函数
     */

    function Modal(config) {
        this.width = config.width || '520px';
        this.title = config.title || '温馨提示';
        this.html = config.html || '';
        this.templateUrl = config.templateUrl || '';
        this.message = config.message || '';
        this.type = config.type || false;
        this.buttons = config.buttons || false;
        this.cancelText = config.cancelText || '取消';
        this.okText = config.okText || '确定';
        this.callbackIn = config.callbackIn || function() {};
        this.cancel = config.cancel || function() {};
        this.ok = config.ok || function() {};
    }

    Modal.prototype = {
        createEle: function() {
            var bodyHtml = '';
            var buttonHtml = '';

            if (this.type) {
                var type = '';

                switch (this.type) {
                    case 'info':
                        type = '<i class="icon-info-sign"></i>';
                        break;
                    case 'success':
                        type = '<i class="icon-ok-sign"></i>';
                        break;
                    case 'warning':
                        type = '<i class="icon-warning-sign"></i>';
                        break;
                    case 'danger':
                        type = '<i class="icon-remove-sign"></i>';
                        break;
                }

                bodyHtml = `
                            <div class="w-modal-status text-primary">` + type + `</div>
                            <div class="w-modal-message">
                                <p>` + this.message + `</p>
                            </div>
                           `;

            } else if (this.html) {
                bodyHtml = this.html;
            } else if (this.templateUrl) {
                var _this = this;

                $.ajax({
                    async: false,
                    type: 'POST',
                    url: _this.templateUrl,
                    dataType: 'html',
                    success: function(data) {
                        bodyHtml = data;
                    }
                });
            }

            if (this.buttons) {
                buttonHtml = this.buttons;
            } else {
                buttonHtml = `
                            <button type="button" class="w-btn w-btn-text w-btn-radius w-btn-large" data-type="modal-cancel"><span>` + this.cancelText + `</span></button>
                            <button type="button" class="w-btn w-btn-primary w-btn-radius w-btn-large margin-left-10" data-type="modal-ok"><span>` + this.okText + `</span></button>
                         `;
            }

            var html = `
                        <div class="w-modal-item">
                            <div class="w-modal-mask"></div>
                            <div class="w-modal-wrap">
                                <div class="w-modal w-modal-confirm">
                                    <div class="w-modal-content">
                                        <a href="javascript:;" class="w-modal-close a-gray-light" data-type="modal-cancel">
                                            <i class="icon-remove"></i>
                                        </a>
                                        <div class="w-modal-header">
                                            <div class="w-modal-header-inner">` + this.title + `</div>
                                        </div>
                                        <div class="w-modal-body">` + bodyHtml + `</div>
                                        <div class="w-modal-footer">` + buttonHtml + `</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       `;

            $("body").append(html);
            $('.w-modal').css('width', this.width);
        },
        show: function() {
            this.createEle();
            this.callbackIn();
            this.cancelFn();
            this.okFn();
            $(".w-modal-item").stop().animate({ "opacity": 1 });
        },
        hide: function() {
            $(".w-modal-item").stop().animate({ "opacity": 0 }, function() {
                $(this).remove();
            });
        },
        cancelFn: function() {
            var _this = this;

            $('[data-type="modal-cancel"]').click(function() {
                _this.hide();
                _this.cancel();
            });
        },
        okFn: function() {
            var _this = this;

            $('[data-type="modal-ok"]').click(function() {
                _this.hide();
                _this.ok();
            });
        }
    };

    extendes.modal = function(config) {
        return new Modal(config);
    };

    /**
     * sidebarNav
     * @param item            一级菜单item
     * @param sunItem         二级菜单item
     * @param itemActive      一级菜单激活样式
     * @param sunActive       二级菜单激活样式
     * @param el              容器
     * @param url             data请求url
     * @param tempUrl         模板请求url
     * @param click           二级菜单点击回调函数，传入当前元素
     * @param complete        加载完成钩子
     */
    function VerticalMenu(config) {
        this.item = config.item;
        this.sunItem = config.sunItem;
        this.itemActive = config.itemActive || 'open';
        this.sunActive = config.sunActive || 'active';
        this.click = config.click || function() {};
        this.complete = config.complete || function() {};
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

            aChildren.click(function() {
                var _this = $(this);

                $.each(aChildren, function(index, el) {
                    if ($(el).hasClass(iActive)) {
                        $(el).removeClass(iActive);
                        return false;
                    }
                });

                _this.addClass(iActive);
                _this.click(_this);
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
                                    _this.complete();
                                }
                            }
                        });
                    }
                }
            });
        }
    };
    extendes.sidebarMenu = function(config) {
        return new VerticalMenu(config).init();
    };

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
    };
    extendes.wheel = function(element, upFn, downFn) {
        return new Wheel({
            el: element,
            up: upFn,
            down: downFn
        }).init();
    };
    extendes.wheelUp = function(element, fn) {
        return new Wheel({
            el: element,
            up: fn
        }).init();
    };
    extendes.wheelDown = function(element, fn) {
        return new Wheel({
            el: element,
            down: fn
        }).init();
    };

    /**
     * 拖拽
     * @param el          元素
     * @param container   限制范围(选择容器的元素)
     * @param direction   限制方向 x y
     * @param limit       限制范围(document) true false(default)
     * @param down        按下钩子
     * @param move        移动钩子:{scaleX,scaleY} 相对于父级拖拽比例
     * @param up          抬起钩子
     */

    function Drag(config) {
        this.el = config.el;
        this.container = config.container;
        this.direction = config.direction;
        this.limit = config.limit || false;
        this.downFn = config.down || function() {};
        this.moveFn = config.move || function() {};
        this.upFn = config.up || function() {};
    }

    Drag.prototype = {
        init: function() {
            this.drag(this.el, this.container, this.el.get(0));
        },
        drag: function(el, wrap, obj) {
            var _this = this;

            el.off('mousedown').on('mousedown', function(ev) {
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

                _this.downFn();
                _this.move(el, wrap, obj, disX, disY);
                _this.up(obj);

                return false;
            });
        },
        move: function(el, wrap, obj, disX, disY) {
            var _this = this;

            $(document).off('mousemove').on('mousemove', function(ev) {
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
                _this.moveFn({
                    scaleY: T / limitH,
                    scaleX: L / limitW
                });
            });
        },
        up: function(obj) {
            var _this = this;

            $(document).off('mouseup').on('mouseup', function() {
                $(document).off('mousemove');
                $(document).off('mouseup');
                _this.upFn();
                if (obj.releaseCapture) {
                    obj.releaseCapture();
                }
            });
        }
    };
    extendes.drag = function(config) {
        return new Drag(config).init();
    };

    //TODO
    /**
     * 自定义滚动条
     * @param  el          元素
     */
    function CustomScroll(config) {
        this.el = config.el;
    }

    CustomScroll.prototype = {
        init: function() {
            this.createEl();
            this.handlerDrag();
        },
        createEl: function() {
            this.el.append('<div class="custom-scroll-drag"></div>');
        },
        handlerDrag: function() {
            var _this = this;
            var dragEl = this.el.children().eq(1);
            var scrollEl = this.el.children().eq(0);
            var disH = scrollEl.height() - this.el.height();

            dragEl.css('height', parseInt(disH / this.el.height() * 100) + "%");

            $.drag({
                el: dragEl,
                container: this.el,
                direction: "y",
                down: function() {
                    disH = scrollEl.height() - _this.el.height();
                },
                move: function(json) {
                    scrollEl.css('top', disH * json.scaleY * -1);
                }
            });
        }
    };

    extendes.customScroll = function(config) {
        return new CustomScroll(config).init();
    };

    $.extend(extendes);

})(window);