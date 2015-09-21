///create by justinlee
/* 2014.7.8修改注册流程，添加云之家下载。
* 2014.7.16 加入lazyload，优化代码
*
*/
var reg_eid;

(function ($) {

    $.alerts = {

        // These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

        verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
        horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
        repositionOnResize: true,           // re-centers the dialog on window resize
        overlayOpacity: .01,                // transparency level of overlay
        overlayColor: '#FFF',               // base color of overlay
        draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
        okButton: '&nbsp;确定&nbsp;',         // text for the OK button
        cancelButton: '&nbsp;取消&nbsp;', // text for the Cancel button
        dialogClass: null,                  // if specified, this class will be applied to all dialogs

        // Public methods

        alert: function (message, title, callback) {
            if (title == null) title = 'Alert';
            $.alerts._show(title, message, null, 'alert', function (result) {
                if (callback) callback(result);
            });
        },

        confirm: function (message, title, callback) {
            if (title == null) title = 'Confirm';
            $.alerts._show(title, message, null, 'confirm', function (result) {
                if (callback) callback(result);
            });
        },

        prompt: function (message, value, title, callback) {
            if (title == null) title = 'Prompt';
            $.alerts._show(title, message, value, 'prompt', function (result) {
                if (callback) callback(result);
            });
        },

        // Private methods

        _show: function (title, msg, value, type, callback) {

            $.alerts._hide();
            $.alerts._overlay('show');

            $("BODY").append(
              '<div id="popup_main">' +
			  '<div id="popup_container" style="width: 80%;z-index: 1041;position:absolute;top:50%;left:10%;z-index: 1041;border-radius: 5px;border: 1px solid #dfdfdf;box-shadow: 1px 3px 5px rgba(35, 24, 21, 0.75);background: #fff;">' +
			    //'<h1 id="popup_title" style="font-size: 14px;font-weight: bold;text-align: center;line-height: 1.75em;color: #666;background: #CCC url(title.gif) top repeat-x;border: solid 1px #FFF;border-bottom: solid 1px #999;cursor: default;padding: 0em;margin: 0em;"></h1>' +                  
                '<div id="popup_content" style="">' +
			      '<div id="popup_message" style="padding: 10px;margin: 0 auto;text-align: left;font-size: 1.5em;text-align:center;"></div>' +
				'</div></div>' +
                '<div style="background-color: #393e47;width: 100%;height: 100%;opacity: 0.6;filter: alpha(opacity=60);position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 1040;"></div>' +
			  '</div>');

            if ($.alerts.dialogClass) $("#popup_container").addClass($.alerts.dialogClass);

            // IE6 Fix
            //var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
            var pos = ('undefined' == typeof (document.body.style.maxHeight)) ? 'absolute' : 'fixed';

            $("#popup_container").css({
                position: pos,
                zIndex: 99999,
                padding: 0,
                margin: 0
            });


            console.log(title, msg, value, type);

            $("#popup_title").text(title);
            $("#popup_content").addClass(type);
            $("#popup_message").text(msg);
            $("#popup_message").html($("#popup_message").text().replace(/\n/g, '<br />'));

            $("#popup_container").css({
                minWidth: $("#popup_container").outerWidth(),
                maxWidth: $("#popup_container").outerWidth()
            });
            console.log( $("#popup_message").html());
            $.alerts._reposition();
            $.alerts._maintainPosition(true);

            switch (type) {
                case 'alert':
                    $("#popup_message").after('<div style="border-top: 1px solid #dfdfdf;height: 3em;line-height: 3;text-align: center;font-size: 1.5em;color: #0062d2;" id="popup_ok" ><span>' + $.alerts.okButton + '</span></div>');
                    $("#popup_ok").click(function () {
                        $.alerts._hide();
                        callback(true);
                    });
                    $("#popup_ok").focus().keypress(function (e) {
                        if (e.keyCode == 13 || e.keyCode == 27) $("#popup_ok").trigger('click');
                    });
                    break;
                case 'confirm':
                    $("#popup_message").after('<div id="popup_panel" style="text-align: center;margin-top:1em;"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
                    $("#popup_ok").click(function () {
                        $.alerts._hide();
                        if (callback) callback(true);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        if (callback) callback(false);
                    });
                    $("#popup_ok").focus();
                    $("#popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $("#popup_ok").trigger('click');
                        if (e.keyCode == 27) $("#popup_cancel").trigger('click');
                    });
                    break;
                case 'prompt':
                    $("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" style="margin: .5em 0em;" />').after('<div id="popup_panel" style="text-align: center;margin-top:1em;"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
                    $("#popup_prompt").width($("#popup_message").width());
                    $("#popup_ok").click(function () {
                        var val = $("#popup_prompt").val();
                        $.alerts._hide();
                        if (callback) callback(val);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        if (callback) callback(null);
                    });
                    $("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $("#popup_ok").trigger('click');
                        if (e.keyCode == 27) $("#popup_cancel").trigger('click');
                    });
                    if (value) $("#popup_prompt").val(value);
                    $("#popup_prompt").focus().select();
                    break;
            }



            // Make draggable
            if ($.alerts.draggable) {
                try {
                    $("#popup_container").draggable({ handle: $("#popup_title") });
                    $("#popup_title").css({ cursor: 'move' });
                } catch (e) { /* requires jQuery UI draggables */ }
            }
        },

        _hide: function () {
            $("#popup_main").remove();
            $.alerts._overlay('hide');
            $.alerts._maintainPosition(false);
        },

        _overlay: function (status) {
            switch (status) {
                case 'show':
                    $.alerts._overlay('hide');
                    $("BODY").append('<div id="popup_overlay"></div>');
                    $("#popup_overlay").css({
                        position: 'absolute',
                        zIndex: 99998,
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: $(document).height(),
                        background: $.alerts.overlayColor,
                        opacity: $.alerts.overlayOpacity
                    });
                    break;
                case 'hide':
                    $("#popup_overlay").remove();
                    break;
            }
        },

        _reposition: function () {
            var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
            var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
            if (top < 0) top = 0;
            if (left < 0) left = 0;

            // IE6 fix
            if ('undefined' == typeof (document.body.style.maxHeight)) top = top + $(window).scrollTop();

            $("#popup_container").css({
                top: top + 'px',
                left: left + 'px'
            });
            $("#popup_overlay").height($(document).height());
        },

        _maintainPosition: function (status) {
            if ($.alerts.repositionOnResize) {
                switch (status) {
                    case true:
                        $(window).bind('resize', function () {
                            $.alerts._reposition();
                        });
                        break;
                    case false:
                        $(window).unbind('resize');
                        break;
                }
            }
        }

    }

    // Shortuct functions
    jAlert = function (message, title, callback) {
        try {
            if (showOkAlert) {
                showOkAlert(message, callback);
            }
            else {
                $.alerts.alert(message, title, callback);
            }
        }
        catch (e) {
            $.alerts.alert(message, title, callback);
        }
    }

    jConfirm = function (message, title, callback) {
        $.alerts.confirm(message, title, callback);
    };

    jPrompt = function (message, value, title, callback) {
        $.alerts.prompt(message, value, title, callback);
    };

})(jQuery);



