KERP.use('Dialog', function (Dialog) {

    var dialog = new Dialog({
        id: 'test-dialog',
        title: '首页',
        url: './html/home/index.html', // ./ 表示相对于网站根目录
        width: 900,
        height: 550,

        //需要传递的数据
        data: {
            a: 1111,
            b: 2222,
            c: {
                name: 'micty',
                value: 'test',
            },
        },
    });

    //绑定各种事件
    dialog.on({
        show: function () {
            console.log('on show');
        },

        iframeload: function () {
            console.log('on iframeload');
        },

        close: function () {
            console.log('on close');
        },

        remove: function () {
            console.log('on remove');
        },
    });

    dialog.showModal();




    //// 从嵌入的目标 iframe 页面中获取 dialog 实例:
    //var dialog = Iframe.getDialog();
    //if (dialog) {
    //    var data = dialog.getData(); //获取对应的数据
    //    console.dir(data);
    //}

    //dialog.setData({ dataNew: 'new-test' }); //设置数据
    //dialog.remove(); //关闭对话框


});