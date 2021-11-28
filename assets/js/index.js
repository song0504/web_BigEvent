$(function() {
    var layer = layui.layer;
    getUserInfo();
    console.log(localStorage.getItem('token'));
    var layer = layui.layer;
    // 点击退出按钮实现退出登录
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function(index) {
                // 清空本地存储的的token
                localStorage.removeItem('token');
                // 页面跳转到登录页
                location.href = '/login.html';

                // 关闭弹出层
                layer.close(index)

            })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户的基本信息失败!')
            }
            // 渲染用户头像
            renderAvatar(res.data)
        },
        // 控制用户的`访问权限
        // 不论成功还是失败，最终都会调用 complete 回调函数
        complete: function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                    // 2. 强制跳转到登录页面
                location.href = '/login.html'
            }
        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    // 如果用户有昵称,则渲染昵称,如果没有就渲染用户名
    var name = user.nickname || user.username;
    // 2. 设置欢迎的文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 3.2 渲染文本头像
        // 用户名第一个字符,并转化成大写
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();
    }
}