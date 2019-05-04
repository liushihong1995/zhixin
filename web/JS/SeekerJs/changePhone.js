$(function(){
    //初始化旧电话号。
    initPhone();
});

/* 初始化电话号码 */
function initPhone() {
    var identity = $("#identity").val();
    var _uid;
    if(identity == "seeker") {
        _uid = $("#uid").val().trim();
    } else {
        _uid = $("#bossId").val().trim();
    }


    var params = {
        "uid": _uid
    };
    if(identity == "seeker") {
        $.ajax({
            url: "http://localhost:8080/zhixin/seeker/getSeeker.action",
            data: JSON.stringify(params),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                $("#oldPhoneInput").val(data.phone);
            }
        });
    } else {
        $.ajax({
            url: "http://localhost:8080/zhixin/boss/getBossBasic.action",
            data: String(_uid),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                $("#oldPhoneInput").val(data.phone);
            }
        });
    }
}

/**
 * 检测新的电话号码
 */
function checkNewPhone() {
    var newPhoneNumber = $("#newPhoneInput").val().trim();
    if(newPhoneNumber==null || newPhoneNumber==""){
        alert("新手机号不能为空");
        return false;
    }
    if(newPhoneNumber.length != 11) {
        alert("电话号码应是11位数字");
        return false;
    }
    var flag = true;
    for(var i = 0; i < newPhoneNumber.length; i++) {
        if(newPhoneNumber[i]<'0' && newPhoneNumber[i]<'9') {
            flag = false;
        }
    }
    if(flag == false) {
        alert("手机号应为11位数字");
    } else {
        $("#getCode").removeAttr("disabled");
    }
    return flag;
}

//获取短信验证码
function getSMSCode(){
    $("#dynamicCode").removeAttr("disabled");
    var newPhone = $("#newPhoneInput").val().trim();
    var oldPhone = $("#oldPhoneInput").val().trim();
    var params = {
        phone : newPhone
    };
    $.ajax({
        type:"post",
        url: "http://localhost:8080/zhixin/sendMessage/sendToSeeker.action",
        data: JSON.stringify(params),
        contentType: "application/json",
        async: false,
        success : function (data) {
            if(data==false) {
                alert("短信动态码发送失败，请稍后尝试！");
            }else {
                countDown(60);
            }
        }
    });
}

/**
 * 清空内容
 */
function clearInfor() {
    $("#newPhoneInput").val("");
    $("#dynamicCode").attr("disabled","false");
    $("#getCode").attr("disabled","false");
    $("#clearInfor").attr("disabled","false");
    $("#submitChange").attr("disabled","false");
}


//倒计时功能
function countDown(restSecond) {
    var obj = $("#getCode");
    if(restSecond==0) {
        obj.removeAttr("disabled");
        obj.html("获取动态码");
        restSecond = 60;
        $("#dynamicCode").val("");                   //清空
        $("#dynamicCode").attr("disabled","false");  //文本框变成不可编辑
        return;
    }else {
        obj.attr("disabled","false");
        obj.html("已发送(" + restSecond + "s)");
        restSecond--;
    }
    setTimeout(function(){
        countDown(restSecond)},1000);
}

//检测动态码
function checkCode() {
    if(checkDynamicCode()) {
        $("#clearInfor").removeAttr("disabled");
        $("#submitChange").removeAttr("disabled");
    }
}

/**
 * 检测短信动态码是否合法
 * @returns {boolean}
 */
function checkDynamicCode() {
    var code = $("#dynamicCode").val().trim();
    if(code==null || code=="") {
        alert("短信动态码不能为空");
        return false;
    }
    if(code.length != 6) {
        alert("短信动态码是6位数字");
        return false;
    }
    for(var i = 0; i < code.length; i++) {
        if(code[i]<'0' || code[i]>'9') {
            alert("动态码错误，存在非数字字符");
            return false;
        }
    }
    return true;
}

/**
 * 更新手机号码
 */
function submitInfor() {
    var _uid = $("#uid").val().trim();
    var _code = $("#dynamicCode").val().trim();
    var _oldPhone = $("#oldPhoneInput").val().trim();
    var _newPhone = $("#newPhoneInput").val().trim();
    var _identity = $("#identity").val();
    if(_identity=="seeker") {
        _uid = $("#uid").val().trim();
    } else {
        _uid = $("#bossId").val().trim();
    }
    var params = {
        code: _code,
        oldPhone: _oldPhone,
        newPhone: _newPhone,
        id: _uid,
        identity: _identity
    };
    $.ajax({
        type:"post",
        url: "http://localhost:8080/zhixin//seeker/updatePhone.action",
        data: JSON.stringify(params),
        contentType: "application/json",
        async: false,
        success: function (data) {
            if(data==true) {
                alert("修改手机号码成功");
                $("#oldPhoneInput").val(_newPhone);
                clearInfor();
            } else {
                alert("修改手机号失败，请稍后尝试。");
                clearInfor();
                $("#dynamicCode").val("");
            }
        }
    });
}