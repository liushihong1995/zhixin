$(function(){
    $("#showCompInfor").css("color","#5DD5C8");
    $(".compDetailDown").load("../Jobseeker/bussinessDetail.jsp");
    initCompInfor();
    getBossNumber();
    getJobNumber();
});

function initCompInfor() {
    var id = $("#compId").val().trim();
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getCompany.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            $("#compLogo").attr("src","/compPic/" + data.logo);
            $("#compShortName").html(data.shortName);
            $("#compStage").html(data.stage);
            $("#compScope").html(data.scope);
            $("#compIndustry").html(data.industry);
            $(".summary").html(data.summary);
        }
    });
}

function showCompInfor(){
    $(".compDetailDown").load("../Jobseeker/bussinessDetail.jsp");
    $("#showCompInfor").css("color","#5DD5C8");
    $("#showRecruitJob").css("color","#ffffff");
}

function showRecruitJob(){
    $(".compDetailDown").load("../Jobseeker/jobInfor.jsp");
    $("#showCompInfor").css("color","#ffffff");
    $("#showRecruitJob").css("color","#5DD5C8");
}
function getBossNumber() {
    var id = $("#compId").val().trim();
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getBossCount.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
           $("#bossNumber").html(data);
        }
    });
}
function getJobNumber(){
    var id = $("#compId").val().trim();
    $.ajax({
        url : "http://localhost:8080/zhixin/jobs/getJobCount.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            $("#jobNumber").html(data);
        }
    });
}
