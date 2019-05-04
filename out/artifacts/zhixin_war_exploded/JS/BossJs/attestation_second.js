var flag = true;
$(function () {
    getBossInfor();
    changeCssStyle();
    $("#female").on("click",function () {
        $("#female").css("background-color","#5DD5C8");
        $("#female").css("color","#ffffff");
        $("#sexInput").val("女");
        $("#male").css("background-color","#F0F8FF");
        $("#male").css("color","black");
    });

    $("#male").on("click",function () {
        $("#male").css("background-color","#5DD5C8");
        $("#male").css("color","#ffffff");
        $("#sexInput").val("男");
        $("#female").css("background-color","#F0F8FF");
        $("#female").css("color","black");
    });

    $("#bossCompInput").keyup(function () {
        var fullName = $("#bossCompInput").val().trim();
        $.ajax({
            url : "http://localhost:8080/zhixin/boss/getCompByFull.action",
            data: fullName,
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                var array = eval(data);
                var item;
                $(".compList").empty();
                var content = '<ul>'
                for(var i = 0; i < array.length; i++) {
                    item = array[i];
                    var subArray = item.split(";");
                    content = content + '<li id="'+item+'" onclick="choseThis(this)">'+subArray[1]+'</li>';
                }
                content = content + '</ul>';
                $(".compList").append(content);
                $(".compList").css("display","block");
            }
        });
    });
});


function changeCssStyle() {
    var _url = String(window.location);
    if(_url != "http://localhost:8080/zhixin/Boss/attestation_second.jsp") {
        $(".attestation_header").css("display","none");
    } else {
        $(".attestation_header").css("display","block");
    }
}
function choseThis(obj) {
    var str = obj.id;
    var array = str.split(";");
    $("#bossCompIdInput").val(array[0]);
    $("#bossCompInput").val(array[1]);
    $("#bossCompLongInput").val(array[1] + ";" + array[2]);
    $(".compList").css("display","none");
}

function getBossInfor(){
    var id = $("#bossId").val().trim();
    if(id=="0" || id==0) {
        return;
    }
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getBossBasic.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            $("#bossPhoneInput").val(data.phone);
            $("#bossNickInput").val(data.nickName);
            $("#bossRealInput").val(data.realName);
            var company = data.company;
            if(company==null || company=="") {
                $("#bossCompInput").val(company);
                flag = false;
            }else {
                var array = data.company.split(";");
                $("#bossCompInput").val(array[0]);
                flag = true;
            }
            $("#bossCompIdInput").val(data.compId);
            $("#bossCompLongInput").val(company);
            $("#bossJobInput").val(data.job);
            $("#bossEmailInput").val(data.email);
            if(data.sex==true) {
                $("#male").css("background-color","#5DD5C8");
                $("#male").css("color","#ffffff");
                $("#sexInput").val("男");
            }else {
                $("#female").css("background-color","#5DD5C8");
                $("#female").css("color","#ffffff");
                $("#sexInput").val("女");
            }
        }
    });
}

//暂存当前步骤
function saveStep(step) {
    var _id = $("#bossIdInput").val().trim();
    var _phone = $("#bossPhoneInput").val().trim();
    var _reaLName = $("#bossRealInput").val().trim();
    var _nickName = $("#bossNickInput").val().trim();
    var _company = $("#bossCompLongInput").val().trim();
    var _job = $("#bossJobInput").val().trim();
    var _email = $("#bossEmailInput").val().trim();
    var _sex = $("#bossSexInput").val().trim();
    var _compId = $("#bossCompIdInput").val().trim();
    if(_sex=="男") {
        _sex=true;
    }else {
        _sex=false
    }
    var _num = 1;

    var boss = {
        id: _id,
        phone: _phone,
        realName: _reaLName,
        nickName: _nickName,
        company: _company,
        job: _job,
        email: _email,
        psrc: "",
        cardFront: "",
        cardBehind: "",
        card: "",
        flag: 0,
        compId: _compId,
        sex: _sex,
        result: "",
        num: _num
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/saveStepOne.action",
        data: JSON.stringify(boss),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data==true) {
                alert("暂存成功");
            }else {
                alert("暂存失败，请稍后尝试");
            }
        }
    });
}

