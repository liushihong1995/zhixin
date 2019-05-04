$(function () {
    var id = $("#bossId").val();
    if(id != "0") {
        $.ajax({
            url : "http://localhost:8080/zhixin/boss/getBossBasic.action",
            data: String(id),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                $("#bossNickName").html(data.nickName);
                $("#seekerPhoto").attr("src","/bossPic/" + data.psrc);
            }
        });
    }

});
function goLogin(){
    window.location = "http://localhost:8080/zhixin/Common/login.jsp";
}

function goRegister(){
    window.location = "http://localhost:8080/zhixin/Common/register.jsp";
}