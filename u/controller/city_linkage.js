// 地区联动
var defaults = {
    s1: 'province',
    s2: 'city',
    s3: 'area',
    v1: null,
    v2: null,
    v3: null,
    id: 'provform',
    json: null
};

var $form;
var form;
var $;
layui.define(['jquery', 'form'], function () {
    $ = layui.jquery;
    form = layui.form;
    $form = $('form');
    treeSelect(defaults);
});

function treeSelect(config) {
    if (config.json != null) {
        $.ajax({
            type: "GET",
            url: config.json,
            success: function (res) {
                threeSelectData = res;
            }
        });
    }

    $.each(threeSelectData, function (k, v) {
        appendOptionTo($('form#' + config.id).find('select#' + config.s1), k, v.val, config.v1);
    });
    form.render();
    cityEvent(config);
    areaEvent(config);
    form.on('select(' + config.s1 + ')', function (data) {
        $('#checkboxs').html("");
        cityEvent(data);
        if (!data.value) {
            $('form#' + config.id).find('select#' + config.s2).html("").html("<option value=''>请选择市</option>");
            $('form#' + config.id).find('select#' + config.s3).html("").html("<option value=''>请选择县区</option>");
            form.render();
            return false;
        }
        form.on('select(' + config.s2 + ')', function (data) {
            areaEvent(data);
        });
    });


    function cityEvent(data) {
        $('form#' + config.id).find('select#' + config.s2).html("").html("<option value=''>请选择市</option>");
        config.v1 = data.value ? data.value : config.v1;
        $.each(threeSelectData, function (k, v) {
            if (v.val == config.v1) {
                if (v.items) {
                    $.each(v.items, function (kt, vt) {
                        appendOptionTo($('form#' + config.id).find('select#' + config.s2), kt, vt.val, config.v2);
                    });
                }
            }
        });
        form.render();
        config.v2 = $('select#' + config.s2).val();
        areaEvent(config);
    }

    function areaEvent(data) {
        $('form#' + config.id).find('select#' + config.s3).html("").html("<option value=''>请选择县区</option>");
        config.v2 = data.value ? data.value : config.v2;
        $.each(threeSelectData, function (k, v) {
            if (v.items) {
                $.each(v.items, function (kt, vt) {
                    if (vt.val == config.v2) {
                        $.each(vt.items, function (ka, va) {
                            appendOptionTo($('form#' + config.id).find('select#' + config.s3), ka, va, config.v3);
                        });
                    }
                });
            }
        });
        form.render();
    }
}

function initPareaEvent(args) {
    $('select#' + args.sid).val(args.sval);
    cityInit(args.sval, args.cid)
    $('select#' + args.cid).val(args.cval);
    areaInit(args.cval, args.aid)
    $('select#' + args.aid).val(args.aval);
    form.render();
}

function cityInit(val, cid) {
    $('select#' + cid).html("").html("<option value=''>请选择市</option>");
    $.each(threeSelectData, function (k, v) {
        if (v.val == val) {
            if (v.items) {
                $.each(v.items, function (kt, vt) {
                    appendOptionTo($('select#' + cid), kt, vt.val);
                });
            }
        }
    });
    form.render();
}

function areaInit(val, cid) {
    $('select#' + cid).html("").html("<option value=''>请选择县区</option>");
    $.each(threeSelectData, function (k, v) {
        if (v.items) {
            $.each(v.items, function (kt, vt) {
                if (vt.val == val) {
                    $.each(vt.items, function (ka, va) {
                        appendOptionTo($('select#' + cid), ka, va);
                    });
                }
            });
        }
    });
    form.render();
}


function appendOptionTo($o, k, v, d) {
    var $opt = $("<option>").text(k).val(v);
    if (v == d) {
        $opt.attr("selected", "selected")
    }
    $opt.appendTo($o);
}