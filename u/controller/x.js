layui.define(['admin'], function (exports) {
    var $ = layui.$,
        layer = layui.layer,
        admin = layui.admin,
        layset = {
            icon: 7,
            title: lang('tx'),
            skin: 'jm-class'
        };
    var get_xx;
    var xjs = {
        setCookie: function (name, value, days) {
            var argc = setCookie.arguments.length;
            var argv = setCookie.arguments;
            var secure = (argc > 5) ? argv[5] : false;
            var expire = new Date();
            if (days == null || days == 0) days = 1;
            expire.setTime(expire.getTime() + 3600000 * 24 * days);
            document.cookie = name + "=" + escape(value) + ("; path=/") + ((secure == true) ? "; secure" : "") + ";expires=" + expire.toGMTString();
        },
        sortSelect: function (arr) {
            arr.forEach(function (k, v) {
                var str = "str" + v;
                for (var i in k) {
                    $("#" + k.id).remove();
                    str = '<div class="dropdown" id="' + k.id + '"><dl class="layui-nav-child layui-anim layui-anim-upbit"><dd data-value=""><a href="javascript:void(0);">' + k.title + '</a></dd>';
                    for (var j in k.list) {
                        str += '<dd data-value=' + j + '><a href="javascript:void(0);">' + k.list[j] + '</a></dd>';
                    }
                    str += '</dl></div>';
                }
                $('body').append(str);
            })
        },
        serlizeTimeBefore: function (seconds) {
            var date = new Date(seconds);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d
        },
        arr_lie: function (arr, name) {
            var ret = []
            for (var i = 0, len = arr.length; i < len; i++) {
                ret.push(arr[i][name])
            }
            return ret
        },
        check: function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        //格式化金额
        number_format: function (num, n) {
            num = parseFloat((num || 0).toString().replace(/[^\d\.-]/g, "")).toFixed(n).toString();
            var re = /(-?\d+)(\d{3})/;
            while (re.test(num)) {
                num = num.replace(re, "$1,$2");
            }
            return num;
        },
        //时间差计算
        DateDiff: function (interval, date1, date2) {
            var d1 = date1 == '' ? new Date() : new Date(date1);
            var d2 = date2 == '' ? new Date() : new Date(date2);
            var long = d2.getTime() - d1.getTime(); //相差毫秒
            switch (interval.toLowerCase()) {
                case "y":
                    return parseInt(date2.getFullYear() - date1.getFullYear());
                case "m":
                    return parseInt((date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth()));
                case "d":
                    return parseInt(long / 1000 / 60 / 60 / 24);
                case "w":
                    return parseInt(long / 1000 / 60 / 60 / 24 / 7);
                case "h":
                    return parseInt(long / 1000 / 60 / 60);
                case "n":
                    return parseInt(long / 1000 / 60);
                case "s":
                    return parseInt(long / 1000);
                case "l":
                    return parseInt(long);
            }
        },
        //导出文本
        daochu: function (E) {
            if (E != "") {
                var F = window.open("", "", "");
                F.opener = null;
                F.document.write(E);
                F.document.close()
            }
        },
        //数组拆分
        chunk: function (arr, size) {
            var result = [];
            for (var x = 0; x < Math.ceil(arr.length / size); x++) {
                var start = x * size;
                var end = start + size;
                result.push(arr.slice(start, end));
            }
            return result;
        },
        //页面滚动
        gd: function (wz, s) {
            if (typeof (s) === "undefined") {
                var s = 200;
            }
            if (wz >= 0) {
                $("#LAY_app_body").animate({
                    scrollTop: wz
                }, s);
            } else {
                if ($(wz).length > 0) {
                    var gd = $(wz).offset().top - 100;
                    $("#LAY_app_body").animate({
                        scrollTop: gd
                    }, s);
                }
            }
        },
        getYmNum: function () {
            var dom1 = $("textarea#ymlb");
            var totalW = dom1.parents('.layui-form-item').find('.layui-form-label').outerWidth() + dom1.outerWidth();
            var dom2 = $(".ymsr");
            var arr = dom1.val().split('\n');
            if (arr.length == 1 && arr[0] == "") {
                dom2.find('span').text(0);
            } else {
                dom2.find('span').text(dom1.val().split('\n').length);
            }
            var w = dom2.width();
            dom2.css('left', totalW - w - 5);
        },
        //表单验证
        yz: function (div) {
            var x = 0;
            $("#" + div + " input[required='required']").each(function () {
                if ($(this).val() == "") {
                    var msg = $(this).attr('msg');
                    if (!msg) {
                        msg = $(this).attr('placeholder');
                    }
                    if (msg && msg.length > 0) {
                        layer.msg(msg, {
                            tipsMore: 1,
                            icon: 5,
                            shift: 6
                        });
                    }
                    $(this).addClass('has-error').focus();
                    x = 1;
                    return false;
                } else {
                    $(this).removeClass('has-error');
                }
            });
            if (x == 1) {
                return false;
            }
            return true;
        },
        //退出登录
        logout: function () {
            var _that = this;
            layui.admin.req({
                url: '/logout',
                dataType: 'json',
                type: 'post',
                success: function (res) {
                    layer.msg(res.msg);
                    location.href = '/login'; //跳转到登入页
                }
            })
        },
        //未登录提示
        islogin: function (txt) {
            layer.msg(lang('dlcs'));
            setTimeout(function () {
                window.location.href = '/login';
            }, 1000)
            return false;
        },
        //登录框
        login: function () {
            var that = this;
            layer.closeAll();
            layer.open({
                type: 1,
                skin: 'jm-class',
                shadeClose: true,
                title: lang('yhdl'),
                area: ['360px', '340px'], //宽高
                content: '<div id="pop-login"><div><input id="re_yx" class="jm-input" name="re_yx" type="text" autocomplete="off" placeholder="请输入您的邮箱/ID" required="required"><i class="iconfont">&#xe61d;</i></div><div><input id="re_mm" class="jm-input" name="re_mm" autocomplete="off" type="password" placeholder="请输入您的密码" required="required"><i class="iconfont">&#xe681;</i></div><div><input id="re_yzmx" class="jm-input" name="re_yzm" autocomplete="off" placeholder="请输入验证码" required="required" type="text"><img class="buttonss" id="re_yzmsx" title="看不清？点一下换图" src="/getcode" onclick="this.src=\'/getcode?\'+new Date().getTime();" align="absmiddle"><i class="iconfont">&#xe680;</i></div><div class="submit-box"><button type="button" class="jm-button">登录</button><div><a href="/reg.htm" target="_blank" class="reg-link">新用户注册</a><a href="/getpass.htm" target="_blank" class="reg-link fr">忘记密码？</a></div></div></div>',
                success: function () {
                    $(".jm-class .cancel-btn").click(function () {
                        layer.closeAll();
                    });
                    $(".submit-box button").click(function () {
                        that.loginSubmit();
                    });

                    $("#pop-login input").keyup(function (e) {
                        if (e.keyCode == 13) {
                            that.loginSubmit();
                        }
                    });
                }
            });
        },
        //过滤文本
        glwb: function (s) {
            if (typeof ossurl === "undefined") {
                return '';
            }
            var a_nr = s;
            re = new RegExp('"', "g");
            a_nr = a_nr.replace(re, "&#34;");
            re = new RegExp("'", "g");
            a_nr = a_nr.replace(re, "&#39;");
            re = new RegExp('<', "g");
            a_nr = a_nr.replace(re, "&#60;");
            re = new RegExp('>', "g");
            a_nr = a_nr.replace(re, "&#62;");
            return a_nr
        },

        //登录提交
        loginSubmit: function () {
            var that = this;
            if (!this.yz("pop-login")) {
                return false;
            }
            layui.use(['md5'], function () {
                var re_mm = layui.md5(layui.md5('[jiami' + that.glwb($("#re_mm").val()) + 'mima]').substring(0, 19)).substring(0, 19);
                var data = {
                    re_mm: re_mm,
                    re_yx: $("#re_yx").val(),
                    re_yzm: $("#re_yzmx").val(),
                };
                $.ajax({
                    url: '/user_zh/p_login',
                    dataType: 'json',
                    type: 'post',
                    data: data,
                    success: function (res) {
                        if (res.code === 1) {
                            that.dlzt('dl');
                            layer.closeAll();
                            layer.msg(res.msg);
                            that.sx(1000);
                        } else {
                            layer.msg(res.msg);
                            $("#re_yzmsx").click();
                            $("#re_yzmx").val('');
                        }
                    }
                });
            });
        },

        senddx: function (t) {
            var sjhm = $(t).attr("data-canshu");
            admin.req({
                url: '/request/send_sms',
                data: {
                    phone: sjhm,
                    lx: "czyz"
                },
                type: 'post',
                success: function (res) {
                    if (res.code > 0) {
                        layer.msg(res.msg);
                        //短信
                        layui.x.sendAuthCode('#btnSendMsg4', lang('hqyzm'), true);

                    } else if (res.code == -1) {
                        layer.msg(res.msg);
                    }
                }
            });
        },
        send_sms: function (t0) {
            var that = this;
            $("#btnSendMsg,#btnSendMsg2").hide();
            $('#dvCode').html('');
            admin.req({
                type: "get",
                url: 'request/send_email?lx=' + t0,
                success: function (d) {
                    if (d.code > 0) {
                        $('#dvCode').html('<font color=#0000ff>' + d.msg + '</font>');
                        that.mmbh_timer();
                    } else {
                        $('#dvCode').html(d.msg);
                        $("#btnSendMsg,#btnSendMsg2").show();
                    }
                }
            });
        },
        //动态模板回调
        done: function (d) {
            layui.use(['form'], function () {
                layui.form.render();
            });
        },
        //刷新页面
        sx: function (time) {
            time = (time >= 0) ? time : 1000;
            setTimeout(function () {
                layui.index.render();
            }, time);
        },
        //查询详细信息
        getxx: function (ym) {
            layer.closeAll();
            layer.load(3);
            $.ajax({
                url: '/hao?ym=' + ym + '&fs=1',
                cache: false,
                success: function (d) {
                    layer.closeAll();
                    var zt = d.substr(0, 1);
                    d = d.substr(1);
                    getxx = layer.open({
                        type: 1,
                        skin: 'jm-class',
                        title: '<div id="xx_title">' + lang('tx') + '</div>',
                        shadeClose: true,
                        area: zt == '1' ? '1000px' : '',
                        content: d,
                        move: '#xx_title',
                        success: function (layero, index) {}
                    });
                },
                error: function () {
                    layer.closeAll();
                    layer.msg(lang('qqsb'));
                }
            });
            return false;
        },
        //特殊导出
        daochu_x: function (div) {
            if (div != "") {
                var E = [];
                $('.' + div + ' ul li .fl').each(function () {
                    E.push($(this).text());
                })
                E = E.reverse().join("<br>");
                if (E != "") {
                    var F = window.open("", "", "");
                    F.opener = null;
                    F.document.write(E);
                    F.document.close()
                } else {
                    layer.msg(lang('dcnrk'));
                }
            }
        },
        sortSelects: function (arr) {
            $('.dropdown').remove();
            arr.forEach(function (k, v) {
                var str = "str" + v;
                for (var i in k) {
                    str = '<div class="dropdown" id="' + k.id + '"><dl class="layui-nav-child layui-anim layui-anim-upbit"><dd data-value=""><a href="javascipt:void(0);">' + k.title + '</a></dd>';
                    k.list.forEach(function (k1) {
                        if (k1 instanceof Object) {
                            for (var j in k1) {
                                str += '<dd data-value=' + k1[j] + '><a href="javascipt:void(0);">' + j + '</a></dd>';
                            }
                        } else {
                            str += '<dd data-value=' + k1 + '><a href="javascipt:void(0);">' + k1 + '</a></dd>';
                        }
                    })
                    str += '</dl></div>';
                }
                $('body').append(str);
            })
        },
    };
    xjs.layset = function (set) {
        var layset = {
            icon: 7,
            title: lang('tx'),
            skin: 'jm-class'
        };
        if (Object.prototype.toString.call(set) === '[object Object]') {
            Object.assign(layset, set);
        }
        return layset;
    };
    layui.x = xjs;

    // 正则验证
    regex = {
        isPhone: function (value) {
            //验证手机号
            var tmp1 = /^1[34578][0-9]{9}$/;
            if (tmp1.test(value)) {
                return true;
            } else {
                return false;
            }
        }
    }

    // 倒计时
    countDown = function (obj) {
        var yzmBtn = $(obj);
        var count = 60;
        var resend = setInterval(function () {
            count--;
            if (count > 0) {
                yzmBtn.text(count + "秒后重发")
            } else {
                clearInterval(resend);
                yzmBtn.text("发送验证码").removeAttr('disabled');
                yzmBtn.removeClass('disabled-btn');
            }
        }, 1000)
        yzmBtn.attr('disabled', true).addClass('disabled-btn');
    }



    //对外暴露的接口
    exports('x', xjs);
});