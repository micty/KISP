
/**
*
*/
define('Dialog/Renderer', function (require, module, exports) {

    var $ = require('$');
    var Style = require('Style');
    

    function getStyle(item) {

        if (!item) {
            return '';
        }

        var style = Style.filter(item, [
            'border-bottom',
            'color',
            'font-size',
            'font-weight',
            'width',
        ]);

        style = Style.stringify(style);
        return style;
    }

    


    function render(meta, dialog) {

        var buttons = meta.buttons || [];
        var emitter = meta.emitter;
        var id = meta.id;
        var articleId = meta.articleId;
        var footerId = meta.footerId;
        var style = meta.style;
        var samples = meta.samples;



        var title = meta.title;

        //标准化成一个 object
        if (title && typeof title != 'object') {
            title = { 'text': title || '', };
        }
 

        var html = $.String.format(samples['div'], {
            'id': id,
            'article-id': articleId,
            'content-id': meta.contentId,
            'cssClass': meta.cssClass,
            'style': Style.stringify(style),
            'text': meta.text,
            'text-height': parseInt(style.height) - 44 * 2 - 2,
            'no-header': title ? '' : 'no-header',              //针对无标题时
            'no-footer': buttons.length > 0 ? '' : 'no-footer', //针对无按钮时

            'header': (function (title) {
                if (!title) {
                    return '';
                }

                return $.String.format(samples['header'], {
                    'style': getStyle(title),
                    'title': title.text,
                });

            })(title),

            'footer': (function (buttons) {
                var count = buttons.length;
                if (!count) {
                    return '';
                }

                return $.String.format(samples['footer'], {
                    'id': footerId,
                    'count': count,
                    'buttons': $.Array.keep(buttons, function (item, index) {

                        if (typeof item == 'string') {
                            buttons[index] = item = {
                                'text': item,
                            };
                        }

                        return $.String.format(samples['button'], {
                            'index': index,
                            'text': item.text,
                            'style': getStyle(item),
                        });

                    }).join(''),
                });

            })(buttons),
        });


        $(document.body).prepend(html);



        var eventName = meta.eventName;

        var article = $('#' + articleId);

        if (eventName == 'touch') {
            article.touch(function () {
                emitter.fire('touch-main');
            });
        }
        else {
            article.on(eventName, function () {
                emitter.fire(eventName + '-main');
            });
        }

        //指定了可滚动
        if (meta.scrollable) {
            var Scroller = require('Scroller');
            var scroller = new Scroller(article.get(0), meta.scrollerConfig);
            meta.scroller = scroller;
        }



        //底部按钮组
        var footer = $('#' + footerId);
        if (buttons.length > 0) { //有按钮时才绑定

            if (eventName == 'touch') { //移动端的，特殊处理
                footer.touch('[data-index]', fn, 'pressed');
            }
            else { // PC 端
                footer.on(eventName, '[data-index]', fn);

                footer.on('mousedown', '[data-index]', function (event) {
                    var button = this;
                    $(button).addClass('pressed');
                });


                footer.on('mouseup mouseout', '[data-index]', function (event) {

                    var button = this;
                    $(button).removeClass('pressed');
                });
            }

            function fn(event) {
                var button = this;
                var index = +button.getAttribute('data-index');
                var item = buttons[index];
                var name = item.name || String(index);


                //这两个已废弃，建议使用 #2
                emitter.fire('click', 'button', name, [item, index]);
                emitter.fire('click', 'button', [item, index]);

                //#2 建议使用
                emitter.fire('button', name, [item, index]);
                emitter.fire('button', [item, index]);

                // item.autoClosed 优先级高于 meta.autoClosed
                var autoClosed = item.autoClosed;
                if (autoClosed === undefined) {
                    autoClosed = meta.autoClosed;
                }

                if (autoClosed) {
                    dialog.hide();
                }

            }
        }
        

        var div = document.getElementById(id);

        //暴露一个 jQuery 对象给外面使用。 但为了安全起见，内部不使用这个对象。
        dialog.$ = $(div);

        return div;

    }


    return {

        render: render,
    };

});

