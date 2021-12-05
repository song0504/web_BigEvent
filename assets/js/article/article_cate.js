$(function() {

    var layer = layui.layer;
    // 获取文章列表
    initArtCateList();
    // 获取文章列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                console.log(res);
                var htmlStr = template('tpl-table', res);
                $("tbody").html(htmlStr);
            }
        })
    }

    // 给添加类别按钮添加点击事件
    var indexAdd = null;
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1, //指定弹出层的类型
            area: ['500px', '250px'], //指定弹出层的宽高
            title: '添加文章分类', //弹出层的标题
            content: $('#dialog-add').html() //弹出层的内容
        })
    })

    // 添加文章列表
    // 利用body进行事件委托对表单添加提交事件
    $('body').on('submit', ' #form-add', function(e) {
        e.preventDefault();
        console.log(1);
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败！')
                }
                // 重新渲染列表
                initArtCateList();
                layer.msg('新增文章分类成功！');
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)

            }
        })

    })
})