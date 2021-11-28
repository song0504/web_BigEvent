$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    // 调用获取信息函数
    initUserInfo()

    // 获取用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('获取用户信息失败!')
                }

                // 调用 form.val() 方法为表单赋值：
                form.val('formUserInfo', res.data);
                // console.log($('.layui-form [name=id]').val());
            }
        })
    }

    // 实现表单重置效果
    $('#resform').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    })

    // 发起请求更新用户的信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功!')
            }
        })

        // < iframe > 中的子页面， 如果想要调用父页面中的方法， 使用 window.parent 即可。
        // 在子页面调用父页面的方法
        window.parent.getUserInfo();
    })
})