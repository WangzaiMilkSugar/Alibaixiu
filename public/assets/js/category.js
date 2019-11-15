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
            // console.log(response);

            var html = template('categoryListTpl', {
                data: response
            });
            //将数据渲染到界面中
            $('#categoryBox').html(html);
        }
    });

    //为编辑按钮添加点击事件
    $('#categoryBox').on('click', '.edit', function () {
        //获取要修改的分类数据的id
        var id = $(this).attr('data-id');
        //根据id获取分类的详细信息
        $.ajax({
            type: "get",
            url: "/categories/" + id,
            success: function (response) {
                var html = template('modifyCategoryTpl', response);
                $('#formBox').html(html);
            }
        });
    });

    //为修改分类的表单添加提交事件
    $('#formBox').on('submit', '#modifyCategory', function () {
        //获取管理员在表单中提交的内容
        var forData = $(this).serialize();
        //获取到表单携带的id属性
        var id = $(this).attr('data-id');
        //发送请求，根据id修改分类
        $.ajax({
            type: "put",
            url: "/categories/" + id,
            data: forData,
            success: function (response) {
                //将当前页面重新加载
                location.reload();
            }
        });
        //阻止表单的默认提交行为
        return false;
    });

    //为删除分类按钮添加点击事件
    $('#categoryBox').on('click', '.delete', function () {
        //获取要删除分类的id 通过按钮绑定的data-id属性值
        var id = $(this).attr('data-id');
        //调用封装的删除函数进行删除
        deleteByid('/categories/', id);
    });

    function deleteByid(url, id) {
        if (confirm('您确认要删除所选中的分类吗')) {

            //向服务器发送请求，通过id删除分类
            $.ajax({
                type: "delete",
                url: url + id,
                success: function (response) {
                    //删除成功后重新加载当前页面
                    location.reload();
                }
            });
        }
    };



})