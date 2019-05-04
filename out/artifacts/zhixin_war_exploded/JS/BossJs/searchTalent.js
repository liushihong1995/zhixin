$(function(){
    var _url = String(window.location);
    _url = decodeURI(_url)
    init();
    if(_url != "http://localhost:8080/zhixin/boss/searchTalent.action") {
        var index = _url.indexOf("?");
        var params = _url.substring(index+1,_url.length);
        var array = params.split("&");
        var cateId = array[0].split("=")[1];
        var cateName = array[1].split("=")[1];
        var industry = array[2].split("=")[1];
        var industryId = array[3].split("=")[1];
        var city = array[4].split("=")[1];
        if(cateName != "default") {
            $("#category").html(cateName);
            $("#categoryInput").val(cateName);
            $("#categoryIdInput").val(cateId);
        }
        if(industry != "default") {
            $("#industry").html(industry);
            $("#industryInput").val(industry);
            $("#industryIdInput").val(industryId);
        }
        if(city != "default") {
            $("#hope_city").html(city);
            $("#cityInput").val(city);
        }
    }

    //工作经历
    $("#wordExpSelect").change(function () {
        var value = $("#wordExpSelect option:selected").val().trim();
        $("#expInput").val(value);
        getData(1);
    });

    //学历
    $("#eduSelect").change(function () {
        var value = $("#eduSelect option:selected").val().trim();
        $("#eduSelect").val(value);
        getData(1);
    });

    //薪水
    $("#salarySelect").change(function () {
        var value = $("#salarySelect option:selected").val().trim();
        $("#salaryInput").val(value);
        getData(1);
    });

    $("#statusSelect").change(function () {
        var value = $("#statusSelect option:selected").val().trim();
        $("#statusInput").val(value);
        getData(1);
    });

    var preCity = "全国";
    $(".hotCityName").on("click",function () {
        if(preCity=="全国") {
            $(this).css("color","red");
        } else {
            preCity.css("color","#5e5e5e");
            $(this).css("color","red");
        }
        preCity = $(this);
    });

    $("#subSearchInfor").on("click",function () {
        getData(1);
    });

    //当用户输入公司名称的时候，到数据库搜索相应数据，绑定到list中
   /* $("#search_content").keyup(function(){
        var fullName = $("#search_content").val().trim();
        $.ajax({
            url : "http://localhost:8080/zhixin/boss/getCompByFull.action",
            data: String(fullName),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function(data) {
                var companys = eval(data);
                $("#compNameList").css("display","block");
                $("#compList").empty();
                var shortName,array;
                for(var i = 0; i < companys.length; i++) {
                    array = companys[i].split(";");
                    shortName = array[2];
                    $("#compList").append('<li onclick="choseComp(this)">'+ shortName +'</li>');
                }
            }
        });
    });*/

    getData(1);
});

function init() {
    $("#cityInput").val("全国");
    $("#categoryIdInput").val("");
    $("#industryIdInput").val("");
    $("#expInput").val("不限");
    $("#eduInput").val("不限");
    $("#salaryInput").val("不限");
    $("#statusInput").val("离职-随时到岗");
}


function clearCondition() {
    $("#wordExpSelect").val(""); //存在
    $("#expInput").val("");      //存在
    $("#eduSelect").val("");     //存在
    $("#eduInput").val("");      //存在
    $("#salarySelect").val("");  //存在
    $("#salaryInput").val("");   //存在
    $("#statusSelect").val("");  //存在
    $("#search_content").val(""); //存在
    $("#statusInput").val("");    //存在
    getData(1);
}

function getData(currentPage) {
    var _city = $("#cityInput").val().trim();            //期望城市
    var _category = $("#categoryIdInput").val().trim(); //职类ID
    var _industry = $("#industryIdInput").val().trim(); //行业ID
    var _exp = $("#expInput").val().trim();             //经验
    var _edu = $("#eduInput").val().trim();             //学历
    var _salary = $("#salaryInput").val().trim();       //薪资
    var _status = $("#statusInput").val().trim();       //求职状态
    var _start = Number(currentPage);
    var _step = 20;
    var condition = {
        industry: _industry,
        category: _category,
        city: _city,
        exp: _exp,
        edu: _edu,
        salary: _salary,
        status: _status,
        start: _start,
        step: _step
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/seeker/searchSeeker.action",
        data: JSON.stringify(condition),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data == "0") {
                $(".seekerList").empty();
                $(".seekerList").append('无符合条件的数据');
            } else {
                var obj = JSON.parse(data);
                var current = Number(obj.currentPage);
                var total = Number(obj.totalPage);
                var data = obj.data;
                var array = eval(data);
                setTalentInfor(array);
                setPage(current,total);
            }
        }
    });
}

