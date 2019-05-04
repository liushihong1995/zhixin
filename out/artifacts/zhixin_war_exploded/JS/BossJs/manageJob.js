var boss;
var company;
var categorys = new Array();
$(function () {
    var bossId = $("#bossIdInput").val().trim();
    if(bossId ==null || bossId=="") {
        alert("登录已过期，请重新登录。");
        window.location = "http://localhost:8080/zhixin/Common/login.jsp";
        return;
    }
    getBoss();
    initCategoryInfor();
    $("#jobTypeInput").on("focus",function () {
        showCateDiv();
    });
    $("#jobCityInput").on("keyup",function () {
        var city = $("#jobCityInput").val().trim();
        $.ajax({
            url : "http://localhost:8080/zhixin/boss/getCityList.action",
            data: city,
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                var array = eval(data);
                $(".cityList").empty();
                var content = "<ul>";
                for(var i = 0; i < array.length; i++) {
                    content = content + '<li id="'+array[i]+'" onclick="choseCity(this)">'+array[i]+'</li>';
                }
                content = content + "</ul>";
                $(".cityList").append(content);
                $(".cityList").css("display","block");
            }
        });
    });

    getOnePage(1,1,"getPage");

});

/*获取某页*/
function getOnePage(current,jobId,opName) {
    var params = {
        id: jobId,
        bossId: boss.id,
        compId: company.id,
        currentPage: current,
        op: opName
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getOnePage.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var obj = JSON.parse(data);
            var status = obj.status;
            $("#list").empty();
            if(status == "无数据") {
                $("#list").append("还未发布任何职位");
                $(".page").empty();
            }else {
                var currentPage = Number(obj.currentPage);
                var totalPage = Number(obj.totalPage);
                var str = obj.jobs;
                var array = eval(str);
                $("#list").append(' <tr>\n' +
                    '                                <th class="jobId">职位编号</th>\n' +
                    '                                <th class="jobName">职位名称</th>\n' +
                    '                                <th class="jobType">职位类型</th>\n' +
                    '                                <th class="jobEdu">学历要求</th>\n' +
                    '                                <th class="jobSalary">薪资范围</th>\n' +
                    '                                <th class="jobExp">工作经验</th>\n' +
                    '                                <th class="jobOp">编辑 | 删除</th>\n' +
                    '                            </tr>');
                var job;
               for(var i = 0; i < array.length; i++) {
                   job = array[i];
                   $("#list").append(' <tr>\n' +
                       '                                <td class="jobId">' + job.id + '</td>\n' +
                       '                                <td class="jobName">' + job.name + '</td>\n' +
                       '                                <td class="jobType">' + job.cate + '</td>\n' +
                       '                                <td class="jobEdu">' + job.edu + '</td>\n' +
                       '                                <td class="jobSalary">' + job.salary + '</td>\n' +
                       '                                <td class="jobExp">' + job.exp + '</td>\n' +
                       '                                <td class="jobOp"><span class="glyphicon glyphicon-edit" onclick="modityJob('+ job.id +')"></span> | <span class="glyphicon glyphicon-trash" onclick="deleteJob('+ job.id +')"></span></td>\n' +
                       '                            </tr>')
               }
               setPage(currentPage,totalPage);
               $(".jobListContainer").css("display","block");
               $(".edit_job").css("display","none");
            }
        }
    });
}

function modityJob(jobId) {
    clear();
    $("#opName").val("update");
    $("#jobIdInput").val(jobId);
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getJob.action",
        data: String(jobId),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            job = data;
            $("#jobTypeInput").val(job.cate);
            $("#jobTypeId").val(job.cateId);
            $("#jobNameInput").val(job.name);
           // $("#jobEduSelect").find("option[text='"+job.edu+"']").attr("selected","true");
            $("#jobEduSelect").val(job.edu);
            $("#jobEduInput").val(job.edu);
            //$("#jobExpSelect").find("option[text='"+job.exp+"']").attr("selected","true");
            $("#jobExpSelect").val(job.exp);
            $("#jobExpInput").val(job.exp);
            //$("#salaryRange").find("option[text='"+job.salary+"']").attr("selected","true");
            $("#salaryRange").val(job.salary);
            $("#jobSalaryInput").val(job.salary);
            $("#jobCityInput").val(job.city);
            getZone(job.city);
            //$("#zoneSelect").find("option[text='"+job.zone+"']").attr("selected","true");
            $("#zoneSelect").val(job.zone);
            $("#jobZoneInput").val(job.zone);
            $("#jobAddress").val(job.address);
            $("#detailInput").val(job.detail);
            $(".jobListContainer").css("display","none");
            $(".edit_job").css("display","block");
        }
    });
}

