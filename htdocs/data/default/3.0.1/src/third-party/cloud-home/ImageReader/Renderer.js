

define('ImageReader/Renderer', function (require, module, exports) {

    var $ = require('$');




    //针对 PC 浏览端的
    function renderPC(meta) {

        var emitter = meta.emitter;
        var loading = meta.loading;

        if (loading === true) {
            loading = KISP.create('Loading', {
                text: '读取中...',
            });
        }
        else if (typeof loading == 'string') {
            loading = KISP.create('Loading', {
                text: loading,
            });
        }


        $(meta.input).on('change', function (event) {

            var input = this; //这样是安全的，因为外面传进来的可能是一个 jQuery 选择器。
            var img = input.files[0];

            if (!img) { //第一次选择了，但第二次未选择时，为空
                emitter.fire('cancel');
                return;
            }


            var type = img.type;
            if (type.indexOf('image/') != 0) {
                emitter.fire('fail', [201, '所选择的文件类型不是图片', { img: img }]);
                return;
            }


            var reader = new FileReader();

            reader.onload = function (e) {

                loading && loading.hide();

                var data = e.target.result;
                emitter.fire('success', [data]);
            };

            loading && loading.show();

            reader.readAsDataURL(img);

        });
    }






    //针对云之家内嵌浏览器端的
    function renderCH(meta) {

        var emitter = meta.emitter;

        $(meta.input).on('click', function (event) {

            event.preventDefault();

            var API = require('CloudHome.API');
            var api = new API('selectPic');

            api.on('success', function (data, json) {

                var ext;
                var base64;

                try {
                    ext = data.fileExt;
                    base64 = data.fileData.replace(/[\r\n]/g, '');
                }
                catch (ex) {
                    var msg = '无法读取图片，云之家接口有问题: ' + ex.message;
                    emitter.fire('fail', [500, msg, json]);
                    return;
                }


                var image = 'data:image/' + ext + ';base64,' + base64;
                emitter.fire('success', [image]);

            });


            api.on('fail', function (code, msg, json) {

                if (code == 1) { //取消选择照片
                    emitter.fire('cancel');
                    return;
                }

                emitter.fire('fail', [code, msg, json]);
            });


            api.invoke();

        });
      
    }


    //是否为云之家环境，只需要判断一次
    var isCloudHome;


    return {

        render: function (meta) {

            if (isCloudHome === undefined) { //未判断
                var CloudHome = require('CloudHome');
                isCloudHome = CloudHome.check();
            }

            if (isCloudHome) {
                renderCH(meta);
            }
            else {
                renderPC(meta);
            }
        },
    };

});
