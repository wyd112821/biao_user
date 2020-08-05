/**

 @Name：全局配置
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL（layui付费产品协议）

 */
// 获取cookie
function getCookie(name) {
    var nameeq = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length)
        }
        if (c.indexOf(nameeq) == 0) {
            return c.substring(nameeq.length, c.length)
        }
    }
    return null
}
function in_array(search,array){
    for(var i in array){
        if(array[i]==search){
            return true;
        }
    }
    return false;
}
var langc='zhcn'
var langlist={};
function lang(name) {
    return langlist[name];
}
layui.define(['laytpl', 'layer', 'element', 'util'], function (exports) {
    exports('setter', {
        container: 'LAY_app' //容器ID
        , base: layui.cache.base //记录layuiAdmin文件夹所在路径
        , views: './u/user/' //视图所在目录
        , entry: 'index' //默认视图文件名
        , engine: '.html' //视图文件后缀名
        , pageTabs: false //是否开启页面选项卡功能。单页版不推荐开启
        , token:csrf_token
        // , host: window.location.protocol + '//' + window.location.host
        , host: "http://47.241.145.90:8222"
        , name: '管理后台'
        , tableName: 'jmAdmin' //本地存储表名
        , MOD_NAME: 'admin' //模块事件名

        , debug: true //是否开启调试模式。如开启，接口异常时会抛出异常 URL 等信息

        , interceptor: false //是否开启未登入拦截

        //自定义请求字段
        , request: {
            tokenName: true //自动携带 token 的字段名。可设置 false 不携带。
        }

        //自定义响应字段
        , response: {
            statusName: 'code' //数据状态的字段名称
            , statusCode: {
                ok: 1 //数据状态一切正常的状态码
                , logout: -1001 //登录状态失效的状态码
                , bh_code: -100 // 操作保护未解除状态
                , bh_wsz: -101 // 操作保护未设置状态
                , update_token: -104 // 登录超时刷新token
                , update_yzm: -105 // 验证码错误,刷新验证码
                , noqx: -1002 // 无权限
            }
            , msgName: 'msg' //状态信息的字段名称
            , dataName: 'data' //数据详情的字段名称
        }

        //独立页面路由，可随意添加（无需写参数）
        , indPage: [
            '/user/login' //登入页
            , '/user/reg' //注册页
            , '/user/forget' //找回密码
            , '/template/tips/test' //独立页的一个测试 demo
        ]
        ,extend: [
            'echarts', //echarts 核心包
            'echartsTheme' //echarts 主题
        ]
        //主题配置
        , theme: {
            //内置主题配色方案
            color: [{
                main: '#001529' //主题色
                , selected: '#1890ff' //选中色
            }]

            //初始的颜色索引，对应上面的配色方案数组索引
            //如果本地已经有主题色记录，则以本地记录为优先，除非请求本地数据（localStorage）
            , initColorIndex: 1
        }
    });
});
