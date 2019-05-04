var user = {
    uid: "",
    name:"",
    psrc:"",
    identity:"",
};

$(function(){
    initData();
    user.uid = $("#uid").val();
});

function initData() {
    var _uid = $("#uid").val();
    if(_uid == "0") return;
    var params = {
        "uid": _uid
    };
    var _identity = $("#identity").val().trim();
    if(_identity == "boss") {
        $.ajax({
            url: "http://localhost:8080/zhixin/boss/getBossBasic.action",
            data: String(_uid),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                var sname = data.realName;
                var psrc = "/bossPic/" + data.psrc;
                if(sname==null || sname=="") {
                    sname = "用户:无姓名";
                    user.name = "无姓名";
                } else {
                    user.name = sname;
                }
                user.psrc = psrc;
                user.identity = "boss";
                $("#bossNickName").html(sname);
                $("#seekerPhoto").attr("src",psrc);
            }
        });
    } else if(_identity == "seeker"){
        $.ajax({
            url: "http://localhost:8080/zhixin/seeker/getSeeker.action",
            data: JSON.stringify(params),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                var sname = data.sname;
                var psrc = "/seekerPic/" + data.psrc;
                if(sname==null || sname=="") {
                    sname = "用户:无姓名";
                    user.name = "无姓名"
                } else {
                    user.name = sname;
                }
                user.psrc = psrc;
                user.identity = "seeker";
                $("#sname").html(sname);
                $("#seekerPhoto").attr("src",psrc);
            }
        });
    }
}
function goLogin(){
    window.location = "http://localhost:8080/zhixin/Common/login.jsp";
}

function goRegister(){
    window.location = "http://localhost:8080/zhixin/Common/register.jsp";
}