function deleteJob(jobId){
    var currentPage = $("#currentPage").val().trim();
    currentPage = Number(currentPage);
    getOnePage(currentPage,String(jobId),"delete");
}

function setPage(currentPage,totalPage) {
    $("#currentPage").val(currentPage);
    $("#totalPage").val(totalPage);
    $(".page").empty();
    var start = Math.max(1,currentPage-2);
    var end = Math.min(totalPage,currentPage+2);
    var content = ' <button type="button" class="btn btn-default" id="first" onclick="goFirst()">首 页</button>\n' +
        '                        <button type="button" class="btn btn-default" id="previous" onclick="goPrevious()">上一页</button>\n';
    for(var i = start; i <= end; i++) {
        if(i == currentPage) {
            content = content + '<button type="button" class="btn btn-default" style="background-color: #5DD5C8;color: #ffffff" onclick="goPage('+i+')">'+i+'</button>\n';
        }else {
            content = content + '<button type="button" class="btn btn-default" onclick="goPage('+i+')">'+i+'</button>\n'
        }

    }
    content = content + '<button type="button" class="btn btn-default" id="next" onclick="goNext()">下一页</button>\n' +
        '                        <button type="button" class="btn btn-default" id="end" onclick="goEnd()">末 页</button>\n' +
        '                    </div>';
    $(".page").append(content);
}
function goFirst() {
    getOnePage(1,1,"getPage");
}
function goPrevious(){
    var currentPage = Number($("#currentPage").val().trim());
    if(currentPage==1) {
        alert("已经位于第一页");
    }else {
        currentPage = currentPage-1;
        getOnePage(currentPage,1,"getPage");
    }
}
function goPage(pageNumber) {
    var currentPage = Number(pageNumber);
    getOnePage(currentPage,1,"getPage");
}
function goNext() {
    var currentPage = Number($("#currentPage").val().trim());
    var totalPage = Number($("#totalPage").val().trim());
    if(currentPage==totalPage) {
        alert("已经位于最后一页");
    }else {
        currentPage = currentPage + 1;
        getOnePage(currentPage,1,"getPage");
    }
}
function goEnd() {
    var currentPage = Number($("#totalPage").val().trim());
    getOnePage(currentPage,1,"getPage");
}
function getBoss() {
    var id = $("#bossIdInput").val();
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getBossBasic.action",
        data: id,
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            boss = data;
            $("#bossPhoto").attr("src","/bossPic/" + boss.psrc);
            $("#bossName").html(boss.realName);
            $("#bossJob").html(boss.job);
            $("#bossEmail").html(boss.email);
            getCompany(boss.compId);
        }
    });
}
function getCompany(id) {
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getCompany.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            company = data;
            $("#compShort").html(company.shortName);
            $("#compStage").html(company.stage);
            $("#compIndustry").html(company.industry);
            $("#compScope").html(company.scope);
            $("#compLogo").attr("src","/compPic/" + company.logo);
            $("#compWeb").html(company.website);
        }
    });
}
//初始化职类信息
function initCategoryInfor() {
    $.ajax({
        url: "http://localhost:8080/zhixin/seeker/getCategory.action",
        data: "haha",
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var obj = eval(data);
            for(var i = 0; i < obj.length; i++) {
                var item = {
                    simple: obj[i].simple,
                    first: obj[i].first,
                    secondList: new Array()
                }
                var temp = obj[i].second;
                var secondArr = eval(temp);
                var arr = obj[i].map;
                for(var j = 0; j < secondArr.length; j++) {
                    var t = {
                        second: secondArr[j],
                        third: new Array()
                    }
                    var thirdStr = arr[secondArr[j]];
                    var thirdArr = eval(thirdStr);
                    for(var k = 0; k < thirdArr.length; k++) {
                        t.third.push(thirdArr[k]);
                    }
                    item.secondList.push(t);
                }
                categorys.push(item);
            }
            setCategoryInfor();
        }
    });
}
function show_second_list(obj) {
    var simple = $(obj).html().trim();
    var item;
    for(var i = 0; i < categorys.length; i++) {
        if(categorys[i].simple == simple) {
            item = categorys[i];
            break;
        }
    }
    var array = item.secondList;
    $(".cate_second_header").empty();
    $(".cate_second_header").append("<label>"+ simple +" 》"+"</label>");
    $(".cate_second_list").empty();
    var cnt = 0;
    for(var i = 0; i < array.length; i++) {
        var str = simple + "_" + array[i].second;
        $(".cate_second_list").append(' <label id="'+str+'" onclick="show_third_list(this)">'+array[i].second+'</label>');
    }
    $(".cate_third").css("display","none");
    $(".cate_second").css("display","block");
}
function show_third_list(obj) {
    var id = obj.id;
    var index = id.indexOf("_");
    var simple = id.substring(0,index);
    var second = id.substring(index+1,id.length);
    var item;
    for(var i = 0; i < categorys.length; i++) {
        if(categorys[i].simple == simple) {
            item = categorys[i];
            break;
        }
    }
    var list = item.secondList;
    var array;
    for(var i = 0; i < list.length; i++) {
        if(list[i].second == second) {
            array = list[i].third;
            break;
        }
    }
    $(".cate_second").css("display","none");
    $(".cate_third").css("display","block");
    var temp = simple + " 》" + second + " 》";
    $("#third_header").html(temp);
    $(".cate_third_list").empty();
    for(var i = 0; i < array.length; i++) {
        index = array[i].indexOf("_")+1;
        var len = array[i].length;
        var third = array[i].substring(index,len);
        $(".cate_third_list").append('<label id="'+array[i]+'" onclick="chose_category(this)">'+third+'</label>');
    }
}
function chose_category(obj) {
    var _id = obj.id;
    var index = _id.lastIndexOf('_');
    var industryId = _id.substring(0,index);
    var third = _id.substring(index+1,_id.length);
    $("#jobTypeInput").val(third);
    $("#jobTypeId").val(industryId);
    closeCateDiv();
}
function closeCateDiv(){
    $(".hiddenDiv").css("display","none");
    $(".categoryDiv").css("display","none");
}
function showCateDiv(){
    $(".hiddenDiv").css("display","block");
    $(".categoryDiv").css("display","block");
}
//设置职类信息
function setCategoryInfor() {
    $(".cate_first_list").empty();
    for(var i = 0; i < categorys.length; i++) {
        $(".cate_first_list").append('<div class="cate_first_item">\n' +
            '                            <label onclick="show_second_list(this)">'+categorys[i].simple+'</label>\n' +
            '                        </div>');
    }
    $(".cate_second_list").empty();
}
function choseCity(obj){
    var city = obj.id;
    $("#jobCityInput").val(city);
    $(".cityList").css("display","none");
    getZone(city);
}
function getZone(city) {
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getZones.action",
        data: city,
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            $("#jobZoneInput").val(array[0]);
            $("#zoneSelect").empty();
            $("#zoneSelect").append('<option value="'+array[0]+'" selected>' + array[0] + '</option>');
            for(var i = 1; i < array.length; i++) {
                $("#zoneSelect").append('<option value="'+array[i]+'">'+array[i]+'</option>');
            }
        }
    });
}
function choseZone() {
    var zone = $("#zoneSelect option:selected").val().trim();
    $("#jobZoneInput").val(zone);
}
function getEdu() {
    var edu = $("#jobEduSelect option:selected").val().trim();
    $("#jobEduInput").val(edu);
}
function getExp(){
    var exp = $("#jobExpSelect option:selected").val().trim();
    $("#jobExpInput").val(exp);
}
function getSalary() {
    var salary = $("#salaryRange option:selected").val().trim();
    $("#jobSalaryInput").val(salary);
}

