
module.exports = {

    copyTo: [
        //'E:/Kingdee/vGuide/htdocs/f/kisp',
        //'E:/Kingdee/vStore/htdocs/f/kisp',

        //'E:/Kingdee/house/mobile/htdocs/f/kisp',

        'I:/Studio/house/mobile/htdocs/f/kisp',

    ],


    //需要独立存在的 html 文件。
    //即不能转换成 js 代码且合并到 KISP 里的文件。
    htmlFiles: [
        {
            dir: 'iframe',
            files: [
                'CityPicker.html',
            ],
        },
    ],

    srcFiles: [
        'partial/default/begin.js',

        {
            dir: 'core',
            files: [
                'Module.js',
                '$.js',
                'MiniQuery.js',
                'IScroll.js',
                'iSlider.js',
                'KISP.js',
            ]
        },
        //{
        //    dir: 'compatible',
        //    files: [
        //        {
        //            dir: 'jquery',
        //            files: [
        //                'animate.js',
        //            ],
        //        },
        //    ],
        //},
        {
            dir: 'crypto',
            files: [
                'MD5.js',
            ]
        },
        {
            dir: 'excore',
            files: [
                'Config.js',
                'Defaults.js',
                'Config/Url.js',
                //'DOM.js',
                'Edition.js',
                'File.js',
                'Fn.js',
                'JSON.js',
                'LocalStorage.js',
                'Mapper.js',
                'Module.js',
                'RandomId.js',
                'SessionStorage.js',
                'Style.js',
                'Url.js',
            ]
        },
        {
            dir: 'api',
            files: [
                'API.js',
                'API/Ajax.js',

                'CloudAPI.js',

                'SSH.js',
                {
                    dir: 'SSH',
                    files: [
                        'Ajax.js',
                        'Server.js',
                        {
                            dir: 'Server',
                            files: [
                                'Config.js'
                            ],
                        },
                    ]
                },
                'SSH.API.js',
                'SSH.API/Ajax.js',
                'Proxy.js',
                {
                    dir: 'Proxy',
                    files: [
                        'Url.js',
                    ],
                },
            ]
        },
        {
            dir: 'third-party',
            files: [
                {
                    dir: 'cloud-home',
                    files: [
                        {
                            dir: 'CloudHome',
                            files: [
                                'Native.js'
                            ],
                        },
                        'CloudHome.API.js',
                        'CloudHome.js',
                        'CloudHome.Title.js',
                        {
                            dir: 'ImageReader',
                            files: [
                                'Renderer.js'
                            ],
                        },
                        'ImageReader.js',
                    ],
                },
                //{
                //    dir: 'seajs',
                //    files: [
                //        'Seajs.js',
                //    ],
                //},
                {
                    dir: 'wechat',
                    files: [
                        {
                            dir: 'WeChat',
                            files: [
                                'JsApiList.js',
                                'Lib.js',
                                'Signature.js',
                            ],
                        },
                        'WeChat.js',
                    ],
                },
            ],
        },
        {
            dir: 'ui',
            files: [
                'App.js',
                {
                    dir: 'App',
                    files: [
                        'Nav.js',
                        'Transition.js',
                    ],
                },

                'CityPicker.js',

                {
                    dir: 'dialog',
                    files: [
                        'Alert.js',
                        {
                            dir: 'Alert',
                            files: [
                                'Dialog.js',
                                'Sample.html',
                            ],
                        },
                        'Confirm.js',
                        'Dialog.js',
                        {
                            dir: 'Dialog',
                            files: [
                                {
                                    dir: 'Sample',
                                    files: [
                                        'iOS.html',
                                    ],
                                },
                                'Renderer.js',
                                'Sample.js',
                                'Style.js',
                            ],
                        },
                        'ImageSlider.js',
                        'ImageViewer.js',
                        'Loading.js',
                        {
                            dir: 'Loading',
                            files: [
                                {
                                    dir: 'Sample',
                                    files: [
                                        'iOS.html',
                                    ],
                                },
                                'Presettings.js',
                                'Sample.js',
                                'Style.js',
                            ],
                        },
                        'Mask.js',
                        {
                            dir: 'Mask',
                            files: [
                                'Sample.html',
                                'Style.js',
                            ],
                        },
                        'Toast.js',
                        {
                            dir: 'Toast',
                            files: [
                                {
                                    dir: 'Sample',
                                    files: [
                                        'font-awesome.html',
                                    ],
                                },
                                'Renderer.js',
                                'Sample.js',
                                'Style.js',
                            ],
                        },
                    ],
                },

                'Navigator.js',
                'NoData.js',
                {
                    dir: 'NoData',
                    files: [
                        'Renderer.js',
                        'Sample.html',
                        'Style.js',
                    ],
                },
                'NumberPad.js',
                {
                    dir: 'NumberPad',
                    files: [
                        'Renderer.js',
                        'Sample.html',
                        'Style.js',
                    ],
                },
                'Panel.js',
                'Scroller/pull.js',
                'Scroller.js',
                'Slider.js',
                'Tabs.js',
                {
                    dir: 'Tabs',
                    files: [
                        'Helper.js',
                    ],
                },
                'Template.js',
                {
                    dir: 'Template',
                    files: [
                        'Multiple.js',
                        'Simple.js',
                        'Static.js',
                    ],
                },

                'View.js',
            ]
        },
        {
            dir: 'jquery-plugin',
            files: [
                'touch.js',
            ]
        },
        {
            dir: 'defaults',
            files: [
                {
                    dir: 'api',
                    files: [
                        'API.js',
                        'CloudAPI.js',
                        'Proxy.js',
                        'SSH.API.js',
                        'SSH.js',
                        'SSH/Server.js',
                        'SSH/Server/Config.js',
                    ],
                },
                {
                    dir: 'excore',
                    files: [
                        //'DOM.js',
                        'LocalStorage.js',
                        'Module.js',
                        'SessionStorage.js',
                        'Url.js',
                    ],
                },
                {
                    dir: 'third-party',
                    files: [
                        'CloudHome.API.js',
                        'ImageReader.js',
                        'WeChat.js',
                        'WeChat/Signature.js',
                    ],
                },
                {
                    dir: 'ui',
                    files: [
                        'Alert.js',
                        'App.js',
                        'CityPicker.js',
                        'Confirm.js',
                        'Dialog.js',
                        'ImageSlider.js',
                        'ImageViewer.js',
                        'Loading.js',
                        'Mask.js',
                        'NoData.js',
                        'NumberPad.js',
                        'Panel.js',
                        'Scroller.js',
                        'Tabs.js',
                        'Template.js',
                        'Toast.js',
                        'View.js',
                    ],
                },
            ],
        },
        {
            dir: 'partial/default',
            files: [
                'expose.js',
                'end.js',
            ],
        },
    ],

};