$(function() {

    // 点击“去注册” 切换div
    $("#link_reg").on('click', function() {
        $('.login_box').hide();
        $('.reg_box').show();
    })
    $("#link_login").on('click', function() {
        $('.login_box').show();
        $('.reg_box').hide();
    })

    // 从LayUI中获取form
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg_box [name=password]').val();
            if (value !== pwd) {
                return "两次密码不一致";
            }
        }
    })

    // 调用接口发起post注册请求
    // 监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
            // 1. 阻止默认的提交行为
            e.preventDefault();
            // 2.将用户名和密码保存到data中
            var data = {
                    username: $('#form_reg [name=username]').val(),
                    password: $('#form_reg [name=password]').val(),
                }
                //3.发起post请求
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！');
                $('#link_login').click()
            })
        })
        // 调用接口发起post登录请求
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        // var data = {
        //     username: $('#form_login [name=username]').val(),
        //     password: $('#form_login [name=password]').val(),
        // };
        var data = $(this).serialize();
        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('登录成功！');
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token);
            // 跳转页面到首页
            location.href = '/index2.0.html'
        })
    })
})