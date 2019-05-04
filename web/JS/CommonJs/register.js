function phoneBlur(){
    var phone = $("#phone").val().trim();
    if(phone==null || phone=="") {
        alert("手机号码不能为空");
        return false;
    }
    if(phone.length != 11) {
        alert("手机号为11位数字");
        return false;
    }
    for(var i = 0; i < phone.length; i++) {
        if(phone[i]>='0' && phone[i]<='9') {
            continue;
        }else {
            alert("手机号为11位数字");
            return false;
        }
    }
    //验证手机号是否已经被注册。
    var identity = $("#chose_identity").find("option:selected").text();
    var myUrl = "";
    if(identity=="我要找工作") {
        myUrl = "http://localhost:8080/zhixin/jobSeeker/accountExist.action";
    }else {
        myUrl = "http://localhost:8080/zhixin/boss/accountExist.action";
    }
    var params = '{"phone":"' + phone + '"}';
    $.ajax({
        url : myUrl,
        data: params,
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data==true) {
                $("#getCode").removeAttr("disabled");
                $("#error_hint").css("display","none");
                $("#phone").attr("readonly","true");
            }else {
                $("#error_hint").css("display","inline");
            }
        }
    });
}

//倒计时功能
function countDown(restSecond) {
    var obj = $("#getCode");
    if(restSecond==0) {
        obj.removeAttr("disabled");
        obj.html("获取动态码");
        restSecond = 60;
        $("#code").val("");                   //清空
        $("#code").attr("disabled","false");  //文本框变成不可编辑
        return;
    }else {
        obj.attr("disabled","false");
        obj.html("已发送(" + restSecond + "s)");
        restSecond--;
    }
    setTimeout(function(){
        countDown(restSecond)},1000);
}

//点击获取动态码按钮
function getCodeClick() {
    var phone = $("#phone").val().trim();
    var  params = '{"phone":"' + phone + '"}';
    $.ajax({
       url: "http://localhost:8080/zhixin/sendMessage/sendToSeeker.action",
        data: params,
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data==true) {
                countDown(60);
                $("#code").removeAttr("disabled");
            }else {
                alert("发送动态码失败，请稍后");
            }
        }
    });
}

//验证短信验证码是否正确
function codeBlur(){
    var code = $("#code").val().trim();
    if(code==null || code=="") {
        alert("验证码不能为空");
        return false;
    }
    if(code.length != 6) {
        alert("验证码错误");
        return false;
    }
    for(var i = 0; i < code.length; i++) {
        if(code[i]>='0' && code[i]<='9') {
            continue;
        }else {
            alert("验证码错误!");
            return false;
        }
    }
    var flag = true;
    var phone = $("#phone").val().trim();
    var params = '{"phone":"' + phone + '","code":"' + code + '"}';
    $.ajax({
        url: "http://localhost:8080/zhixin/userRegister/checkCode.action",
        data: params,
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if (data == true) {
                $("#submit_infor").removeAttr("disabled");
                $("#code").attr("readonly","true");
            } else {
                alert("验证码错误");
                flag = false;
            }
        }
    });
    return flag;
}

function submitClick(){
    var identity = $("#chose_identity").find("option:selected").text();
    var _phone = $("#phone").val().trim();
    if(identity == "我要找工作") {
        _url = "http://localhost:8080/zhixin/jobSeeker/register.action";
    }else {
        _url = "http://localhost:8080/zhixin/boss/register.action";
    }
    var params = {
        phone: _phone
    }
    $.ajax({
        url: _url,
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success:function (data) {
            if(data==true) {
                alert("注册成功");
                window.location = "http://localhost:8080/zhixin/Common/login.jsp";
            }else {
                alert("注册失败，请稍后尝试");
            }
        }
    });
    
}

function changeIdentity(){
    $("#phone").val("");
    $("#phone").removeAttr("readonly");
    $("#code").attr("disabled","false");
    $("#getCode").attr("disabled","false");
    $("#submit_infor").attr("disabled","false");
}