//设置人才信息
function setTalentInfor(array) {
    $(".seekerList").empty();
    $(".seekerList").append('</br></br>');
    var hope,seeker;
    for(var i = 0; i < array.length; i++) {
        hope = array[i].hope;
        seeker = array[i].seeker;
        $(".seekerList").append(' <div class="seekerItem">\n' +
            '                    <div class="basicInfor">\n' +
            '                        <img class="img-circle" src="/seekerPic/'+seeker.psrc+'" width="45px" height="48px">\n' +
            '                        <label class="seekerName" style="margin-left: 10px; margin-right: 5px">'+seeker.sname+'</label> |\n' +
            '                        <label class="seekerEdu" style="margin-left: 5px;margin-right: 5px">'+seeker.education+'</label> |\n' +
            '                        <label class="seekerExp" style="margin-left: 5px">'+seeker.workExp+'</label>\n' +
            '                    </div>\n' +
            '                    <div class="hopeInfor">\n' +
            '                        <label class="hopeCate">'+hope.category+'</label> |\n' +
            '                        <label class="hopeSaraly">'+hope.salary+'</label> |\n' +
            '                        <label class="hopeIndustry">'+hope.industry+'</label> |\n' +
            '                        <label class="hopeCity">'+hope.city+'</label>\n' +
            '                    </div>\n' +
            '                    <div class="resumeInfor">\n' +
            '                        <a href="http://localhost:8080/zhixin/boss/browerResume.action?id='+seeker.id+'" target="_blank" class="lookResume">查看简历</a>\n' +
            '                    </div>\n' +
            '                </div>');

    }


}

function setPage(current,total) {
    $("#currentPage").val(current);
    $("#totalPage").val(total);
    $(".page").empty();
    var start = Math.max(1,current-2);
    var end = Math.min(current+2,total);
    if(total!=0) {
        $(".page").append('  <button class="btn btn-default" type="button" onclick="goFirst()">首页</button>\n' +
            '                    <button class="btn btn-default" type="button" onclick="goPrevious()">上一页</button>\n');
        for(var i = Number(start); i <= Number(end); i++) {
            if(i==current) {
                $(".page").append(' <button class="btn btn-default" type="button" id="page_'+i+'"style="color: #5DD5C8" onclick="goPage(this)">'+i+'</button>\n');
            }else {
                $(".page").append(' <button class="btn btn-default" type="button" id="page_'+i+'" onclick="goPage(this)">'+i+'</button>\n');
            }
        }
        $(".page").append(' <button class="btn btn-default" type="button"onclick="goNext()">下一页</button>\n' +
            '                    <button class="btn btn-default" type="button" onclick="goEnd()">末页</button>\n');
    }else {
        $(".seekerList").append('无检索的数据');
    }
}

function goFirst(){
    getData(1);
}
function goEnd() {
    var total = $("#totalPage").val().trim();
    total = Number(total);
    getData(total);
}
function goPrevious() {
    var current = $("#currentPage").val().trim();
    current = Number(current);
    if(current==1) {
        alert("已经位于第一页");
    }else {
        current = current-1;
        getData(current);
    }
}
function goNext() {
    var current = $("#currentPage").val().trim();
    var total = $("#totalPage").val().trim();
    current = Number(current);
    total = Number(total);
    if(current==total) {
        alert("已经位于最后一页");
    }else {
        current = current+1;
        getData(current);
    }
}

function goPage(obj) {
    var _id = obj.id;
    var index = _id.indexOf("_");
    var current = _id.substring(index+1,_id.length);
    current = Number(current);
    getData(current);
}

