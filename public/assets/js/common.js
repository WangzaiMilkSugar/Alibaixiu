$(function () {
    $('#logout').on('click', function () {
        var isConfirm = confirm('您确定要退出吗？');
        if (isConfirm) {
            //用户点击确认按钮后
            $.ajax({
                type: "post",
                url: "/logout",
                success: function (response) {
                    location.href = 'login.html';
                },
                error: function () {
                    alert('退出失败');
                }

            });
        }
    });

})