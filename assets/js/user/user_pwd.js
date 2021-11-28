$(function() {


    var layer = layui.layer;
    var form = layui.form;

    // 自定义判断规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }

    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
                method: 'POST',
                url: '/my/updatepwd',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg("重置密码失败!")
                    }
                    return layer.msg("重置密码成功!")
                },

            })
            // 重置表单
        $('.layui-form')[0].reset();
    })

})