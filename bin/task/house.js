
module.exports = {

    copyTo: [
        //针对 pc 端
        'E:/Kingdee/house/admin/htdocs/f/kisp',
        'E:/Kingdee/house/demo/htdocs/f/kisp',
        'E:/Kingdee/house/permit/htdocs/f/kisp',
    ],


    srcFiles: [
        'partial/pc/begin.js', //注意这里的是 pc

        {
            dir: 'core',
            files: [
                'Module.js',
                '$.js',
                'MiniQuery.js',
                'KISP.js',
            ]
        },
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
                'Panel.js',
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
        {   //通用配置
            dir: 'defaults',
            files: [
                {
                    dir: 'api',
                    files: [
                        'API.js',
                        'Proxy.js',
                    ],
                },
                {
                    dir: 'excore',
                    files: [
                        'LocalStorage.js',
                        'Module.js',
                        'SessionStorage.js',
                        'Url.js',
                    ],
                },
                {
                    dir: 'ui',
                    files: [
                        'Alert.js',
                        'App.js',
                        'Confirm.js',
                        'Dialog.js',
                        'Loading.js',
                        'Mask.js',
                        'Panel.js',
                        'Tabs.js',
                        'Template.js',
                        'Toast.js',
                        'View.js',
                    ],
                },
            ],
        },
        {
            dir: 'partial/pc',   //注意这里的是 pc
            files: [
                {   //差异化的配置
                    dir: 'config',
                    files: [
                        {
                            dir: 'ui',
                            files: [
                                'Alert.js',
                                'Confirm.js',
                                'Dialog.js',
                                'Loading.js',
                                'Mask.js',
                                'Tabs.js',
                                'Toast.js',
                            ],
                        },
                    ],
                },
                'expose.js',
                'end.js',
            ],
        },
    ],

};