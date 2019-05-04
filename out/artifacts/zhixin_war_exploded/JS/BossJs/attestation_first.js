$(function () {
    getBossInfor();
});
function getBossInfor(){
    var id = $("#bossIdInput").val().trim();
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getBossBasic.action",
        data: id,
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            $(".begin_attestation").empty();
            var num = Number(data.num);
            if(data.flag==false) {
                if(num == 0) {
                    $(".begin_attestation").append(' <label>您的账号还未进行实名认证</label></br>\n' +
                        '                            <button class="btn btn-default" type="button" id="begin" onclick="goStep(1)">开始认证</button>');
                }else if(num == 1) {
                    $(".begin_attestation").append('  <label>上次您进行到第一步</label></br>\n' +
                        '                            <button class="btn btn-default" type="button" id="begin" onclick="goStep(1)">继续认证</button>');
                }else if(num == 2) {
                    $(".begin_attestation").append('<label>上次您进行到第二步</label></br>\n' +
                        '                            <button class="btn btn-default" type="button" id="begin" onclick="goStep(2)">继续认证</button>');
                }else if(num == 3) {
                    $(".begin_attestation").append(' <label>${Boss.result}</label></br>\n' +
                        '                            <button class="btn btn-default" type="button" id="begin" onclick="goStep(0)">重新认证</button>');
                }
            }else {
                $(".begin_attestation").append(' <label>您的账号已通过实名认证</label></br>\n' +
                    '                    <button class="btn btn-default" type="button" id="begin" onclick="goStep(0)">重新认证</button>');
            }
        }
    });
}
function goStep(num){
    var step = Number(num);
    if(step == 1) {
        $("#content").load("../Boss/attestation_second.jsp");
    }else if(step==2){
        $("#content").load("../Boss/attestation_third.jsp");
    }else if(step==0) {
        $("#content").load("../Boss/attestation_first.jsp");
    }
}