function clear() {
    $("#jobTypeInput").val(""); //职位类型
    $("#jobTypeId").val("");    //职位Id
    $("#jobNameInput").val("");  //职位名称
    $("#jobEduInput").val("不限");
    $("#jobExpInput").val("不限");
    $("#jobSalaryInput").val("不限");
    $("#jobCityInput").val("");
    $("#jobZoneInput").val("");
    $("#jobAddress").val("");
    $("#detailInput").val("");
}

//点击添加职位按钮
function addJob(){
    clear();
    $(".edit_job").css("display","block");
    $(".jobListContainer").css("display","none");
    $("#opName").val("add");
}

function cancelAddJob(){
    clear();
    $(".edit_job").css("display","none");
    $(".jobListContainer").css("display","block");
}

function checkInfor() {
    var jobType = $("#jobTypeInput").val().trim();
    if(jobType==null || jobType=="") {
        alert("请选择职位类型");
        $("#jobTypeInput").focus();
        return false;
    }
    var jobName = $("#jobNameInput").val().trim();
    if(jobName==null || jobType=="") {
        alert("请填写职位名称");
        $("#jobNameInput").focus();
        return false;
    }
    var jobEdu = $("#jobEduInput").val().trim();
    if(jobEdu==null || jobEdu=="") {
        alert("请选择学历要求");
        $("#jobEduSelect").focus();
        return false;
    }
    var jobExp = $("#jobExpInput").val().trim();
    if(jobExp==null || jobExp=="") {
        alert("请选择工作经验");
        $("#jobExpSelect").focus()
        return false;
    }
    var jobSalary = $("#jobSalaryInput").val().trim();
    if(jobSalary==null || jobSalary=="") {
        alert("请选择薪资范围");
        $("#salaryRange").focus();
        return false;
    }
    var city = $("#jobCityInput").val().trim();
    if(city==null || city=="") {
        alert("请选择工作城市");
        $("#jobCityInput").focus();
        return false;
    }
    var zone = $("#jobZoneInput").val().trim();
    if(zone==null || zone=="") {
        alert("请选择区域");
        $("#zoneSelect").focus();
        return false;
    }
    var address = $("#jobAddress").val().trim();
    if(address==null || address=="") {
        alert("请填写详细地址");
        $("#jobAddress").focus();
        return false;
    }
    var detail = $("#detailInput").val().trim();
    if(detail==null || detail=="") {
        alert("请填写职位要求");
        $("#detailInput").focus();
        return false;
    }
    return true;
}

