var type = "全部";
$(function(){
    initType();
});

function getFirstPage() {
    item = {
        cate: "全部",
        compId: $("#compId").val().trim(),
        currentPage: String(1)
    };
    getJobByType(item);
}

function initType() {
    var id = $("#compId").val().trim();
    $.ajax({
        url : "http://localhost:8080/zhixin/jobs/getJobType.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            $(".jobTypeDiv").empty();
            $(".jobTypeDiv").append('<label id="职位类型" onclick="choseType(this)">职位类型:</label>');
            var type;
            var index;
            var count;
            for(var i = 0; i < array.length; i++) {
                index = array[i].indexOf(";");
                type = array[i].substring(0,index);
                count = array[i].substring(index+1,array[i].length);
                if(type=="全部") {
                    $(".jobTypeDiv").append('<label id="全部" onclick="choseType(this)" style="color: #5DD5C8">全部('+count+')</label>');
                    break;
                }
            }

            for(var i = 0; i < array.length; i++) {
                index = array[i].indexOf(";");
                type = array[i].substring(0,index);
                count = array[i].substring(index+1,array[i].length);
                if(type!="全部") {
                    var temp = type + "(" + count + ")";
                    $(".jobTypeDiv").append('<label id="'+type+'" onclick="choseType(this)">'+temp+'</label>');
                }
            }

            $("#jobType").val("全部");
            getFirstPage();
        }
    });
}

function choseType(obj){
   var id = obj.id;
   if(id == "职位类型") return;
    $(obj).css("color","#5DD5C8");
   if(type=="全部") {
       type = $(obj);
   }else {
       type.css("color","black");
       type = $(obj);
   }
   var _cate = id;
   var _currentPage = 1;
   var _compId = $("#compId").val().trim();
   var item = {
       cate: _cate,
       currentPage: _currentPage,
       compId: _compId
   };
   getJobByType(item);
}

function getJobByType(item) {
    $.ajax({
        url: "http://localhost:8080/zhixin/jobs/getJobByType.action",
        data: JSON.stringify(item),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var obj = JSON.parse(data);
            var current = Number(obj.currentPage);
            var total = Number(obj.totalPage);
            $(".jobList").empty();
            $(".jobList").append('<div class="jobItem"></div>');
            var str = obj.list;
            var array = eval(str);
            var job, boss;
            for (var i = 0; i < array.length; i++) {
                job = array[i].job;
                boss = array[i].boss;
                $(".jobList").append('<div class="jobItem">\n' +
                    '                    <a class="jobName" href="http://localhost:8080/zhixin/jobs/jobDetail.action?id='+job.id+'">' + job.name + '</a>\n' +
                    '                    <label class="jobSalary">' + job.salary + '/月</label>\n' +
                    '                    <label class="jobExp">' + job.exp + ' | ' + job.edu + ' | ' + job.city + '</label>\n' +
                    '                    <img src="/bossPic/' + boss.psrc + '" width="25px" height="25px" class="img-circle bossPhoto">\n' +
                    '                    <label class="bossNickName">' + boss.nickName + '</label>\n' +
                    '                    <label class="bossJob">' + boss.job + '</label>\n' +
                    '                    <label class="bossTime">' + job.time + '</label>\n' +
                    '                </div>');

            }
            initPage(current, total);
        }
    });
}

function initPage(current,total){
    $("#currentPage").val(current);
    $("#totalPage").val(total);
    $(".jobPage").empty();
    $(".jobPage").append(' <button class="btn btn-default" type="button" onclick="goFirst()">首页</button>\n' +
        '                <button class="btn btn-default" type="button" onclick="goPrevious()">上一页</button>\n');
    current = Number(current);
    total = Number(total);
    var start = Math.max(current-2,1);
    var end = Math.min(current+2,total);
    for(var i = start; i <= end; i++) {
        if(i == current) {
            $(".jobPage").append('<button class="btn btn-default" type="button" id="'+i+'" onclick="goPage(this)" style="color: #5DD5C8">'+i+'</button>\n');
        }else {
            $(".jobPage").append('<button class="btn btn-default" type="button" id="'+i+'" onclick="goPage(this)">'+i+'</button>\n');
        }
    }
    $(".jobPage").append(' <button class="btn btn-default" type="button" onclick="goNext()">下一页</button>\n' +
        '                <button class="btn btn-default" type="button" onclick="goEnd()">末页</button>');
}

function goFirst() {
    var currentPage = $("#currentPage").val().trim();
    if(currentPage=="1") {
        alert("已经在第一页");
    }else {
        item = {
            cate : $("#jobType").val().trim(),
            compId: $("#compId").val().trim(),
            currentPage: String(1)
        };
        getJobByType(item);
    }
}
function goPrevious() {
    var currentPage = $("#currentPage").val().trim();
    if(currentPage=="1") {
        alert("已经在第一页");
    }else {
        currentPage = Number(currentPage)-1;
        item = {
            cate: $("#jobType").val().trim(),
            compId: $("#compId").val().trim(),
            currentPage: String(currentPage)
        };
        getJobByType(item);
    }
}
function goNext() {
    var currentPage = $("#currentPage").val().trim();
    var totalPage = $("#totalPage").val().trim();
    if(currentPage==totalPage) {
        alert("已经是最后一页");
    }else {
        currentPage = Number(currentPage)+1;
        item = {
            cate: $("#jobType").val().trim(),
            compId: $("#compId").val().trim(),
            currentPage: String(currentPage)
        };
        getJobByType(item);
    }
}

function goEnd() {
    var currentPage = $("#currentPage").val().trim();
    var totalPage = $("#totalPage").val().trim();
    if(currentPage == totalPage) {
        alert("当前已是最后一页");
    }else {
        item = {
            cate: $("#jobType").val().trim(),
            compId: $("#compId").val().trim(),
            currentPage: totalPage
        };
        getJobByType(item);
    }
}
function goPage(obj) {
    var page = obj.id;
    item = {
        cate: $("#jobType").val().trim(),
        compId: $("#compId").val().trim(),
        currentPage: page
    };
    getJobByType(item);
}