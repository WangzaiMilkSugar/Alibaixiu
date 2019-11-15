$(function () {
    //页面加载时发送ajax请求获取文章列表
    $.ajax({
        type: "get",
        url: "/posts",
        success: function (response) {
            //将封装的日期方法导入模版作为变量
            template.defaults.imports.formateDate = formateDate;
            //将数据和模版进行拼接
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            //调用template方法渲染分页模版
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });

    //处理日期格式的函数
    function formateDate(date) {
        //将日期的字符串转换为日期对象
        date = new Date(date);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    };

    //封装分页函数
    function changePage(page) {
        //向服务器端发送请求，获取文章列表数据
        $.ajax({
            type: "get",
            url: "/posts",
            data: {
                page: page
            },
            success: function (response) {
                //将封装的日期方法导入模版作为变量
                template.defaults.imports.formateDate = formateDate;
                //将数据和模版进行拼接
                var html = template('postsTpl', response);
                $('#postsBox').html(html);
                //调用template方法渲染分页模版
                var page = template('pageTpl', response);
                $('#page').html(page);
            }
        });
    };

    //筛选模块,通过ajax请求获取文章类别数据
    $.ajax({
        type: "get",
        url: "/categories",
        success: function (response) {
            var html = template('categoryTpl', {
                data: response
            });
            $('#categoryBox').html(html);
        }
    });
    //当用户进行文化列表筛选时
    $('#filterForm').on('submit', function () {
        //获取到选择的筛选条件
        var formData = $(this).serialize();
        //向服务器发送请求，根据条件查询文章列表信息
        $.ajax({
            type: "get",
            url: "/posts",
            data: formData,
            success: function (response) {
                //将数据和模版进行拼接
                var html = template('postsTpl', response);
                $('#postsBox').html(html);
                //调用template方法渲染分页模版
                var page = template('pageTpl', response);
                $('#page').html(page);
            }
        });
        //阻止表单默认提交行为
        return false;
    })
})