function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


(function (PageNs, MiniQuery) {


    MiniQuery.use('$');


    var QueryStrings = $.Url.getQueryString(window.location.href);

    var Ajax = (function () {

        function getJSON(url, data, fnSuccess, fnFail, fnError) {

            if (typeof data == 'function') { //此时为 getJSON(url, fnSuccess, fnFail, fnError)
                fnError = fnFail;
                fnFail = fnSuccess;
                fnSuccess = data;
            }
            else {
                url = $.Url.setQueryString(url, data);
            }


            var xhr = new window.XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {

                        var data = xhr.responseText;
                        //var json = $.Object.parseJson(data);

                        var json1 = (new Function('return ' + data))();

                        if (json1.data==null) {
                            if (json1.success) {
                                fnSuccess && fnSuccess(json1.data || null, json1);
                            }
                            else {
                                fnFail && fnFail(json1.error || json1.errMsg, json1);
                            }
                        }
                        else {

                            try{
                                var json = (new Function('return ' + json1.data))();

                                if (json.success) {
                                    fnSuccess && fnSuccess(json.data || null, json);
                                }
                                else {
                                    fnFail && fnFail(json.error || json.errMsg, json);
                                }
                            }
                            catch(e){
                                fnSuccess && fnSuccess(data || null, json1);
                            }
                        }
                    }
                    else {
                        fnError && fnError();
                    }
                }
            };

            xhr.send(null);
        }

        function loadJs(url, data, fnSuccess, fnFail, fnError) {
            if (typeof data == 'function') { //此时为 loadJs(url, fnSuccess, fnFail, fnError)
                fnError = fnFail;
                fnFail = fnSuccess;
                fnSuccess = data;
            }
            else {
                url = $.Url.setQueryString(url, data);
            }

            $.Script.load({
                url: url,
                document: document,
                charset: 'utf-8',
                onload: function () {
                    var json = window['__EID__'];
                    if (json.success) {
                        fnSuccess && fnSuccess(json.data || null, json);
                    }
                    else {
                        fnFail && fnFail(json.errMsg, json);
                    }
                }
            });
        }

        return {
            getJSON: getJSON,
            loadJs: loadJs
        };

    })();



    var LoginPage = (function () {

        var g_EID = "24446";//20449//测试数据//23074//21962
        var g_OpenID = "U0001-U0001-U0001-U0002";//测试数据
        var wx_eid;
        var wx_openid;

        function LoginDone(eid) {
            var token = GenToken.token($("#eidtxt").val(), GetQueryString('openid') || "U0001-U0001-U0001-U0002");
            sessionStorage.setItem("kis_eid", eid || $("#eidtxt").val());
            sessionStorage.setItem("kis_fromtag", GetQueryString('fromtag'));
            sessionStorage.setItem("kis_openid", GetQueryString('openid') || "U0001-U0001-U0001-U0002");
            window.location.assign("http://mob.cmcloud.cn/kisplus/apps/index.html?fromlogin=wx&token=" + token + "&eid=" + eid + "&fromtag=" + GetQueryString('fromtag') + "&openid=" + GetQueryString('openid') || "U0001-U0001-U0001-U0002");
        }

        function render() {
            if (GetQueryString('openid') == null || GetQueryString('openid') == "undefined") {
                $("#kdloading").hide();
                $("#page0").show();
                return;
            }


            //var url = 'http://172.19.74.31/webserver2/openapi/GetWebAppList';
            var url = 'http://mob.cmcloud.cn/webapptest/openapi/GetEIDByWX_Openid';

            try {
                wx_eid = GetQueryString('eid');

            } catch (e) {

            }
            try {
                wx_openid = GetQueryString('openid');

            } catch (e) {

            }

            if (wx_openid == null) {
                wx_openid = g_OpenID; //测试用
            }
            if (wx_eid == null) {
                wx_eid = g_EID;//测试用
            }



            Ajax.loadJs(url, { wx_openid: wx_openid }, function (eid, json) {
                if (eid != null) {
                    LoginDone(eid);
                } else {
                    $("#kdloading").hide();
                    $("#page0").show();
                }

            }, function (errMsg, json) {
                $("#kdloading").hide();
                $("#page0").show();
            }, function () {
                $("#kdloading").hide();
                $("#page0").show();
            });
        }


        return {
            render: render
        };


    })();


    var Lib = (function (KISP, Lib) {

        Lib.Scroller = KISP.Scroller;


        var API = Lib.API = (function () {

            var prefix = 'kis.APP999999.acctplatform.AcctInfoController.';
            var retry = 0;
            var eid = $("#eidtxt").val() || '19953';
            var openid = $.Url.Current.getQueryString('openid', true) || 'U0001-U0001-U0001-U0001';


            function get(name, data, fnSuccess, fnFail, fnError) {

                if (typeof data == 'function') { //此时为 get(name, fnSuccess, fnFail, fnError)
                    fnError = fnFail;
                    fnFail = fnSuccess;
                    fnSuccess = data;
                    data = {};
                }

                KISP.API.post({
                    name: prefix + name,
                    eid: $("#eidtxt").val() || '19953',
                    openid: openid,

                    data: {
                        Result: '',
                        ErrMsg: '',
                        AccountDB: '',
                        TotalPage: '',
                        CurrentPage: 1,
                        ItemsOfPage: 9999,
                        Data: data
                    }

                }, function (data, json) {

                    if (data['Result'] == "201") {
                        if (retry == 0) {
                            prefix = 'kis.APP002772.acctplatform.AcctInfoController.';
                            retry++;
                            get(name, data, fnSuccess, fnFail, fnError);
                        }
                        else {
                            fnSuccess && fnSuccess(data['Data'], data, json);
                        }
                    }
                    else {
                        fnSuccess && fnSuccess(data['Data'], data, json);
                    }

                }, function (code, msg, json) {
                    if (retry == 0) {
                        prefix = 'kis.APP002772.acctplatform.AcctInfoController.';
                        retry++;
                        get(name, data, fnSuccess, fnFail, fnError);
                    }
                    else { 
                        fnFail && fnFail(code, msg, json);
                    }

                }, function () {
                    if (retry == 0) {
                        prefix = 'kis.APP002772.acctplatform.AcctInfoController.';
                        retry++;
                        get(name, data, fnSuccess, fnFail, fnError);
                    }
                    else {
                        fnError && fnError();
                    }
                });

            }

            return {
                get: get
            };


        })();

        return Lib;


    })(KISP, {});

    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {         //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    var GenToken = (function () {

        function token(eid, openid) {

            debugger;

            var key = $.String.random(3);
            var tokens = [];

            var base64 = Base64.encode(key);
            tokens.push(base64);

            var ts = new Date().getTime().toString();

            var des = DES.encrypt(key, eid + "&" + openid + "&" + ts);
            tokens.push(des);

            return tokens.join('');
        }

        return {
            token:token
        }

    })();

    var Binder = PageNs.Binder = (function () {
        var msg = ["请输入正确的手机号", //0
            "姓名不能为空",
            "请输入正确的企业名称", //2
            "创建成功！",
            "请输入企业号", //4
            "请输入密码",
            "激活成功",     //6
            "请输入正确的SN号",
            "接入成功",     //8
            "未知错误",
            "该功能暂未开放,建议使用新注册通道", //10
            "密码不能少于6位",
            "您的移动工作平台暂未开启或网络错误", //12
            "您输入的企业名称有误"
        ];
        var suc = true;
        var g_totalpage = 6;

        function AlertMsg(my_msg) {
            if ($.String.contains(msg[12],my_msg)||my_msg=="，") {
                my_msg = "您的移动工作平台暂未开启或网络错误";
            }
            jAlert(my_msg);
            suc=false;
        }

        function ShowPage(num)
        {
            for (var i = 0; i < g_totalpage; i++)
            {
                $("#page"+i).hide();
            }
            num!=-1 && $("#page" + num).show();
        }

        function LoginDone() {
            var token= GenToken.token($("#eidtxt").val(), GetQueryString('openid') || "U0001-U0001-U0001-U0002");

            sessionStorage.setItem("kis_eid", $("#eidtxt").val());
            sessionStorage.setItem("kis_fromtag", GetQueryString('fromtag'));
            sessionStorage.setItem("kis_openid", GetQueryString('openid') || "U0001-U0001-U0001-U0002");
            window.location.assign("http://mob.cmcloud.cn/kisplus/apps/index.html?fromlogin=wx&token=" + token + "&eid=" + $("#eidtxt").val() + "&fromtag=" + GetQueryString('fromtag') + "&openid=" + GetQueryString('openid') || "U0001-U0001-U0001-U0002");
        }

        return {
            ToDemo: function () {
                var url = "http://mob.cmcloud.cn/kisplustest/apps/index.html";
                window.location.assign(url);
            },
            saveToBind: function () {

                function CheckDone() {
                    if (suc) {

                        Lib.API.get('GetAcctInfoListByOpenID', {
                        }, function (data, json) {

                            if (json["Result"] == "200") {

                                var list = $.Array.keep(data || [], function (item, index) {

                                    return {
                                        AcctID: item.AcctID,
                                        AcctName: item.AcctName,
                                        AcctNumber: item.AcctNumber,
                                        CompanyName: item.CompanyName,
                                        DBName: item.DBName,
                                        Description: item.Description,
                                        Edition: item.Edition,
                                        ID: item.ID,
                                        IndustryType: item.IndustryType,
                                        IsDefault: item.IsDefault,
                                        OpenID: item.OpenID,
                                        UserID: item.UserID,
                                        UserName: item.UserName,
                                        UserPassword: item.UserPassword
                                    };
                                });

                                if (list.length == 0) {
                                    var token = GenToken.token($("#eidtxt").val(), GetQueryString('openid') || "U0001-U0001-U0001-U0002");
                                    var url = "http://mob.cmcloud.cn/WebApptest/kisplus/AcctInfoList.html?token=" + token + "&eid=" +
        $("#eidtxt").val() + "&openid=" + GetQueryString('openid');
                                    window.location.assign(url);
                                }
                                else {
                                    var url = "http://mob.cmcloud.cn/webapptest/openapi/SetEIDToWX_Openid"
                                    Ajax.getJSON(url, {
                                        eid: $("#eidtxt").val(),
                                        wx_openid: GetQueryString('openid') || "U0001-U0001-U0001-U0002",
                                        fromtag: GetQueryString('fromtag')
                                    }, function (eid, json) {
                                        LoginDone();
                                    }, function (errMsg, json) {
                                        LoginDone();
                                    }, function () {
                                        LoginDone();
                                    });
                                }

                            } else if (json["Result"] == "202") {
                                var token = GenToken.token($("#eidtxt").val(), GetQueryString('openid') || "U0001-U0001-U0001-U0002");
                                var url = "http://mob.cmcloud.cn/WebApptest/kisplus/AcctInfoList.html?token=" + token + "&eid=" +
    $("#eidtxt").val() + "&openid=" + GetQueryString('openid');
                                window.location.assign(url);
                            } else {
                                AlertMsg(msg[12]);
                            }

                        }, function (code, errMsg, json) {
                            AlertMsg(msg[12]);
                        }, function () {
                            AlertMsg(msg[12]);
                        });
                    }
                }

                if (GetQueryString('openid') == null || GetQueryString('openid') == "undefined")
                {
                    jAlert("用户ID不能为空。");
                    return;
                }

                suc = true;

                Check.CheckNull($("#eidtxt").val()) || AlertMsg(msg[4]);

                if (!Check.CheckEID($("#eidtxt").val())) {
                    $("#kdloading").show();
                    var url = "http://kd.cmcloud.cn/KISWebapi/customerSearch";

                    Ajax.getJSON(url, {
                        word: $("#eidtxt").val()
                    }, function (eid, json) {
                        var arr = json.data;
                        var found = false;
                        for (var j = 0; j < arr.length; j++) {
                            if ($("#eidtxt").val() == arr[j].customerName) {
                                $("#eidtxt").val(arr[j].cust3gNo);
                                CheckDone();
                                
                                found = true;
                                break;
                            }
                        }

                        $("#kdloading").hide();
                        if (!found) {
                            AlertMsg(msg[13]);
                        }

                    }, function (errMsg, json) {
                        $("#kdloading").hide();
                        AlertMsg(msg[13]);
                    }, function () {
                        $("#kdloading").hide();
                        AlertMsg(msg[13]);
                    });
                } else {
                    CheckDone();
                }
                
            },
            ToCreateNoKIS: function () {
                ShowPage(2);
            },
            ToChoseCreate: function () {
                ShowPage(1);
            },
            ToCreateByKIS: function () {
                jAlert(msg[10]);
                //ShowPage(5);
                //ShowPage(3);
            },
            ToHelp: function () {
                //$("#showeidtxt").html("短信已经发送到您的手机，请耐心等候。输入短信中的企业号:"+reg_eid+" 和初始密码进行激活。");
                //ShowPage(4);
                ShowPage(5);//change by justinlee 2014.7.8
            },
            Create: function () {
                
                
                suc = true;
                
                Check.CheckPhone($("#phonetxt").val()) || AlertMsg(msg[0]);
                Check.CheckNull($("#nametxt").val()) || AlertMsg(msg[1]);
                Check.CheckLength($("#pwdtxt").val(),5) || AlertMsg(msg[11]);
                Check.CheckCompanyName($("#companytxt").val()) || AlertMsg(msg[2]);


                if (suc)
                {
                    //var url = "http://mob.cmcloud.cn/BaseCloudSrv/api/RegisterKdweibo";
                    var url = "http://mob.cmcloud.cn/BaseCloudSrv/api/RegisterCompany";
                    $("#kdloading").show();
                    Ajax.getJSON(url, { custName: $("#companytxt").val(),
                        name: $("#nametxt").val(),
                        phone: $("#phonetxt").val(),
                        password: $("#pwdtxt").val(),
                        email: "KD_KISApp@kingdee.com"
                    },
                       function (data, json) {
                           reg_eid = data.mID;
                           jAlert(msg[3]);
                           $("#eidtxt").val(reg_eid);
                           $("#helptitle").html("注册信息已经短信发到您的手机，请注意查收。</br>您的企业号：" + reg_eid);
                           PageNs.Binder.ToHelp();
                           $("#kdloading").hide();
                       }, function (errMsg, json) {
                           jAlert(errMsg);
                           suc = false;
                           $("#kdloading").hide();

                       }, function () {
                           jAlert(msg[9]);
                           suc = false;
                           $("#kdloading").hide();
                    });
                }
            },
            ActiveToKIS:function()
            {
                suc = true;

                $("#pwdtxt4").val() || AlertMsg(msg[5]);
                $("#eidtxt4").val() || AlertMsg(msg[4]);
               

                if (suc) {

                    var url = "http://mob.cmcloud.cn/BaseCloudSrv/api/ValidatePWD2";
                    $("#kdloading").show();
                    Ajax.getJSON(url, {
                        mID: $("#eidtxt4").val(),
                        password: $("#pwdtxt4").val()
                    },
                       function (eid, json) {
                           jAlert(msg[6]);
                           ShowPage(5);
                           $("#kdloading").hide();
                       }, function (errMsg, json) {
                           jAlert(errMsg);
                           suc = false;
                           $("#kdloading").hide();

                       }, function () {
                           jAlert(msg[9]);
                           suc = false;
                           $("#kdloading").hide();
                       });
                }
            },
            JumpKDweibo: function () {
                var kdweibourl = "http://mob.cmcloud.cn/kisplus/jumptokdweibo.html?cmd=mobreg";

                if (browser.versions.ios) {
                    window.location.assign("kdxt://p");
                    var clickedAt = +new Date;
                    // During tests on 3g/3gs this timeout fires immediately if less than 500ms.  
                    setTimeout(function () {
                        // To avoid failing on return to MobileSafari, ensure freshness!  
                        if (+new Date - clickedAt < 2000) {
                            window.location = kdweibourl;
                        }
                    }, 500);
                }
                else {
                    window.location.assign(kdweibourl);
                }
            },
            JumpHelp: function () {
                window.location.assign("http://www.weijuju.com/static/article?action=detail&rid=204743");
            },
            ShowPage: ShowPage,
            BindToKIS: function ()
            {

                suc = true;

                Check.CheckPhone($("#SNPhonetxt").val()) || AlertMsg(msg[0]);
                Check.CheckSNNum($("#SNtxt").val()) || AlertMsg(msg[7]);


                if (suc) {
                    jAlert(msg[8]);
                    ShowPage(4);
                }
            }
        };
    })();

    var Check = (function () {
        var RegPhone = /^1[3|4|5|8][0-9]\d{4,8}$/;
        var RegEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var RegEID = /^[1-9]\d*$|^0$/;

        return {
            CheckPhone: function (phone) {
                if (!RegPhone.test(phone) || phone.length < 11)
                    return false;
                else
                    return true;
            },
            CheckSNNum: function (SN) {
                if (SN.length != 10)
                    return false;

                return true;
            },
            CheckEmail: function (email) {
                if (!RegEmail.test(email))
                    return false;
                else
                    return true;
            },
            CheckCompanyName: function (name) {
                if (name.length<=4||name.length>50)
                    return false;
                else
                    return true;
            },
            CheckNull: function (name) {
                if (name.length <= 0)
                    return false;
                else
                    return true;
            },
            CheckLength: function (name,len) {
            if (name.length <= len||0)
                return false;
            else
                return true;
            },
            CheckEID: function (eid) {
                if (!RegEID.test(eid))
                    return false;
                else
                    return true;
            }
        }

    })();

    var Base64 = (function () {
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        /**
         * base64编码
         * @param {Object} str
         */
        function base64encode(str) {
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        }
        /**
         * base64解码
         * @param {Object} str
         */
        function base64decode(str) {
            var c1, c2, c3, c4;
            var i, len, out;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                /* c1 */
                do {
                    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                }
                while (i < len && c1 == -1);
                if (c1 == -1)
                    break;
                /* c2 */
                do {
                    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                }
                while (i < len && c2 == -1);
                if (c2 == -1)
                    break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                /* c3 */
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return out;
                    c3 = base64DecodeChars[c3];
                }
                while (i < len && c3 == -1);
                if (c3 == -1)
                    break;
                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                /* c4 */
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61)
                        return out;
                    c4 = base64DecodeChars[c4];
                }
                while (i < len && c4 == -1);
                if (c4 == -1)
                    break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        }
        /**
         * utf16转utf8
         * @param {Object} str
         */
        function utf16to8(str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                }
                else
                    if (c > 0x07FF) {
                        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
                    else {
                        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
            }
            return out;
        }
        /**
         * utf8转utf16
         * @param {Object} str
         */
        function utf8to16(str) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = str.length;
            i = 0;
            while (i < len) {
                c = str.charCodeAt(i++);
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        // 0xxxxxxx
                        out += str.charAt(i - 1);
                        break;
                    case 12:
                    case 13:
                        // 110x xxxx 10xx xxxx
                        char2 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        // 1110 xxxx10xx xxxx10xx xxxx
                        char2 = str.charCodeAt(i++);
                        char3 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        }
        //demo
        //function doit(){
        //    var f = document.f;
        //    f.output.value = base64encode(utf16to8(f.source.value));
        //    f.decode.value = utf8to16(base64decode(f.output.value));
        //}


        return {
            encode: base64encode,
            decode: base64decode
        }

    })();


    var DES = (function () {


        //加解密主函数
        function des(key, message, encrypt, mode, iv) {
            var spfunction1 = new Array(0x1010400, 0, 0x10000, 0x1010404, 0x1010004, 0x10404, 0x4, 0x10000, 0x400, 0x1010400, 0x1010404, 0x400, 0x1000404, 0x1010004, 0x1000000, 0x4, 0x404, 0x1000400, 0x1000400, 0x10400, 0x10400, 0x1010000, 0x1010000, 0x1000404, 0x10004, 0x1000004, 0x1000004, 0x10004, 0, 0x404, 0x10404, 0x1000000, 0x10000, 0x1010404, 0x4, 0x1010000, 0x1010400, 0x1000000, 0x1000000, 0x400, 0x1010004, 0x10000, 0x10400, 0x1000004, 0x400, 0x4, 0x1000404, 0x10404, 0x1010404, 0x10004, 0x1010000, 0x1000404, 0x1000004, 0x404, 0x10404, 0x1010400, 0x404, 0x1000400, 0x1000400, 0, 0x10004, 0x10400, 0, 0x1010004);
            var spfunction2 = new Array(-0x7fef7fe0, -0x7fff8000, 0x8000, 0x108020, 0x100000, 0x20, -0x7fefffe0, -0x7fff7fe0, -0x7fffffe0, -0x7fef7fe0, -0x7fef8000, -0x8000000, -0x7fff8000, 0x100000, 0x20, -0x7fefffe0, 0x108000, 0x100020, -0x7fff7fe0, 0, -0x8000000, 0x8000, 0x108020, -0x7ff00000, 0x100020, -0x7fffffe0, 0, 0x108000, 0x8020, -0x7fef8000, -0x7ff00000, 0x8020, 0, 0x108020, -0x7fefffe0, 0x100000, -0x7fff7fe0, -0x7ff00000, -0x7fef8000, 0x8000, -0x7ff00000, -0x7fff8000, 0x20, -0x7fef7fe0, 0x108020, 0x20, 0x8000, -0x8000000, 0x8020, -0x7fef8000, 0x100000, -0x7fffffe0, 0x100020, -0x7fff7fe0, -0x7fffffe0, 0x100020, 0x108000, 0, -0x7fff8000, 0x8020, -0x8000000, -0x7fefffe0, -0x7fef7fe0, 0x108000);
            var spfunction3 = new Array(0x208, 0x8020200, 0, 0x8020008, 0x8000200, 0, 0x20208, 0x8000200, 0x20008, 0x8000008, 0x8000008, 0x20000, 0x8020208, 0x20008, 0x8020000, 0x208, 0x8000000, 0x8, 0x8020200, 0x200, 0x20200, 0x8020000, 0x8020008, 0x20208, 0x8000208, 0x20200, 0x20000, 0x8000208, 0x8, 0x8020208, 0x200, 0x8000000, 0x8020200, 0x8000000, 0x20008, 0x208, 0x20000, 0x8020200, 0x8000200, 0, 0x200, 0x20008, 0x8020208, 0x8000200, 0x8000008, 0x200, 0, 0x8020008, 0x8000208, 0x20000, 0x8000000, 0x8020208, 0x8, 0x20208, 0x20200, 0x8000008, 0x8020000, 0x8000208, 0x208, 0x8020000, 0x20208, 0x8, 0x8020008, 0x20200);
            var spfunction4 = new Array(0x802001, 0x2081, 0x2081, 0x80, 0x802080, 0x800081, 0x800001, 0x2001, 0, 0x802000, 0x802000, 0x802081, 0x81, 0, 0x800080, 0x800001, 0x1, 0x2000, 0x800000, 0x802001, 0x80, 0x800000, 0x2001, 0x2080, 0x800081, 0x1, 0x2080, 0x800080, 0x2000, 0x802080, 0x802081, 0x81, 0x800080, 0x800001, 0x802000, 0x802081, 0x81, 0, 0, 0x802000, 0x2080, 0x800080, 0x800081, 0x1, 0x802001, 0x2081, 0x2081, 0x80, 0x802081, 0x81, 0x1, 0x2000, 0x800001, 0x2001, 0x802080, 0x800081, 0x2001, 0x2080, 0x800000, 0x802001, 0x80, 0x800000, 0x2000, 0x802080);
            var spfunction5 = new Array(0x100, 0x2080100, 0x2080000, 0x42000100, 0x80000, 0x100, 0x40000000, 0x2080000, 0x40080100, 0x80000, 0x2000100, 0x40080100, 0x42000100, 0x42080000, 0x80100, 0x40000000, 0x2000000, 0x40080000, 0x40080000, 0, 0x40000100, 0x42080100, 0x42080100, 0x2000100, 0x42080000, 0x40000100, 0, 0x42000000, 0x2080100, 0x2000000, 0x42000000, 0x80100, 0x80000, 0x42000100, 0x100, 0x2000000, 0x40000000, 0x2080000, 0x42000100, 0x40080100, 0x2000100, 0x40000000, 0x42080000, 0x2080100, 0x40080100, 0x100, 0x2000000, 0x42080000, 0x42080100, 0x80100, 0x42000000, 0x42080100, 0x2080000, 0, 0x40080000, 0x42000000, 0x80100, 0x2000100, 0x40000100, 0x80000, 0, 0x40080000, 0x2080100, 0x40000100);
            var spfunction6 = new Array(0x20000010, 0x20400000, 0x4000, 0x20404010, 0x20400000, 0x10, 0x20404010, 0x400000, 0x20004000, 0x404010, 0x400000, 0x20000010, 0x400010, 0x20004000, 0x20000000, 0x4010, 0, 0x400010, 0x20004010, 0x4000, 0x404000, 0x20004010, 0x10, 0x20400010, 0x20400010, 0, 0x404010, 0x20404000, 0x4010, 0x404000, 0x20404000, 0x20000000, 0x20004000, 0x10, 0x20400010, 0x404000, 0x20404010, 0x400000, 0x4010, 0x20000010, 0x400000, 0x20004000, 0x20000000, 0x4010, 0x20000010, 0x20404010, 0x404000, 0x20400000, 0x404010, 0x20404000, 0, 0x20400010, 0x10, 0x4000, 0x20400000, 0x404010, 0x4000, 0x400010, 0x20004010, 0, 0x20404000, 0x20000000, 0x400010, 0x20004010);
            var spfunction7 = new Array(0x200000, 0x4200002, 0x4000802, 0, 0x800, 0x4000802, 0x200802, 0x4200800, 0x4200802, 0x200000, 0, 0x4000002, 0x2, 0x4000000, 0x4200002, 0x802, 0x4000800, 0x200802, 0x200002, 0x4000800, 0x4000002, 0x4200000, 0x4200800, 0x200002, 0x4200000, 0x800, 0x802, 0x4200802, 0x200800, 0x2, 0x4000000, 0x200800, 0x4000000, 0x200800, 0x200000, 0x4000802, 0x4000802, 0x4200002, 0x4200002, 0x2, 0x200002, 0x4000000, 0x4000800, 0x200000, 0x4200800, 0x802, 0x200802, 0x4200800, 0x802, 0x4000002, 0x4200802, 0x4200000, 0x200800, 0, 0x2, 0x4200802, 0, 0x200802, 0x4200000, 0x800, 0x4000002, 0x4000800, 0x800, 0x200002);
            var spfunction8 = new Array(0x10001040, 0x1000, 0x40000, 0x10041040, 0x10000000, 0x10001040, 0x40, 0x10000000, 0x40040, 0x10040000, 0x10041040, 0x41000, 0x10041000, 0x41040, 0x1000, 0x40, 0x10040000, 0x10000040, 0x10001000, 0x1040, 0x41000, 0x40040, 0x10040040, 0x10041000, 0x1040, 0, 0, 0x10040040, 0x10000040, 0x10001000, 0x41040, 0x40000, 0x41040, 0x40000, 0x10041000, 0x1000, 0x40, 0x10040040, 0x1000, 0x41040, 0x10001000, 0x40, 0x10000040, 0x10040000, 0x10040040, 0x10000000, 0x40000, 0x10001040, 0, 0x10041040, 0x40040, 0x10000040, 0x10040000, 0x10001000, 0x10001040, 0, 0x10041040, 0x41000, 0x41000, 0x1040, 0x1040, 0x40040, 0x10000000, 0x10041000);
            var keys = des_createKeys(key);
            var m = 0, i, j, temp, temp2, right1, right2, left, right, looping;
            var cbcleft, cbcleft2, cbcright, cbcright2;
            var endloop, loopinc;
            var len = message.length;
            var chunk = 0;
            var iterations = keys.length == 32 ? 3 : 9;

            if (iterations == 3) {
                looping = encrypt ? new Array(0, 32, 2) : new Array(30, -2, -2);
            }
            else {
                looping = encrypt ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2);
            }

            message += "\0\0\0\0\0\0\0\0";
            result = "";
            tempresult = "";
            if (mode == 1) {
                cbcleft = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
                cbcright = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++); m = 0;
            }
            while (m < len) {
                if (encrypt) {
                    left = (message.charCodeAt(m++) << 16) | message.charCodeAt(m++); right = (message.charCodeAt(m++) << 16) | message.charCodeAt(m++);
                }
                else {
                    left = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
                    right = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
                }

                if (mode == 1) {
                    if (encrypt) {
                        left ^= cbcleft; right ^= cbcright;
                    }
                    else {
                        cbcleft2 = cbcleft; cbcright2 = cbcright; cbcleft = left; cbcright = right;
                    }
                }

                temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
                right ^= temp;
                left ^= (temp << 4);
                temp = ((left >>> 16) ^ right) & 0x0000ffff;
                right ^= temp;
                left ^= (temp << 16);
                temp = ((right >>> 2) ^ left) & 0x33333333;
                left ^= temp;
                right ^= (temp << 2);
                temp = ((right >>> 8) ^ left) & 0x00ff00ff;
                left ^= temp; right ^= (temp << 8);
                temp = ((left >>> 1) ^ right) & 0x55555555;
                right ^= temp;
                left ^= (temp << 1);
                left = ((left << 1) | (left >>> 31));
                right = ((right << 1) | (right >>> 31));
                for (j = 0; j < iterations; j += 3) {
                    endloop = looping[j + 1];
                    loopinc = looping[j + 2];
                    for (i = looping[j]; i != endloop; i += loopinc) {
                        right1 = right ^ keys[i];
                        right2 = ((right >>> 4) | (right << 28)) ^ keys[i + 1];
                        temp = left;
                        left = right;
                        right = temp ^ (spfunction2[(right1 >>> 24) & 0x3f] | spfunction4[(right1 >>> 16) & 0x3f] | spfunction6[(right1 >>> 8) & 0x3f] | spfunction8[right1 & 0x3f] | spfunction1[(right2 >>> 24) & 0x3f] | spfunction3[(right2 >>> 16) & 0x3f] | spfunction5[(right2 >>> 8) & 0x3f] | spfunction7[right2 & 0x3f]);
                    }

                    temp = left;
                    left = right;
                    right = temp;
                }
                left = ((left >>> 1) | (left << 31));
                right = ((right >>> 1) | (right << 31));
                temp = ((left >>> 1) ^ right) & 0x55555555;
                right ^= temp; left ^= (temp << 1);
                temp = ((right >>> 8) ^ left) & 0x00ff00ff;
                left ^= temp; right ^= (temp << 8);
                temp = ((right >>> 2) ^ left) & 0x33333333;
                left ^= temp; right ^= (temp << 2);
                temp = ((left >>> 16) ^ right) & 0x0000ffff;
                right ^= temp; left ^= (temp << 16);
                temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
                right ^= temp; left ^= (temp << 4);
                if (mode == 1) {
                    if (encrypt) {
                        cbcleft = left;
                        cbcright = right;
                    }
                    else {
                        left ^= cbcleft2;
                        right ^= cbcright2;
                    }
                }

                if (encrypt) {
                    tempresult += String.fromCharCode((left >>> 24), ((left >>> 16) & 0xff), ((left >>> 8) & 0xff), (left & 0xff), (right >>> 24), ((right >>> 16) & 0xff), ((right >>> 8) & 0xff), (right & 0xff));
                }
                else {
                    tempresult += String.fromCharCode(((left >>> 16) & 0xffff), (left & 0xffff), ((right >>> 16) & 0xffff), (right & 0xffff));
                }

                encrypt ? chunk += 16 : chunk += 8;

                if (chunk == 512) {
                    result += tempresult;
                    tempresult = "";
                    chunk = 0;
                }
            }

            return result + tempresult;
        }
        //密钥生成函数
        function des_createKeys(key) {
            pc2bytes0 = new Array(0, 0x4, 0x20000000, 0x20000004, 0x10000, 0x10004, 0x20010000, 0x20010004, 0x200, 0x204, 0x20000200, 0x20000204, 0x10200, 0x10204, 0x20010200, 0x20010204);
            pc2bytes1 = new Array(0, 0x1, 0x100000, 0x100001, 0x4000000, 0x4000001, 0x4100000, 0x4100001, 0x100, 0x101, 0x100100, 0x100101, 0x4000100, 0x4000101, 0x4100100, 0x4100101);
            pc2bytes2 = new Array(0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808, 0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808);
            pc2bytes3 = new Array(0, 0x200000, 0x8000000, 0x8200000, 0x2000, 0x202000, 0x8002000, 0x8202000, 0x20000, 0x220000, 0x8020000, 0x8220000, 0x22000, 0x222000, 0x8022000, 0x8222000);
            pc2bytes4 = new Array(0, 0x40000, 0x10, 0x40010, 0, 0x40000, 0x10, 0x40010, 0x1000, 0x41000, 0x1010, 0x41010, 0x1000, 0x41000, 0x1010, 0x41010);
            pc2bytes5 = new Array(0, 0x400, 0x20, 0x420, 0, 0x400, 0x20, 0x420, 0x2000000, 0x2000400, 0x2000020, 0x2000420, 0x2000000, 0x2000400, 0x2000020, 0x2000420);
            pc2bytes6 = new Array(0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002, 0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002);
            pc2bytes7 = new Array(0, 0x10000, 0x800, 0x10800, 0x20000000, 0x20010000, 0x20000800, 0x20010800, 0x20000, 0x30000, 0x20800, 0x30800, 0x20020000, 0x20030000, 0x20020800, 0x20030800);
            pc2bytes8 = new Array(0, 0x40000, 0, 0x40000, 0x2, 0x40002, 0x2, 0x40002, 0x2000000, 0x2040000, 0x2000000, 0x2040000, 0x2000002, 0x2040002, 0x2000002, 0x2040002);
            pc2bytes9 = new Array(0, 0x10000000, 0x8, 0x10000008, 0, 0x10000000, 0x8, 0x10000008, 0x400, 0x10000400, 0x408, 0x10000408, 0x400, 0x10000400, 0x408, 0x10000408);
            pc2bytes10 = new Array(0, 0x20, 0, 0x20, 0x100000, 0x100020, 0x100000, 0x100020, 0x2000, 0x2020, 0x2000, 0x2020, 0x102000, 0x102020, 0x102000, 0x102020);
            pc2bytes11 = new Array(0, 0x1000000, 0x200, 0x1000200, 0x200000, 0x1200000, 0x200200, 0x1200200, 0x4000000, 0x5000000, 0x4000200, 0x5000200, 0x4200000, 0x5200000, 0x4200200, 0x5200200);
            pc2bytes12 = new Array(0, 0x1000, 0x8000000, 0x8001000, 0x80000, 0x81000, 0x8080000, 0x8081000, 0x10, 0x1010, 0x8000010, 0x8001010, 0x80010, 0x81010, 0x8080010, 0x8081010);
            pc2bytes13 = new Array(0, 0x4, 0x100, 0x104, 0, 0x4, 0x100, 0x104, 0x1, 0x5, 0x101, 0x105, 0x1, 0x5, 0x101, 0x105);
            var iterations = key.length >= 24 ? 3 : 1;
            var keys = new Array(32 * iterations);
            var shifts = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
            var lefttemp, righttemp, m = 0, n = 0, temp;

            for (var j = 0; j < iterations; j++) {
                left = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
                right = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
                temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
                right ^= temp;
                left ^= (temp << 4);
                temp = ((right >>> -16) ^ left) & 0x0000ffff;
                left ^= temp;
                right ^= (temp << -16);
                temp = ((left >>> 2) ^ right) & 0x33333333;
                right ^= temp;
                left ^= (temp << 2);
                temp = ((right >>> -16) ^ left) & 0x0000ffff;
                left ^= temp; right ^= (temp << -16);
                temp = ((left >>> 1) ^ right) & 0x55555555;
                right ^= temp; left ^= (temp << 1);
                temp = ((right >>> 8) ^ left) & 0x00ff00ff;
                left ^= temp; right ^= (temp << 8);
                temp = ((left >>> 1) ^ right) & 0x55555555;
                right ^= temp; left ^= (temp << 1);
                temp = (left << 8) | ((right >>> 20) & 0x000000f0);
                left = (right << 24) | ((right << 8) & 0xff0000) | ((right >>> 8) & 0xff00) | ((right >>> 24) & 0xf0);
                right = temp;

                for (i = 0; i < shifts.length; i++) {
                    if (shifts[i]) {
                        left = (left << 2) | (left >>> 26); right = (right << 2) | (right >>> 26);
                    }
                    else {
                        left = (left << 1) | (left >>> 27);
                        right = (right << 1) | (right >>> 27);
                    }
                    left &= -0xf;
                    right &= -0xf;
                    lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[(left >>> 24) & 0xf] | pc2bytes2[(left >>> 20) & 0xf] | pc2bytes3[(left >>> 16) & 0xf] | pc2bytes4[(left >>> 12) & 0xf] | pc2bytes5[(left >>> 8) & 0xf] | pc2bytes6[(left >>> 4) & 0xf];
                    righttemp = pc2bytes7[right >>> 28] | pc2bytes8[(right >>> 24) & 0xf] | pc2bytes9[(right >>> 20) & 0xf] | pc2bytes10[(right >>> 16) & 0xf] | pc2bytes11[(right >>> 12) & 0xf] | pc2bytes12[(right >>> 8) & 0xf] | pc2bytes13[(right >>> 4) & 0xf];
                    temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff;
                    keys[n++] = lefttemp ^ temp;
                    keys[n++] = righttemp ^ (temp << 16);
                }
            }



            return keys;
        }
        //将普通的字符串转换成16进制代码的字符串
        function stringToHex(s) {
            var r = ""; var hexes = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
            for (var i = 0; i < (s.length) ; i++) { r += hexes[s.charCodeAt(i) >> 4] + hexes[s.charCodeAt(i) & 0xf]; }
            return r;
        }
        //将16进制代码的字符串转换成普通的字符串
        function HexTostring(s) {
            var r = "";
            for (var i = 0; i < s.length; i += 2) { var sxx = parseInt(s.substring(i, i + 2), 16); r += String.fromCharCode(sxx); }
            return r;
        }





        /*用法如下:
        1.在前台页面使用(javascript)jsencrypt(key,message)函数加密数据,并传到服务器,
            对应的,在服务器端使用(C#)DesDecrypt(key,message)解密得到原始数据.
        2.同理:在服务器端使用(C#) DesEncrypt(key,message)加密数据,
            在页面上使用(javascript)jsdecrypt(key,message)解密,得到数据.
        */

        //JS DES加密函数
        function jsencrypt(key, message) {
            var ciphertext = stringToHex(des(key, message, 1, 0));
            return ciphertext;
        }

        //JS DES解密函数
        function jsdecrypt(key, message) {
            var plaintext = des(key, HexTostring(message), 0, 0);
            return plaintext;
        }




        return {
            encrypt: jsencrypt,
            decrypt: jsdecrypt
        };


    })();

    var delayLoad = PageNs.delayLoad = (function () {
        function img_delayload(option) {
            //读取参数
            //图片未加载时显示的图片
            var src = option.src ? option.src : '',
            //指定那些id下的img元素使用延迟显示
                id = option.id ? option.id : [];
            //图片列表
            var imgs = [];
            //获得所有的图片元素
            for (var i = 0 ; i < id.length ; i++) {
                var idbox = document.getElementById(id[i]), _imgs;
                if (idbox && (_imgs = idbox.getElementsByTagName('img'))) {
                    for (var t = 0 ; t < _imgs.length ; t++) {
                        imgs.push(_imgs[t]);
                    }
                }
            }
            //将所有的图片设置为指定的loading图片
            for (var i = 0 ; i < imgs.length ; i++) {
                //图片本来的图片路径放入_src中
                imgs[i].setAttribute('_src', imgs[i].src);
                imgs[i].src = src;
            }
            //取元素的页面绝对 X位置
            var getLeft = function (El) {
                var left = 0;
                do {
                    left += El.offsetLeft;
                } while ((El = El.offsetParent).nodeName != 'BODY');
                return left;
            };
            //取元素的页面绝对 Y位置
            var getTop = function (El) {
                var top = 0;
                do {
                    top += El.offsetTop;
                } while ((El = El.offsetParent).nodeName != 'BODY');
                return top;
            };
            //是否为ie，并读出ie版本
            var isIE = !!navigator.userAgent.match(/MSIE\b\s*([0-9]\.[0-9]);/img);
            isIE && (isIE = RegExp.$1);
            //是否为chrome
            var isGoo = !!navigator.userAgent.match(/AppleWebKit\b/img);
            //获得可以触发scroll事件的对象
            var box = isIE ? document.documentElement : document;
            //body元素的scroll事件
            var onscroll = box.onscroll = function () {
                //读取滚动条的位置和浏览器窗口的显示大小
                var top = isGoo ? document.body.scrollTop : document.documentElement.scrollTop,
                    left = isGoo ? document.body.scrollLeft : document.documentElement.scrollLeft,
                    width = document.documentElement.clientWidth,
                    height = document.documentElement.clientHeight;
                //对所有图片进行批量判断是否在浏览器显示区域内
                for (var i = 0 ; i < imgs.length; i++) {
                    var _top = getTop(imgs[i]), _left = getLeft(imgs[i]);
                    //判断图片是否在显示区域内
                    if (_top >= top &&
                        _left >= left &&
                        _top <= top + height &&
                        _left <= left + width) {
                        var _src = imgs[i].getAttribute('_src');
                        //如果图片已经显示，则取消赋值
                        if (imgs[i].src !== _src) {
                            imgs[i].src = _src;
                        }
                    }
                }
            };
            var load = new Image();
            load.src = src;
            load.onload = function () {
                onscroll();
            };
        }

        return {
            load: img_delayload
        }
    })();


    //开始
    (function () {

        $("#btn").bind("click", function () {

            var eid = document.getElementById("eid").value;
            var openid = document.getElementById("openid").value;
            var token = GenToken.token(eid, openid);

            document.getElementById("token").value = token;
        });


    })();



    //add by clover 2014-10-23

    var eids = {
        'qj':'438915',
        'sm':'22022',
        'pro':'19953'
    }
    var openids = {
        'qj':'ukis_qj001_demo',
        'sm':'U0001-U0001-U0001-U0001',
        'pro':'U0001-U0001-U0001-U0002'
    }

    $('#qj').on('click',function(){
        window.location.href = 'http://mob.cmcloud.cn/kisplus/apps/index.html?eid=' +
            eids['qj'] + '&openid=' + openids['qj'] + '&fromlogin=wx';
    });

    $('#pro').on('click',function(){
        window.location.href = 'http://mob.cmcloud.cn/kisplus/apps/index.html?eid=' +
            eids['pro'] + '&openid=' + openids['pro'] + '&fromlogin=wx';
    });

    $('#sm').on('click',function(){
        window.location.href = 'http://mob.cmcloud.cn/kisplus/apps/index.html?eid=' +
            eids['sm'] + '&openid=' + openids['sm'] + '&fromlogin=wx';
    });

    $('#jxs').on('click',function(){
        PageNs.Binder.ShowPage(6);
    });


})(window.PageNs = {}, MiniQuery);



