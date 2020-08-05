layui.define(["form", "jquery"], function (exports) {
    var form = layui.form,
        $ = layui.jquery,
        Address = function () {
        };
    var $data = [];
    var areaCodeList = [];
    var a_cengji = "3";
    var max_code = 0;

    function pad(str) {
        var str1 = '';
        var _length = str.length
        while (_length <= String(max_code).length - 1) {
            str1 += '　';
            _length++;
        }
        return '+' + str + str1;
    }

    Address.prototype.countries = function () {
        var proHtml = '',
            that = this,
            x = ""
        str_area = "", max_lisr = [];
        var $src = '/view/f/u/json/address_zhcn.json?v=';
        $.get($src, function (data) {
            $data = data;
            proHtml = '<option c="" value="" class="mr">' + lang('op_guojia') + '</option>';
            for (var i = 0; i < data.length; i++) {
                x = typeof(data[i].x) == "undefined" ? "3" : data[i].x;
                proHtml += '<option p="' + data[i].p + '" c="' + data[i].c + '" x="' + x + '" value="' + data[i].c + '">' + data[i].v + '</option>';
                max_lisr.push(data[i].p);
                areaCodeList.push({
                    p: data[i].p,
                    v: data[i].v,
                    c: data[i].c
                });
            }
            max_code = Math.max.apply(null, max_lisr);
            areaCodeList.forEach(function (item) {
                str_area += '<option value="' + item.p + '">' + pad(item.p) + "　　　"  + item.v.toLocaleUpperCase() + '</option>'
            })
            $("#gjqh").append(str_area);
            // if(langset == 'zhcn'){
            //     $("#gjqh").val(86);
            // }

            $("select[name=guojia]").append(proHtml);
            form.render();
            $(".province,.city,.area").html('');

            form.on('select(country)', function () {
                $(".province,.city,.area").html('');
                if ($(this).val() == $(this).find('option:first').val()) {
                    $(this).removeClass('unselect');
                } else {
                    $(this).addClass('unselect');
                }
                var gj = $("select[name=guojia] option:selected");
                $('#gjqh').val(gj.attr('p'));
                form.render();
                var c = gj.attr('c');
                a_cengji = gj.attr('x');
                var sheng = data.filter(function (a) {
                    return a.c == c;
                });
                that.provinces(sheng[0].s);
            })
        })
    }

//加载省
    Address.prototype.provinces = function (sheng) {
        var that = this;
        if ($.isArray(sheng)) {
            var s_html = '<option c="" value="" class="mr">' + lang('op_sheng') + '</option>';
            for (var i = 0; i < sheng.length; i++) {
                s_html += '<option c="' + sheng[i].c + '" value="' + sheng[i].n + '">' + sheng[i].v + '</option>';
            }
            $('.province').html('<select name="province"  id="province" class="ld" lay-filter="province" lay-search>' + s_html + '</select>');
            form.render();
            $(".city,.area").html('');
            form.on('select(province)', function () {
                $(".city,.area").html('');
                if ($(this).val() == $(this).find('option:first').val()) {
                    $(this).removeClass('unselect');
                } else {
                    $(this).addClass('unselect');
                }
                var c = $("select[name=province] option:selected").attr('c');
                var shi = sheng.filter(function (a) {
                    return a.c == c;
                });

                if (a_cengji == "2") {

                } else {
                    that.citys(shi[0].s);
                }
            });
        } else {
            $('.province').html('<input style="width: 120px" name="province"  placeholder="' + lang('in_sheng') + '" id="province" class="layui-input ld input-box" />');
            if (a_cengji == "3") {
                $('.city').html('<input style="width: 120px" name="city"   placeholder="' + lang('in_shi') + '" id="city" class="layui-input ld input-box" />');
            }
        }
        
    }

    Address.prototype.citys = function (shi) {
        var that = this;
        if ($.isArray(shi)) {
            var s_html = '<option c="" value="" class="mr">' + lang('op_shi') + '</option>';
            for (var i = 0; i < shi.length; i++) {
                s_html += '<option c="' + shi[i].c + '" value="' + shi[i].n + '">' + shi[i].v + '</option>';
            }
            $('.city').html('<select name="city" id="city"  class="ld" lay-filter="city" lay-search>' + s_html + '</select>');

            form.render();

            form.on('select(city)', function () {
                if ($(this).val() == $(this).find('option:first').val()) {
                    $(this).removeClass('unselect');
                } else {
                    $(this).addClass('unselect');
                }
            });
        } else {
            $('.city').html('<input style="width: 120px" name="city" placeholder="' + lang('in_shi') + '" id="city" class="layui-input ld input-box" />');
        }
    }
    var address = new Address();
    exports("address", function () {
        address.countries();
    });
})