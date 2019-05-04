$(function(){
    var height = window.screen.availHeight;
    var width = window.screen.availWidth;
});

//当用户框失去焦点时,判断输入的账号是否正确
function usenameBlur() {
    var phone = $("#username").val();
    if(phone==null) {
        alert("账号不能为空！");
    }else{
        phone = phone.trim();
        if(phone == ""){
            alert("账号不能为空!");
        }else {
            var params = '{"phone":"' + phone +'"}';
            $.ajax({
                url: "http://localhost:8080/zhixin/admin/accountExist.action",
                data: params,
                contentType : "application/json;charset=UTF-8",
                type : "post",
                success : function(data){
                    if(data==true) {
                        $("#password").removeAttr("readonly");
                    }else {
                        alert("账号不存在！");
                    }
                }
            });
        }
    }
}

//当密码框失去焦点时
function passwordBlur() {
    var password = $("#password").val();
    if(password == null) {
        alert("密码不能为空！");
    }else{
        password = password.trim();
        if(password=="") {
            alert("密码不能为空");
        }else {
            $("#submitBtn").attr("disabled", false);
        }
    }
}