/*添加职位或更新职位*/
function updateJob(){
    if(checkInfor()==true) {
        var item = {
            id: $("#jobIdInput").val().trim(),
            cate: $("#jobTypeInput").val().trim(),
            cateId: $("#jobTypeId").val().trim(),
            name: $("#jobNameInput").val().trim(),
            city: $("#jobCityInput").val().trim(),
            zone: $("#jobZoneInput").val().trim(),
            address: $("#jobAddress").val().trim(),
            exp: $("#jobExpInput").val().trim(),
            edu: $("#jobEduInput").val().trim(),
            salary: $("#jobSalaryInput").val().trim(),
            detail: $("#detailInput").val().trim(),
            time: "",
            bossId: boss.id,
            compId: company.id
        };
        var op = $("#opName").val().trim();
        if(op == "add") {
            $.ajax({
                url : "http://localhost:8080/zhixin/boss/insertJob.action",
                data: JSON.stringify(item),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function (data) {
                    if(data==true) {
                        var currentPage = $("#currentPage").val().trim();
                        if(currentPage==null || currentPage=="") {
                            getOnePage(1,1,"getPage");
                        }else {
                            getOnePage(Number(currentPage),1,"getPage");
                        }
                        alert("添加职位成功");
                        $("#list").css("display","block");
                        $(".edit_job").css("display","none");
                    }else {
                        alert("添加职位失败，请稍后尝试");
                    }
                }
            });
        }else if(op=="update") {
            $.ajax({
                url : "http://localhost:8080/zhixin/boss/updateJob.action",
                data: JSON.stringify(item),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function (data) {
                    if(data==true) {
                        var currentPage = $("#currentPage").val().trim();
                        getOnePage(Number(currentPage),1,"getPage");
                        alert("修改职位成功");
                        $(".jobListContainer").css("display","block");
                        $(".edit_job").css("display","none");
                    }else {
                        alert("添加修改失败，请稍后尝试");
                    }
                }
            });
        }
    }
}