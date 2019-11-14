//当修改密码的表单进行提交时
$(function () {
    $('#modifyForm').on('submit', function () {
        //获取表单提交的内容
        var formData = $(this).serialize();
        //调用接口，进行密码修改，提交ajax请求
        $.ajax({
            type: "put",
            url: "/users/password",
            data: formData,
            success: function (response) {
                //修改成功后跳转到登录页面用新密码登录
                location.href = 'admin/login.html';
            }
        });
        //阻止默认提交行为
        return false;
    })
})