function checkInfor() {
    var _reaLName = $("#bossRealInput").val().trim();
    if(_reaLName==null || _reaLName=="") {
        alert("请填写真实姓名");
        $("#bossRealInput").focus();
        return false;
    }
    var _nickName = $("#bossNickInput").val().trim();
    if(_nickName==null || _nickName=="") {
        alert("请填写昵称");
        $("#bossNickInput").focus();
        return false;
    }
    var _company = $("#bossCompLongInput").val().trim();
    if(_company==null || _company=="") {
        alert("请填写任职公司");
        $("#bossCompInput").focus();
        return false;
    }
    var _job = $("#bossJobInput").val().trim();
    if(_job==null || _job=="") {
        alert("请填写职位");
        $("#bossJobInput").focus();
        return false;
    }
    var _email = $("#bossEmailInput").val().trim();
    if(_email==null || _email=="") {
        alert("请填写常用邮箱");
        $("#bossEmailInput").focus();
        return false;
    }
    return true;
}

function goStep(step) {
    if(checkInfor()==false) return;
    var _id = $("#bossIdInput").val().trim();
    var _phone = $("#bossPhoneInput").val().trim();
    var _reaLName = $("#bossRealInput").val().trim();
    var _nickName = $("#bossNickInput").val().trim();
    var _company = $("#bossCompLongInput").val().trim();
    var _job = $("#bossJobInput").val().trim();
    var _email = $("#bossEmailInput").val().trim();
    var _sex = $("#bossSexInput").val().trim();
    var _compId = $("#bossCompIdInput").val().trim();
    if(_sex=="男") {
        _sex=true;
    }else {
        _sex=false
    }
    var _num = 2;

    var boss = {
        id: _id,
        phone: _phone,
        realName: _reaLName,
        nickName: _nickName,
        company: _company,
        job: _job,
        email: _email,
        psrc: "",
        cardFront: "",
        cardBehind: "",
        card: "",
        flag: 0,
        compId: _compId,
        sex: _sex,
        result: "",
        num: _num
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/saveStepOne.action",
        data: JSON.stringify(boss),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data==true) {
                $("#content").load("../Boss/attestation_third.jsp");
            }else {
                alert("跳转失败，请稍后尝试");
            }
        }
    });
}

//检测数据是否填写完整。
function checkInforCompelete() {
    var bossNickName = $("#bossNickInput").val().trim();
    if(isBlank(bossNickName)) {
        alert("请填写昵称");
        return false;
    }
    var bossRealName = $("#bossRealInput").val().trim();
    if(isBlank(bossRealName)) {
        alert("请填写真实姓名");
        return false;
    }
    var bossCompId = $("#bossCompIdInput").val().trim();
    if(isBlank(bossCompId)) {
        alert("请填写所属公司");
        return false;
    }
    var bossJob = $("#bossJobInput").val().trim();
    if(isBlank(bossJob)) {
        alert("请填写个人职位");
        return false;
    }
    var bossEmail = $("#bossEmailInput").val().trim();
    if(isBlank(bossEmail)) {
        alert("请留下工作邮箱，否则求职者将无法与您取得联系");
        return false;
    }
    var bossSex = $("#bossSexInput").val().trim();
    if(isBlank(bossSex)) {
        alert("请选择性别。");
        return false;
    }
    return true;
}

//判断值是否为空
function isBlank(value) {
    if(value==null || value=="") {
        return true;
    } else {
        return false;
    }
}

//保存基本信息
function save() {
    if (checkInfor()==false) return;
    var _id = $("#bossIdInput").val().trim();
    var _realName = $("#bossRealInput").val().trim();
    var _nickName = $("#bossNickInput").val().trim();
    var _compId = $("#bossCompIdInput").val().trim();
    var _company = $("#bossCompLongInput").val().trim() + ";" + $("#bossCompIdInput").val().trim();
    var _job = $("#bossJobInput").val().trim();
    var _email = $("#bossEmailInput").val().trim();
    var _tempSex = $("#bossSexInput").val().trim();
    var _sex;
    if(_tempSex == "男") {
        _sex = true;
    } else {
        _sex = false;
    }
    var params = {
        id : _id,
        realName: _realName,
        nickName: _nickName,
        compId: _compId,
        company: _company,
        job: _job,
        email: _email,
        sex: _sex,
    };

    $.ajax({
        url : "http://localhost:8080/zhixin/boss/saveBasicInfor.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data == true) {
                if(flag == false) {
                    window.location = "http://localhost:8080/zhixin/Boss/homePage.jsp";
                } else {
                    alert("完善基本信息成功。");
                    getBossInfor();
                }
            }
        }
    });
}


function returnBack() {
   window.history.back(-1);
}



