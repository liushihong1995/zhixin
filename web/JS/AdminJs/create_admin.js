
function textClear() {
    $("#id").val("");
    $("#idSign").css("display","none");
    $("#idSign").removeClass("glyphicon glyphicon-remove");
    $("#idSign").removeClass("glyphicon glyphicon-ok");
    $("#password").val("");
    $("#pwdSign").css("display","none");
    $("#pwdSign").removeClass("glyphicon glyphicon-remove");
    $("#pwdSign").removeClass("glyphicon glyphicon-ok");
    $("#password").css("margin-left","148px");
    $("#name").val("");
    $("#nameSign").css("display","none");
    $("#nameSign").removeClass("glyphicon glyphicon-remove");
    $("#nameSign").removeClass("glyphicon glyphicon-ok");
    $("#cardNum").val("");
    $("#cardNum").css("margin-left","148px");
    $("#cardSign").css("display","none");
    $("#cardSign").removeClass("glyphicon glyphicon-remove");
    $("#cardSign").removeClass("glyphicon glyphicon-ok");
    $("#department").val("");
    $("#departSign").css("display","none");
    $("#departSign").removeClass("glyphicon glyphicon-remove");
    $("#departSign").removeClass("glyphicon glyphicon-ok");
    $("#email").val("");
    $("#emailSign").css("display","none");
    $("#emailSign").removeClass("glyphicon glyphicon-remove");
    $("#emailSign").removeClass("glyphicon glyphicon-ok");
    $("#email").css("margin-left","148px");
}


function phoneBlur() {
    var phone = $("#phone").val();
    var num = 0;
    if(phone==null) {
        num = 1;
    }else {
        phone = phone.trim();
        if(phone=="") {
            num = 1;
        }else {
            for(var i = 0; i < phone.length; i++) {
                if(phone[i]>='0' && phone[i]<='9') {
                    continue;
                }else {
                    num = 2;
                    break;
                }
            }
            if(phone.length != 11) {
                num = 2;
            }
        }
    }

    if(num==0) {
        var param = '{"phone":"' + phone + '"}';
        $.ajax({
            url: "http://localhost:8080/zhixin/admin/accountExist.action",
            data: param,
            contentType: "application/json;charset=UTF-8",
            type: "post",
            async: false,   //设置为同步请求，使浏览器锁死。
            success: function(data) {
                if(data==true) {
                    num = 3;
                }
            }
        });
    }

    //正确数据
    if(num==0) {
        $("#idSign").removeClass("glyphicon glyphicon-remove");
        $("#idSign").addClass("glyphicon glyphicon-ok");
        $("#idSign").css("display", "inline");
        $("#id").css("border-color","#5bc0de");
        $("#id").css("border-weight","3px");
        var pwd = phone.substring(5,11);
        $("#password").val(pwd);
        $("#password").css("border-color","#5bc0de");
        $("#password").css("border-weight","3px");
        $("#password").css("margin-left","125px");
        $("#pwdSign").addClass("glyphicon glyphicon-ok");
        $("#pwdSign").css("display","inline");
    }else {
        $("#idSign").removeClass("glyphicon glyphicon-ok");
        $("#idSign").addClass("glyphicon glyphicon-remove");
        $("#idSign").css("display","inline");
        $("#id").css("border-color","#d9534f");
        $("#id").css("border-weight","3px");
        $("#pwdSign").removeClass("glyphicon glyphicon-ok");
        $("#password").css("margin-left","128px");
        $("#password").val("");
        if(num==1) {
            alert("手机号不能为空。");
        }else if(num==2) {
            alert("手机号为11位数字");
        }else{
            alert("账号已存在！");
        }
    }


}

//真实姓名文本框失去焦点时调用
function nameBlur() {
    var name = $("#name").val();
    var flag = true;
    if(name == null) {
        flag = false;
    }else {
        name = name.trim();
        if(name=="") {
            flag = false;
        }
    }
    //姓名的值为空,错误值
    if(flag == false) {
        $("#nameSign").removeClass("glyphicon glyphicon-ok");
        $("#nameSign").addClass("glyphicon glyphicon-remove");
        $("#nameSign").css("display","inline");
        $("#cardNum").css("margin-left","128px");
        $("#name").css("border-color","#d9534f");
        $("#name").css("border-weight","3px");
        alert("真实姓名不能为空");
    }else {
        $("#nameSign").removeClass("glyphicon glyphicon-remove");
        $("#nameSign").addClass("glyphicon glyphicon-ok");
        $("#nameSign").css("display","inline");
        $("#cardNum").css("margin-left","128px");
        $("#name").css("border-color","#5bc0de");
        $("#name").css("border-weight","3px");
    }
}

