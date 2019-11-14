$(function () {
    //进行新增用户时点击提交按钮后
    $('#userForm').on('submit', function () {
        //获取到用户填写提交的信息

        var formData = $(this).serialize();
        //向服务器端发送新增用户请求
        $.ajax({
            type: "post",
            url: "/users",
            data: formData,
            success: function () {
                //重载该页面
                location.reload();
            },
            error: function () {
                alert('用户添加失败');
            }
        });
        //阻止表单的默认提交行为
        return false;
    });
    //图片文件上传,当用户选择文件时
    $('#modifyBox').on('change', '#avatar', function () {
        //当前选择的文件的信息  this.files[0]
        //创建formData对象上传二进制文件
        var formData = new FormData();
        formData.append('avatar', this.files[0]);
        //向服务器端提交ajax请求
        $.ajax({


            type: "post",
            url: "/upload",
            data: formData,
            //告诉$.ajax()方法不要解析请求参数
            processData: false,
            //不设置请求参数的格式
            contentType: false,
            success: function (response) {
                //获取到的response是一个avatar属性的的数组
                //实现上传图片后预览功能
                $('#preview').attr('src', response[0].avatar);
                //把图片地址放进隐藏域提交
                $('#hiddenAvatar').val(response[0].avatar);
            }
        });
    })
    //向服务器发送请求，获取用户信息
    $.ajax({
        type: "get",
        url: "/users",
        success: function (response) {
            var html = template('userTpl', {
                data: response
            });
            $('#userBox').html(html);
        }
    });

    //通过事件委托的方式添加编辑按钮的点击事件
    $('#userBox').on('click', '.edit', function () {
        //获取要编辑用户的 id
        var id = $(this).attr('data-id');
        //根据 id 发送请求，查询用户信息
        $.ajax({
            type: "get",
            url: "/users/" + id,
            success: function (response) {
                // console.log(response);
                //将返回的对象形式的用户信息和修改用户的模版进行拼接
                var html = template('modifyTpl', response);
                $('#modifyBox').html(html);
            }
        });
    });

    //为修改表单添加表单提交事件
    $('#modifyBox').on('submit', '#modifyForm', function () {
        //获取修改后要提交的表单内容
        var formData = $(this).serialize();
        //获取要修改用户的 id ,在modifyform表单中的自定义属性data-id的值
        var id = $(this).attr('data-id');
        //发送请求根据 id 修改用户
        $.ajax({
            type: "put",
            url: "/users/" + id,
            data: formData,
            success: function (response) {
                //用户信息修改成功后重新加载当前用户界面
                location.reload();
            }
        });
        //阻止表单默认提交行为
        return false;
    })

    //点击删除按钮删除单个用户时
    $('#userBox').on('click', '.delete', function () {
        //获取删除按钮携带的自定义id属性
        var id = $(this).attr('data-id');
        //弹出确认框确认删除
        if (confirm('您确认要删除该用户吗')) {
            //发送删除用户的ajax请求
            $.ajax({
                type: "delete",
                url: "/users/" + id,
                success: function (response) {
                    //进入success函数表示已经删除成功，重新加载当前页面
                    location.reload();
                }
            });
        }

    })

    var deleteMany = $('#deleteMany');
    //复选框状态 当全选按钮的状态发生改变时
    $('#selectAll').on('change', function () {
        //获取当前全选按钮的状态
        var status = $(this).prop('checked');
        //全选按钮被选中时，批量删除按钮需要显示
        if (status) {
            deleteMany.show();
        } else {
            deleteMany.hide();
        }
        //获取到用户列表前的复选框
        //将全选按钮和用户前的复选框状态同步
        $('#userBox').find('input').prop('checked', status);
    });

    //为用户复选框状态改变添加事件委托
    $('#userBox').on('change', '.userStatus', function () {
        //获取并过滤用户复选框选中数量和总数比较
        var inputs = $('#userBox').find('input'); //获取到当前tbody下的所有复选框
        //筛选选中的复选框数量并改变全选按钮状态
        $('#selectAll').prop('checked', inputs.length == inputs.filter(':checked').length);
        //如果选中的复选框数量大于0 ，说明有复选框被选中
        if (inputs.filter(':checked').length > 0) {
            //批量删除按钮显示
            deleteMany.show();
        } else {
            //批量删除按钮隐藏
            deleteMany.hide();
        }
    });

    //当点击批量删除按钮时,添加点击事件
    deleteMany.on('click', function () {
        //定义一个空数组用来存储要删除的用户的 id
        var ids = [];
        //获取选中的要批量删除的用户
        var checkedUser = $('#userBox').find('input').filter(':checked');
        //循环复选框，从复选框元素的身上获取自定义的data-id属性值
        checkedUser.each(function (index, element) {
            ids.push($(element).attr('data-id'));
        });
        if (confirm('您确认要批量删除这些用户吗')) {
            $.ajax({
                type: "delete",
                url: "/users/" + ids.join('-'),
                success: function (response) {
                    location.reload();
                }
            });
        }
    })
})