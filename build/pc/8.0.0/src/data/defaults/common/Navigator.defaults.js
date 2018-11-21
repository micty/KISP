/**
* Navigator 模块的默认配置
* @name Navigator.defaults
*/
define('Navigator.defaults', /**@lends Navigator.defaults*/ {
    
    /**
    * 实例 id。
    * 须确保每个实例 id 唯一。
    */
    id: '',

    /**
    * 是否启用。
    */
    enabled: true,

    /**
    * 对状态要启用的存储类型。
    * 可取的值有: false、`session`、`local`。
    * 如果为 false，则禁用存储，页面刷新后将重新开始。
    */
    storage: 'session',

    /**
    * 是否允许在当前激活的视图后面，再添加一个跟当前激活的视图同名的视图进来。
    */
    repeated: false,

});

