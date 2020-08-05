layui.define(function (exports) {
    $ = layui.jquery
    var x = layui.x;
    //顶部导航
    function navline() {
        if ($('.common-topbar-nav-list li a.nav-on').length > 0) {
            var ton = $('.common-topbar-nav-list .nav-on').parent('li');
            var left = ton.position().left + 20;
            $('.header-nav-hover-line').css('left', left + 'px').css('width', parseInt(ton.width()) + 'px').show();
        } else {
            $('.header-nav-hover-line').hide();
        }
    }


    function carnum() {
        var carnum = parseFloat($('.nav_car .car_num').text())
        if (carnum >= 99) {
            $('.nav_car .car_num').text('99+')
        }
    };

//.替换为/
    function thym(ym) {
        return ym.replace(/\./g, "_").toLowerCase();
    }

//替换.为_
    function thym2(ym) {
        return ym.replace(/\./g, "_").toLowerCase();
    }
    $(".layui-side").on('mouseenter', ".switch-zw", function () {
        $(this).css({
            height: 78,
            color: '#fff'
        })
    }).on('mouseleave', ".switch-zw", function () {
        $(this).css({
            height: 24,
            color: '#A6A7AC'
        })
    })
    navline();
    var qcloud = {};
    $('[data-nav]').hover(function (event) {
        var xleft = $('.layui-layout-left').position().left;
        var _index = $(this).attr("data-nav");
        var left = xleft + 37;
        if (_index == "nav_sy") {
            left = xleft + 14;
        }
        console.log(_index);
        if (_index == 'nav_ykj' || _index == 'nav_sy' || _index == 'nav_ymqz' || _index == 'nav_ymjg' || _index == 'nav_ykj1') {
            $(this).find('.ts_box').css('display', 'block').animate({
                top: '60px',
                opacity: '1'
            }, 100);
        }
        var navt = $('.common-topbar-nav-list li[data-nav=' + _index + ']');
        $('.header-nav-hover-line').show().animate({
            left: navt.position().left + left + "px",
            width: parseInt(navt.width()) + "px"
        }, 0);
    }, function () {
        navline();
        var _index = $(this).attr("data-nav");
        if (_index == 'nav_ykj' || _index == 'nav_sy' || _index == 'nav_ymqz' || _index == 'nav_ymjg' || _index == 'nav_ykj1') {
            $(this).find('.ts_box').animate({
                top: '120px',
                opacity: '0'
            }, 100).css('display', 'none');
        }
    });

    //获取后台数据
    $(".layui-search span").mouseenter(function () {
        $(".search-list").show()
    }).mouseleave(function () {
        $(".search-list").hide()
    })


    $('body').off('mouseenter', '#userInfo').on('mouseenter', '#userInfo', function () {
        $("#user-info").fadeIn('fast');
        layui.admin.req({
            url: '/user_zh/get_baseinfo',
            dataType: 'json',
            type: 'post',
            success: function (res) {
                if (res.code === 1) {
                    $(".nav-qian").text("$" + res.data.qian)
                    $(".nav-dqian").text("$" + res.data.dqian)
                    $(".nav-zqian").text("$" + res.data.zqian)
                }
            }
        });

    }).off('mouseleave', '#userInfo').on('mouseleave', '#userInfo', function () {
        $("#user-info").hide()
    });

    $('.layui-header input').keypress(function (event) {
        if (event.keyCode == 13) {
            $('.layui-header .layui-search em').click();
            return false;
        }
    });

    $(".layui-header .layui-search").click(function (event) {
        event = event || window.event;
        event.stopPropagation();
    })

    exports('layout', {});
})
