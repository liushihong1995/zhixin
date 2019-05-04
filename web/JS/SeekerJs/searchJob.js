$(function(){
    var _url = String(window.location);
    _url = decodeURI(_url);
    if(_url != "http://localhost:8080/zhixin/seeker/searchJob.action") {
        var index = _url.indexOf("?");
        var params = _url.substring(index+1,_url.length);
        var array = params.split("&");
        var cateId = array[0].split("=")[1];
        var cateName = array[1].split("=")[1];

        var compName = array[2].split("=")[1];
        if(cateId != "default") {
            $("#catetory").html(cateName);
            $("#catetoryInput").val(cateName);
            $("#categoryIdInput").val(cateId);
        }
        if(compName != "default") {
            $("#search_content").val(compName);
        }
        var city = array[3].split("=")[1];
        if(city != "default") {
            $("#hope_city").html(city);
            $("#city").html(city);
            getZones(city);
            $("#cityInput").val(city);

        }
    }

    $("#wordExpSelect").change(function () {
       var value = $("#wordExpSelect option:selected").val().trim();
       $("#expInput").val(value);
       getData(1);
    });

    $("#eduSelect").change(function () {
       var value = $("#eduSelect option:selected").val().trim();
       $("#eduSelect").val(value);
       getData(1);
    });

    $("#salarySelect").change(function () {
       var value = $("#salarySelect option:selected").val().trim();
       $("#salaryInput").val(value);
       getData(1);
    });
    $("#stageSelect").change(function () {
       var value = $("#stageSelect option:selected").val().trim();
       $("#stageInput").val(value);
       getData(1);
    });

    $("#scopeSelect").change(function () {
       var value = $("#scopeSelect option:selected").val().trim();
       $("#scopeInput").val(value);
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

    var preZone = "haha";
    $(".zoneName").on("click",function () {
       if(preZone=="haha") {
           $(this).css("color","red");
       }else {
           preZone.css("color","#5e5e5e");
           $(this).css("color","red");
       }
       preZone = $(this);
    });

    //当用户输入公司名称的时候，到数据库搜索相应数据，绑定到list中
    $("#search_content").keyup(function(){
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
    });
    getData(1);

    $("#compList").mouseleave(function () {
       $("#compList").css("display","none");
    });
});

/**
 * 选择公司
 */
function choseComp(obj) {
    var compName = obj.innerText;
    //alert(compName);
    $("#search_content").val(compName);
    $("#compNameList").css("display","none");
}

function clearCondition() {
    $("#wordExpSelect").val("");
    $("#expInput").val("");
    $("#eduSelect").val("");
    $("#eduInput").val("");
    $("#salarySelect").val("");
    $("#salaryInput").val("");
    $("#scopeSelect").val("");
    $("#scopeInput").val("");
    $("#stageSelect").val("");
    $("#stageInput").val("");
    $("#search_content").val("");
    getData(1);
}

function getData(currentPage) {
    var _city = $("#city").html().trim();
    var _zone = $("#zone").html().trim();
    var _category = $("#categoryIdInput").val().trim();
    var _industry = $("#industryIdInput").val().trim();
    var _exp = $("#expInput").val().trim();
    var _edu = $("#eduInput").val().trim();
    var _salary = $("#salaryInput").val().trim();
    var _stage = $("#stageInput").val().trim();
    var _scope = $("#scopeInput").val().trim();
    var _compName = $("#search_content").val().trim();
    var _start = (Number(currentPage)-1)*20;
    var _step = currentPage;
    var condition = {
        industry: _industry,
        category: _category,
        city: _city,
        zone: _zone,
        exp: _exp,
        edu: _edu,
        salary: _salary,
        stage: _stage,
        scope: _scope,
        compName: _compName,
        start: _start,
        step: _step
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/jobs/searchJob.action",
        data: JSON.stringify(condition),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var obj = JSON.parse(data);
            var current = Number(obj.currentPage);
            var total = Number(obj.totalPage);
            var list = obj.list;
            var array = eval(list);
            setJobInfor(array);
            setPage(current,total);
        }
    });
}

function setJobInfor(array) {
    $(".jobList").empty();
    $(".jobList").append('</br></br>');
    var job,comp,boss;
    for(var i = 0; i < array.length; i++) {
        job = array[i].job;
        comp = array[i].company;
        boss = array[i].boss;
        $(".jobList").append('<div class="jobItem">\n' +
            '                    <div class="jobInfor">\n' +
            '                        <div class="jobInforUp">\n' +
            '                            <a href="http://localhost:8080/zhixin/jobs/jobDetail.action?id='+job.id+'" class="jobNameLabel">'+job.name+'</a>\n' +
            '                            <label class="salaryLabel" style="color: red">'+job.salary+'</label>\n' +
            '                        </div>\n' +
            '                        <div class="jobInforDown">\n' +
            '                            <label class="cityLabel">'+job.city+'</label>\n' +
            '                            <label class="zoneLabel">'+job.zone+'</label>\n' +
            '                            <label> | </label>\n' +
            '                            <label class="expLabel">'+job.exp+'</label>\n' +
            '                            <label> | </label>\n' +
            '                            <label class="eduLabel">'+job.edu+'</label>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="compInfor">\n' +
            '                        <div class="compInforUp">\n' +
            '                            <a href="http://localhost:8080/zhixin/jobs/compDetail.action?id='+comp.id+'" class="compShort">'+comp.shortName+'</a>\n' +
            '                        </div>\n' +
            '                        <div class="compInforDown">\n' +
            '                            <label class="industryLabel">'+comp.industry+'</label> <label> | </label>\n' +
            '                            <label class="stageLabel">'+comp.stage+'</label> <label> | </label>\n' +
            '                            <label class="scopeLabel">'+comp.scope+'</label>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="bossInfor">\n' +
            '                        <div class="bossInforUp">\n' +
            '                            <img class="img-circle" src="/bossPic/'+boss.psrc+'" width="20px" height="20px">\n' +
            '                            <label class="nickLabel">'+boss.nickName+'</label> <label> | </label>\n' +
            '                            <label class="jobLabel">'+boss.job+'</label>\n' +
            '                        </div>\n' +
            '                        <div class="bossInforDown">\n' +
            '                            <label class="timeLabel">发布于'+job.time+'</label>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>');
    }
    $("#subSearchInfor").on("click",function () {
       getData(1);
    });
}

function getZones(city) {
    $.ajax({
        url : "http://localhost:8080/zhixin/jobs/getZone.action",
        data: String(city),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            $(".zoneDiv").empty();
            $(".zoneDiv").append(' <label>二级地址：</label>');
            var array = eval(data);
            for(var i = 0; i < array.length; i++) {
                if(array[i] == "default") continue;
                else {
                    $(".zoneDiv").append('<label class="zoneName" id="'+array[i]+'" onclick="choseZone(this)">'+array[i]+'</label>');
                }
            }
        }
    });
}
function changeCity(city) {
    $("#city").html(city);
    $("#cityInput").val(city);
    $("#zone").html("");
    $("#hope_city").html(city);
    getZones(city);
    getData(1);
}
function choseZone(obj) {
    $("#zone").html(obj.id);
    getData(1);
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
        $(".jobList").append('无检索的数据');
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

