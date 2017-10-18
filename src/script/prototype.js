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
    extends.sidebarMenu = function(config){
        return new VerticalMenu(config).init();
    }

    $.extend(extends);
})(window);