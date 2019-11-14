$(function () {
    //当添加分类表单数据进行提交时
    $('#addCategory').on('submit', function () {
        //获取到表单要提交的信息
        var formData = $(this).serialize();
        //调用接口发送ajax请求
        $.ajax({
            type: "post",
            url: "/categories",
            data: formData,
            success: function (response) {
                //分类添加成功后重新加载页面
                location.reload();
            }
        });

        //阻止表单的默认提交行为
        return false;
    });

    //提交获取分类信息的ajax请求并显示分类列表
    $.ajax({
        type: "get",
        url: "/categories",
        success: function (response) {
            //查询成功后进行模版渲染，response返回的分类结果是数组类型的
            console.log(response);

            var html = template('categoryListTpl', {
                data: response
            });
            //将数据渲染到界面中
            $('#categoryBox').html(html);
        }
    });

})