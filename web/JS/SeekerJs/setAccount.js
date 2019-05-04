$(function(){
    includeLinkStyle();
    var identity = $("#identity").val();
    if(identity=="onUser") {
        alert("登录已过期，请重新登录。");
        window.location = "http://localhost:8080/zhixin/Common/login.action";
    } else {
        if(identity == "boss") {
            $("#setAccountSignOut").css("display","none");
        }
    }
});
function includeLinkStyle() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    var identity = $("#identity").val().trim();
    if(identity == "boss") {
        link.href = "../CSS/BossCss/header_two.css";
    }else if(identity == "seeker"){
        link.href = "../CSS/CommonCss/header_one.css";
        /* <link rel="stylesheet" href="../CSS/CommonCss/header_one.css" type="text/css"> */
    }else {
        link.href = "../CSS/CommonCss/header_one.css";
    }
    document.getElementsByTagName("head")[0].appendChild(link);
}
function showChangePhoto() {
    $("#content").load("../Jobseeker/changePhoto.jsp");
}

function showChangePhone() {
    $("#content").load("../Jobseeker/changePhone.jsp");
}