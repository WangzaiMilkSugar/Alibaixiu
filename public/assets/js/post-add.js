$(function () {
    //请求获取文章分类并加载到下拉菜单中
    $.ajax({
        type: "get",
        url: "/categories",
        success: function (response) {
            //返回的是数组形式的分类信息,将模版和数据进行拼接
            var html = template('categoryTpl', {
                data: response
            });
            //渲染模版数据到下拉菜单中
            $('#category').html(html);

        }
    });

    //完善页面中选择图片功能完成图片上传
    $('#feature').on('change', function () {
        //从返回的文件集合中读取文件信息
        var file = this.files[0];
        //创建FormData对象进行图片上传
        var formData = new FormData();
        formData.append('cover', file);
        $.ajax({
            type: "post",
            url: "/upload",
            data: formData,
            //告诉$.ajax()方法不要解析请求参数
            processData: false,
            //不设置请求参数的格式
            contentType: false,
            success: function (response) {
                //将上传图片的地址保存在隐藏域的value值中
                $('#thumbnail').val(response[0].cover);
                //在页面中预览选中的图片
                $('#cover').attr('src', response[0].cover).show();
            }
        })
    });

    //点击保存提交创建文章的表单时
    $('#addForm').on('submit', function () {
        //获取填写的所有表单内容
        var formData = $(this).serialize();
        //调用接口新增文章
        $.ajax({
            type: "post",
            url: "/posts",
            data: formData,
            success: function (response) {
                //文章创建成功后就跳转到文化脏列表页面
                location.href = '/admin/posts.html';
            }
        });

        //阻止表单的默认提交行为
        return false;
    })
})