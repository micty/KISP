
/**
*
*/
define('Dialog/Template', function (require, module, exports) {
    var Template = require('Template');
    var $Array = require('Array');
    var $String = require('String');
    var Style = require('Style');


    var Sample = module.require('Sample');

    var tpl = Template.create(Sample);



    tpl.process({
        '': function (data) {
            var header = this.fill('header', data);
            var content = this.fill('content', data);
            var footer = this.fill('footer', data);

            var style = Style.stringify(data.style);

            return {
                'id': data.id,
                'cssClass': data.cssClass || '',
                'style': style,
                'header': header,
                'content': content,
                'footer': footer,
            };
        },

        'header': function (data) {
            var title = data.title;

            if (!title) {
                return '';
            }


            return {
                'headerId': data.headerId,
                'title': title,
            };
        },

        'content': function (data) {

            return {
                'contentId': data.contentId,
                'content': data.content,
                'noHeader': data.title ? '' : 'NoHeader',              //针对无标题时。
                'noFooter': data.buttons.length > 0 ? '' : 'NoFooter', //针对无按钮时。
            };
        },

        'footer': {
            '': function (data) {
                var buttons = data.buttons;
                var count = buttons.length;

                if (!count) {
                    return '';
                }

                buttons = this.fill('button', buttons);

                return {
                    'footerId': data.footerId,
                    'count': count,
                    'buttons': buttons,
                };

            },

            'button': function (item, index) {

                var style = Style.stringify(item.style);

                return {
                    'index': index,
                    'text': item.text,
                    'cssClass': item.cssClass || '',
                    'style': style,

                };
            },
        },

    });


    return tpl;


});