//身份证号文本框失去焦点时调用
function cardBlur() {
    var cardNum = $("#cardNum").val();
    var num = 0;
    if(cardNum == null) {
        num = 1;            //不能为空
    }else {
        cardNum = cardNum.trim();
        if(cardNum=="") {
            num = 1;        //不能为空
        }else {
            if(cardNum.length!=18) {
                num = 2;   //格式错误，不足18位
            }else {
                for(var i = 0; i < cardNum.length; i++) {
                    if(cardNum[i]>='0' && cardNum[i]<='9') {
                        continue;
                    }else if(i==17 && cardNum[i]=='X') {
                        continue;
                    }else {
                        num = 3;
                        break;
                    }
                }
            }
        }
    }
    //正确数据
    if(num==0) {
        $("#cardSign").removeClass("glyphicon glyphicon-remove");
        $("#cardSign").addClass("glyphicon glyphicon-ok");
        $("#cardSign").css("display","inline");
        $("#cardNum").css("border-color","#5bc0de");
        $("#cardNum").css("border-weight","3px");
    }else {
        $("#cardSign").removeClass("glyphicon glyphicon-ok");
        $("#cardSign").addClass("glyphicon glyphicon-remove");
        $("#cardSign").css("display","inline");
        $("#cardNum").css("border-color","#d9534f");
        $("#cardNum").css("border-weight","3px");
        if(num == 1) {
            alert("身份证号不能为空！");
        }else if(num == 2) {
            alert("身份证号应为18位!");
        }else {
            alert("身份证号错误！");
        }
    }
}

function departBlur() {
    var depart = $("#department").val();
    var flag = true;
    if(depart==null) {
        flag = false;
    }else {
        depart = depart.trim();
        if(depart=="") {
            flag = false;
        }
    }
    //正确数据
    if(flag) {
        //显示对勾
        $("#departSign").removeClass("glyphicon glyphicon-remove");
        $("#departSign").addClass("glyphicon glyphicon-ok");
        $("#departSign").css("display","inline");
        //文本框边框变绿
        $("#department").css("border-color","#5bc0de");
        $("#department").css("border-weight","3px");
        $("#email").css("margin-left","128px");
    }else {
        //显示错号
        $("#departSign").removeClass("glyphicon glyphicon-ok");
        $("#departSign").removeClass("glyphicon glyphicon-remove");
        $("#departSign").css("display","inline");
        $("#department").css("border-color","#d9534f");
        $("#department").css("border-weight","3px");
        alert("所在部门不能为空");
    }
}

//常用邮箱文本框失去焦点时触发方法
function emailBlur() {
    var email = $("#email").val();
    var num = 0;
    if(email==null) {
        num = 1;
    }else {
        email = email.trim();
        if(email=="") {
            num = 1;
        }else {
            var index = email.indexOf('@');
            var str = email.substring(index,email.length);
            if(str=="@qq.com" || str=="@163.com" || str=="@sina.com") {
                num = 0;
            }else {
                num = 2;
            }
        }
    }
    if(num == 0) {
        $("#emailSign").removeClass("glyphicon glyphicon-remove");
        $("#emailSign").addClass("glyphicon glyphicon-ok");
        $("#emailSign").css("display","inline");
        $("#email").css("border-color","#5bc0de");
        $("#email").css("border-weight","3px");
    }else {
        $("#emailSign").removeClass("glyphicon glyphicon-ok");
        $("#emailSign").addClass("glyphicon glyphicon-remove");
        $("#emailSign").css("display","inline");
        $("#email").css("border-color","#d9534f");
        $("#email").css("border-weight","3px");
        if(num == 1) {
            alert("常用邮箱不能为空！");
        }else{
            alert("请填写QQ邮箱、网易邮箱或新浪邮箱。");
        }
    }
}

//信息保存
function save() {
    var flagOne = $("#idSign").hasClass("glyphicon glyphicon-ok");
    if(flagOne==false) {
        alert("手机号码填写不正确！");
        return;
    }
    var flagTwo = $("#nameSign").hasClass("glyphicon glyphicon-ok");
    if(flagTwo==false) {
        alert("真实姓名不能为空！");
        return;
    }
    var flagThree = $("#cardSign").hasClass("glyphicon glyphicon-ok");
    if(flagThree==false) {
        alert("身份证号填写不正确!");
        return;
    }
    var flagFour = $("#departSign").hasClass("glyphicon glyphicon-ok");
    if(flagFour==false) {
        alert("所在部门不能为空!");
        return;
    }
    var flagFive = $("#emailSign").hasClass("glyphicon glyphicon-ok");
    if(flagFive==false) {
        alert("常用邮箱填写不正确！");
        return;
    }
    var phone = $("#phone").val();         //手机号码
    var pwd = $("#password").val(); //密码
    var name = $("#name").val();    //真实名称
    var cardNum = $("#cardNum").val();  //身份证号
    var depart = $("#department").val();  //所在部门
    var email = $("#email").val();         //常用邮箱
    var params = '{"phone":"'+phone+'","pwd":"'+pwd+'","name":"'+name+'","cardNum":"'+cardNum+'","depart":"'+depart+'","email":"'+email+'"}';
    $.ajax({
       url: "http://localhost:8080/zhixin/admin/insertAdmin.action",
        data: params,
        contentType: "application/json;charset=UTF-8",
        type: "post",
        async: false,   //设置为同步请求，使浏览器锁死。
        success: function (data) {
            if(data==0) {
                alert("插入失败");
            }else {
                alert("插入成功");
            }
        }
    });
    textClear();
}