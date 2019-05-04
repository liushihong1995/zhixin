
//用户信息
var seeker = {
    id: $("#uid").val().trim(),
    phone : "",
    sname : "",
    status: "",
    sex: "",
    workExp: "",
    birth: "",
    weichat: "",
    email: "",
    updateTime: "",
    psrc: "",
    education: "",
    advantage: ""
}
//期望职位列表
var hopes = new Array();
//实习经历
var practices = new Array();
//项目经历列表
var pros = new Array();
//教育经历列博熬
var edus = new Array();
//社交主页列表
var socials = new Array();
var levelArray = new Array("本科", "高中及以下","专科", "硕士", "博士");
var industrys = new Array();
var categorys = new Array();
var citys = new Array();

$(function(){
   $(".show_base_infor_left").on("mouseenter",function () {
       $(".show_base_infor_left").css("background-color","#F3F7F9");
       $("#editInforIcon").css("display","inline");
   }).on("mouseleave",function () {
       $(".show_base_infor_left").css("background-color","#ffffff");
       $("#editInforIcon").css("display","none");
   });

   $("#selectWorkExp").on("change",function () {
        var value = $("#selectWorkExp option:selected").val().trim();
        $("#workExpInput").val(value);
   });

   /*点击编辑按钮时*/
   $("#editInforIcon").on("click",function () {
       $(".show_base_infor").css("display","none");
       $(".edit_base_infor").css("display","block");
       $("#snameInput").val(seeker.sname);
       $("#status_select").val(seeker.status);
       $("#statusInput").val(seeker.status);
       if(seeker.sex == "男") {
           $("#male").css("background-color","#B9D3EE");
           $("#female").css("background-color","#ffffff");
           $("#sexInput").val("男");
       }else {
           $("#male").css("background-color","#ffffff");
           $("#female").css("background-color","#B9D3EE");
           $("#sexInput").val("女");
       }
       $("#selectWorkExp").val(seeker.workExp);
       $("#workExpInput").val(seeker.workExp);
       if(seeker.birth != ""){
           $("#birthInput").val(seeker.birth);
       }
       $("#weichatInput").val(seeker.weichat);
       $("#phoneInput").val(seeker.phone);
       $("#emailInput").val(seeker.email);
       $("#education_select").empty();
       for(var i = 0; i < levelArray.length; i++) {
           if(levelArray[i] == seeker.education) {
               $("#education_select").append("<option value='" + levelArray[i] + "' selected>" + levelArray[i] +"</option>");
           }else {
               $("#education_select").append("<option value='" + levelArray[i] + "'>" + levelArray[i] +"</option>");
           }
       }
       $("#eduInput").val(seeker.education);
   });
   $("#male").on("click",function () {
       $("#male").css("background-color","#B9D3EE");
       $("#female").css("background-color","#ffffff");
       $("#sexInput").val("男");
   });
   $("#female").on("click",function() {
        $("#male").css("background-color","#ffffff");
        $("#female").css("background-color","#B9D3EE");
        $("#sexInput").val("女");
    });
   $("#status_select").on("change",function () {
       var _status = $("#status_select option:selected").val().trim();
       $("#statusInput").val(_status);
   });
   $("#education_select").on("change",function () {
       var _edu = $("#education_select option:selected").val().trim();
       $("#eduInput").val(_edu);
   });
   $("#edit_base_infor_cancel").on("click",function () {
       $(".edit_base_infor").css("display","none");
       $(".show_base_infor").css("display","block");
   });

   $(".advantange_content").on("mouseenter",function () {
      $("#edit_advange_btn").css("display","block");
   }).on("mouseleave",function () {
       $("#edit_advange_btn").css("display","none");
   });

   $("#go_edit_advange").on("click",function () {
       $(".show_user_advantange").css("display","none");
       $(".edit_user_advantange").css("display","block");
       $("#advantageInput").val(seeker.advantage);
   });

   $("#cityInput").on("focus",function () {
      var top = $(".edit_hope_job").offset().top;
      $(".cityDiv").css("margin-top",top-200);
      showCityDiv();
   });

   $("#edit_advange_cancel").on("click",function () {
       $(".edit_user_advantange").css("display","none");
       $(".show_user_advantange").css("display","block");
   });

   $("#edit_hope_job_cancel").on("click",function () {
       $(".show_hope_job").css("display","block");
       $(".edit_hope_job").css("display","none");
   });
   $("#edit_practice_achieve_cancel").on("click",function () {
       $(".show_practice_experience").css("display","block");
       $(".edit_practice_experience").css("display","none");
   });
   $("#edit_project_cancel").on("click",function () {
       $(".show_project").css("display","block");
       $(".edit_project").css("display","none");
   });
   $("#select_edu_end").on("change",function () {
      var end = $("#select_edu_end option:selected").val();
      $("#edu_end").val(end);
   });
   $("#edit_edu_cancel").on("click",function () {
       $(".show_edu_exp").css("display","block");
       $(".edit_edu_exp").css("display","none");
   });
   $("#salarySelect").on("change",function () {
       var salary = $("#salarySelect option:selected").val().trim();
       $("#salaryInput").val(salary);
   });
   $("#edit_social_cancel").on("click",function () {
       $(".show_social").css("display","block");
       $(".edit_social").css("display","none");
   });
   $("#pIndustryInput").on("focus",function () {
       $("#opName").val("practice");
       var top = $(".edit_practice_experience").offset().top;
       $(".industryDiv").css("margin-top",top-200);
       showIndustryDiv();
   });

   $("#industryInput").on("focus",function () {
       $("#opName").val("hope");
       var top = $(".edit_hope_job").offset().top;
       $(".industryDiv").css("margin-top",top-200);
       showIndustryDiv();
   });
   $("#pCategoryInput").on("focus",function () {
       $("#cateOpName").val("practice");
       var top = $(".edit_practice_experience").offset().top;
       $(".categoryDiv").css("margin-top",top-200);
       showCateDiv();
   });
   $("#catetoryInput").on("focus",function () {
      $("#cateOpName").val("hope");
       var top = $(".edit_hope_job").offset().top;
       $(".categoryDiv").css("margin-top",top-200);
       showCateDiv();
   });

   $("#compInput").keyup(function () {
       $(".compList").css("display","block");
       var fullName = $("#compInput").val().trim();
       $.ajax({
           url : "http://localhost:8080/zhixin/boss/getCompByFull.action",
           data: String(fullName),
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
                   content = content + '<li id="'+item+'" onclick="choseComp(this)">'+subArray[1]+'</li>';
               }
               content = content + '</ul>';
               $(".compList").append(content);
               $(".compList").css("display","block");
           }
       });
   });
    //初始化开始工作时间
    initTime();
    var identity = $("#identity").val().trim();
    if(identity=="noUser") {
        alert("您尚未登录，登录后才可编辑在线简历。");
        window.location = "http://localhost:8080/zhixin/Common/login.jsp";
    }else {
        initData();
    }
});

//是否登录，已登录，返回true.
function isLogin() {
    var identity = $("#identity").val().trim();
    var flag = true;
    if(identity=="noUser") {
        alert("您尚未登录,登录后才可编辑在线简历");
        flag = false;
    }
    return flag;
}

function initTime(){
    var date = new Date();
    var str = date.getFullYear();

    var BirthStart = new Date();
    var BirthEnd = new Date();
    BirthStart.setFullYear(BirthStart.getFullYear()-16);
    BirthEnd.setFullYear(BirthEnd.getFullYear()-50);

    $("#birthInput").datetimepicker({
        format:'yyyy-mm',
        autoclose:true,
        todayBtn:true,
        startView: 'year',
        minView: 'year',
        maxView: 'decade',
        language: 'zh-CN',
        startDate: BirthEnd,
        endDate: BirthStart,
    });

    $("#pro_start").datetimepicker({
        format: 'yyyy-mm',
        autoclose: true,
        todayBtn: true,
        startView: 'year',
        minView: 'year',
        maxView: 'decade',
        language: 'zh-CN',
        endDate: date,
        bootcssVer:3
    }).on('changeDate',function (e) {
        var value = $("#pro_start").val();
        var temp = new Date();
        var index = value.indexOf('-');
        var y = Number(value.substring(0,index));
        var m = Number(value.substring(index+1,value.length));
        temp.setFullYear(y);
        temp.setMonth(m);
        $("#pro_end").datetimepicker({
            format: 'yyyy-mm',
            autoclose: true,
            todayBtn: true,
            startView: 'year',
            minView: 'year',
            maxView: 'decade',
            language: 'zh-CN',
            startDate: temp,
            bootcssVer:3
        });
    });

    $("#start_select").datetimepicker({
        format: 'yyyy-mm',
        autoclose: true,
        todayBtn: true,
        startView: 'year',
        minView: 'year',
        maxView: 'decade',
        language: 'zh-CN',
        endDate: date,
        bootcssVer:3
    }).on('changeDate',function (e) {
        var value = $("#start_select").val();
        var temp = new Date();
        var index = value.indexOf('-');
        var y = Number(value.substring(0,index));
        var m = Number(value.substring(index+1,value.length));
        temp.setFullYear(y);
        temp.setMonth(m);
        $("#end_select").datetimepicker({
            format: 'yyyy-mm',
            autoclose: true,
            todayBtn: true,
            startView: 'year',
            minView: 'year',
            maxView: 'decade',
            language: 'zh-CN',
            startDate: temp,
            bootcssVer:3
        });
    });

    $("#select_edu_start").datetimepicker({
        format: 'yyyy',
        startView: 4,
        minView:4,
        language: 'zh-CN',
        autoclose: true,
        startDate: "1989",
        endDate: str,
        bootcssVer:3
    }).on("changeDate",function () {
        var year = $("#select_edu_start").val();
        $("#select_edu_start").datetimepicker('hide');
        $("#select_edu_end").empty();
        year = Number(year);
        if(year == 1990) {
            $("#select_edu_end").append("<option value='1990' selected>1990</option>");
            $("#edu_end").val(1990);
        }else {
            for(var i = year+1; i < year+8; i++) {
                if(i == (year+1)) {
                    $("#select_edu_end").append("<option value='" + i + "' selected>" + i +"</option>");
                }else {
                    $("#select_edu_end").append("<option value='" + i + "'>" + i +"</option>");
                }
            }
            $("#edu_end").val(year+1);
        }
    });
}
//初始化各种数据
function initData(){
    initIndustryInfor();
    initCategoryInfor();
    initCityInfor();
    initBaseInfor();
    initHopeInfor();
    initPracticeInfor();
    initProInfor();
    initEduInfor();
    initSocialInfor();
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
//初始化行业信息
function initIndustryInfor() {
    $.ajax({
        url: "http://localhost:8080/zhixin/seeker/getIndustry.action",
        data: "haha",
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var obj = JSON.parse(data);
            var temp = obj["header"];
            var header = eval(temp);
            for(var i = 0; i < header.length; i++) {
                var str = obj[header[i]];
                var secondArr = eval(str);
                var array = new Array();
                for(var j = 0; j < secondArr.length; j++) {
                    array.push(secondArr[j]);
                }
                var item = {
                    first: header[i],
                    second: array
                }
                industrys.push(item);
            }
            setIndustryInfor();
        }
    });
}
//初始化城市信息
function initCityInfor() {
    $.ajax({
        url: "http://localhost:8080/zhixin/seeker/getCity.action",
        data: "haha",
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var obj = JSON.parse(data);
            var array = eval(obj.header);
            for(var i = 0; i < array.length; i++) {
                var item = {
                    sheng: array[i],
                    shi: new Array()
                };
                var str = obj[array[i]];
                var temp = eval(str);
                for(var j = 0; j < temp.length; j++) {
                    item.shi.push(temp[j]);
                }
                citys.push(item);
            }
            setCityInfor();
        }
    });
}
//初始化基本信息
function initBaseInfor(){
    var params = {
        uid: seeker.id
    }
    $.ajax({
        url: "http://localhost:8080/zhixin/seeker/getSeeker.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
           seeker = data;
           if(seeker.sname == "") { seeker.sname = "暂无数据"}
           if(seeker.sex == true) {seeker.sex = "男"}
           else {seeker.sex = "女"}
           if(seeker.weichat == "") {seeker.weichat = "暂无数据"}
           if(seeker.email == "") {seeker.email = "暂无数据"}
           if(seeker.education == "") {seeker.education = "本科"}
           if(seeker.updateTime == "") {seeker.updateTime = "暂无数据"}
           if(seeker.workExp == "") {seeker.workExp = "应届生"}
           setBaseInfor();
           setAdvantage();
        }
    });
}
//初始化期望职位
function initHopeInfor(){
    $.ajax({
        url: "http://localhost:8080/zhixin/seeker/getHopeByUserId.action",
        data: String(seeker.id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            hopes = new Array();
            for(var i = 0; i < array.length; i++) {
                hopes.push(array[i]);
            }
            setHopeInfor();
        }
    });
}
//初始化实习经历
function initPracticeInfor() {
    var uid = seeker.id;
    $.ajax({
        url: "http://localhost:8080/zhixin/seeker/getPracticeByUserId.action",
        data: String(uid),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            practices = new Array();
            for(var i = 0; i < array.length; i++) {
                practices.push(array[i]);
            }
            setPracticeInfor();
        }
    });
}
/*初始化项目经历*/
function initProInfor(){
    var uid = seeker.id;
    $.ajax({
        url: "http://localhost:8080/zhixin/seeker/getProByUserId.action",
        data: String(uid),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var arr = eval(data);
            pros = new Array();
            for(var i = 0; i < arr.length; i++) {
                pros.push(arr[i]);
            }
            setProInfor();
        }
    });
}
/*初始化教育经历列表*/
function initEduInfor(){
    var uid = seeker.id;
    $.ajax({
        url: "http://localhost:8080/zhixin/seeker/getEduByUserId.action",
        data: String(uid),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var arr = eval(data);
            edus = new Array();
            for(var i = 0; i < arr.length; i++) {
                edus.push(arr[i]);
            }
            setEduInfor();
        }
    });
}
/*初始化社交主页列表*/
function initSocialInfor(){
    $.ajax({
        url: "http://localhost:8080/zhixin/seeker/getSocialByUserId.action",
        data: String(seeker.id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var arr = eval(data);
            socials = new Array();
            for(var i = 0; i < arr.length; i++) {
                socials.push(arr[i]);
            }
            setSocials();
        }
    });
}
//设置行业类别
function setIndustryInfor(){
    var content = "";
    for(var i = 0; i < industrys.length; i++) {
        var section = '<div class="industry_item">\n' +
                '                    <div class="industry_first">\n' +
                '                        <label>' + industrys[i].first + '</label>\n' +
                '                    </div>\n' +
                '                    <div class="industry_second">\n';
        var array = industrys[i].second;
        var index,temp,second,id,len;
        for(var j = 0; j < array.length; j++) {
            index = array[j].indexOf("_");
            len = array[j].length;
            id = array[j].substring(0,index);
            second = array[j].substring(index+1,len);
            temp = id + "_" + second;
            section = section + '<label id="' + temp + '" class="industry_name" onclick="chose_industry(this)">' + second + '</label>';
        }
        section = section + '</div>\n' +
            '                </div>\n';
        content = content + section;
    }
    $(".industry_down").empty();
    $(".industry_down").append(content);
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
//设置城市信息
function setCityInfor() {
    $(".cityDown").empty();
    $(".cityDown").append('<div class="city_list">\n' +
        '                        <label>全国</label></br><label onclick="chose_city(this)">全国</label>' +
        '                    </div>');
    for(var i = 0; i < citys.length; i++) {
        if(citys[i].sheng == "全国") continue;
        else {
            var section = '<div class="city_list">\n' +
                '                        <label>'+citys[i].sheng+'</label></br>';
            var array = citys[i].shi;
            for(var j = 0; j < array.length; j++) {
                section = section + '<label onclick="chose_city(this)">'+array[j]+'</label>';
            }
            section += '</div>';
            $(".cityDown").append(section);
        }
    }
}
//设置基本信息
function setBaseInfor() {
    $("#sname").html(seeker.sname);
    $("#seekerPhoto").attr("src","/seekerPic/" + seeker.psrc);
    $("#lastUpdateTime").html("最后更新: " + seeker.updateTime);
    $("#user_name").html(seeker.sname);
    $("#user_beginWorkTime").html(seeker.workExp);
    $("#user_education").html(seeker.education);
    $("#user_status").html(seeker.status);
    $("#user_phone").html(seeker.phone);
    $("#user_email").html(seeker.email);
    if(seeker.sex=="男") {
        $("#user_sex").attr("src","../images/male.png");
    }else {
        $("#user_sex").attr("src","../images/female.png");
    }
    $("#user_photo").attr("src","/seekerPic/" + seeker.psrc);
}
//设置个人优势
function setAdvantage() {
    $("#show_advange_content").empty();
    $("#show_advange_content").html(seeker.advantage);
}
//设置期望职位
function setHopeInfor(){
    $(".show_hope_job").empty();
    $(".show_hope_job").append('<label class="mySign"></label><label class="show_title_label">期望职位</label></br>');
    for(var i = 0; i < hopes.length; i++) {
        $(".show_hope_job").append('<div class="hope_job_item" onmouseenter="mouse_enter(this)" onmouseleave="mouse_leave(this)">\n' +
            '                    <span class="glyphicon glyphicon-star"></span>\n' +
            '                    <label class="hopeColumn">'+hopes[i].category+'</label>\n' +
            '                    <span class="glyphicon glyphicon-yen"></span>\n' +
            '                    <label class="hopeColumn">'+hopes[i].salary+'</label>\n' +
            '                    <span class="glyphicon glyphicon-heart"></span>\n' +
            '                    <label class="hopeColumn">'+hopes[i].industry+'</label>\n' +
            '                    <span class="glyphicon glyphicon-map-marker"></span>\n' +
            '                    <label class="hopeColumn">'+hopes[i].city+'</label>\n' +
            '                    <span class="glyphicon glyphicon-trash hope_trash" id="hopeTrash_'+hopes[i].id+'" onclick="deleteInfor(this)"></span>\n' +
            '                    <span class="glyphicon glyphicon-edit hope_edit" id="hopeEdit_'+hopes[i].id+'" onclick="hope_edit_click(this)"></span>\n' +
            '                </div>');
    }
    $(".show_hope_job").append(' <div class="hope_job_item" onmouseenter="mouse_enter(this)" onmouseleave="mouse_leave(this)">\n' +
        '                    <span class="glyphicon glyphicon-plus hope_plus"></span><label id="add_hope_job_label" onclick="addHope()">添加期望职位</label>\n' +
        '                </div>\n' +
        '                <div class="blank"></div>');
}
function getSimple(str) {
    var index = str.lastIndexOf("_");
    var temp = str.substring(index+1,str.length);
    return temp;
}
//设置实习经历
function setPracticeInfor(){
    $(".show_practice_experience").empty();
    $(".show_practice_experience").append(' <label class="mySign"></label><label class="show_title_label">实习经历</label>');
    for(var i = 0; i < practices.length; i++) {
        $(".show_practice_experience").append('<div class="pe_item" onmouseenter="mouse_enter(this)" onmouseleave="mouse_leave(this)">\n' +
            '                    <label>'+practices[i].comp+'</label><label>'+ practices[i].start + '至' + practices[i].end +'</label>\n' +
            '                    <span class="glyphicon glyphicon-trash practice_trash" id="practiceTrash_' + practices[i].id +'" onclick="deleteInfor(this)"></span>\n' +
            '                    <span class="glyphicon glyphicon-edit practice_edit" id="practiceEdit_' + practices[i].id +'" onclick="practice_edit_click(this)"></span></br>\n' +
            '                    <label>'+practices[i].depart+'</label><label>'+ practices[i].job+'</label></br>\n' +
            '                    <label>工作内容</label></br>\n' +
            '                    <div class="show_practice_content">\n' + practices[i].content +
            '                    </div>\n' +
            '                    <label>工作业绩</label></br>\n' + practices[i].achieve +
            '                    <div class="show_practice_achieve">\n' +
            '                    </div>\n' +
            '                </div>');
    }
    $(".show_practice_experience").append('<div class="hope_job_item" onmouseenter="mouse_enter(this)" onmouseleave="mouse_leave(this)">\n' +
        '                    <span class="glyphicon glyphicon-plus hope_plus"></span><label id="add_practice_experience_label" onclick="add_practice()">添加实习经历</label>\n' +
        '                </div>\n' +
        '                <div class="blank"></div>');

}
/*设置项目经历*/
function setProInfor(){
    $(".show_project").empty();
    $(".show_project").append('<label class="mySign"></label><label class="show_title_label">项目经历</label>');
    for(var i = 0; i < pros.length; i++) {
        $(".show_project").append('<div class="project_item" onmouseenter="mouse_enter(this)" onmouseleave="mouse_leave(this)">\n' +
            '                    <label style="width: 140px;">' +  pros[i].name + '</label><label style="width: 140px">' + pros[i].start + '至' + pros[i].end + '</label>\n' +
            '                    <span class="glyphicon glyphicon-trash project_trash" id="proTrash_'+ pros[i].id + '" onclick="deleteInfor(this)"></span>\n' +
            '                    <span class="glyphicon glyphicon-edit project_edit" id="proEdit_' + pros[i].id +'" onclick="pro_edit_click(this)"></span></br>\n' +
            '                    <label>' + pros[i].role + '</label></br>\n' +
            '                    <label>项目描述</label></br>\n' +
            '                    <div class="project_content">' + pros[i].content + '</div>\n' +
            '                    <label>项目业绩</label>\n' +
            '                    <div class="project_achieve">' + pros[i].achieve + '</div>\n' +
            '                </div>');
    }
    $(".show_project").append('<div class="hope_job_item" onmouseenter="mouse_enter(this)" onmouseleave="mouse_leave(this)">\n' +
        '                    <span class="glyphicon glyphicon-plus hope_plus"></span><label id="add_project_label" onclick="add_project()">添加项目经历</label>\n' +
        '                </div>\n' +
        '                <div class="blank"></div>');
}
/*设置教育经历*/
function setEduInfor(){
    $(".show_edu_exp").empty();
    $(".show_edu_exp").append(' <label class="mySign"></label><label id="show_edu_exp_label" class="show_title_label">教育经历</label>');
    for(var i = 0; i < edus.length; i++) {
        $(".show_edu_exp").append('<div class="edu_item" onmouseenter="mouse_enter(this)" onmouseleave="mouse_leave(this)">\n' +
            '                    <label>' + edus[i].school + '</label>\n' +
            '                    <label>' + edus[i].start + "-" + edus[i].end + '</label>\n' +
            '                    <label>' + edus[i].major + '</label>\n' +
            '                    <label>' + edus[i].level + '</label>\n' +
            '                    <span class="glyphicon glyphicon-trash edu_trash" id="eduTrash_' + edus[i].id + '" onclick="deleteInfor(this)"></span>\n' +
            '                    <span class="glyphicon glyphicon-edit edu_edit" id="eduEdit_' + edus[i].id + '" onclick="edu_edit_click(this)"></span>\n' +
            '                </div>');
    }
    $(".show_edu_exp").append('<div class="hope_job_item" onmouseenter="mouse_enter(this)" onmouseleave="mouse_leave(this)">\n' +
        '                    <span class="glyphicon glyphicon-plus hope_plus"></span><label id="add_edu_label" onclick="add_edu()">添加教育经历</label>\n' +
        '                </div>\n' +
        '                <div class="blank"></div>');
}
//设置社交主页
function setSocials() {
    $(".show_social").empty();
    $(".show_social").append('<label class="mySign"></label><label id="show_social_label" class="show_title_label">社交主页</label>');
    var item;
    for(var i = 0; i < socials.length; i++){
        item = socials[i];
        $(".show_social").append('<div class="social_item" onmouseenter="mouse_enter(this)" onmouseleave="mouse_leave(this)">\n' +
            '                    <span class="glyphicon glyphicon-star-empty"></span><label>' + item.url +'</label>\n' +
            '                    <span class="glyphicon glyphicon-trash social_trash" id="socialTrash_' + item.id + '" onclick="deleteInfor(this)"></span>\n' +
            '                    <span class="glyphicon glyphicon-edit social_edit" id="edit_' + item.id + '" onclick="social_edit_click(this)"></span>\n' +
            '                </div>');
    }
    $(".show_social").append(' <div class="hope_job_item" onmouseenter="mouse_enter(this)" onmouseleave="mouse_leave(this)">\n' +
        '                    <span class="glyphicon glyphicon-plus hope_plus"></span><label id="add_social_label" onclick="add_social()">添加社交主页</label>\n' +
        '                </div>');
    $(".show_social").append('<div class="blank"></div>');
}
//鼠标进入指定区域后让div变色
function mouse_enter(obj) {
    $(obj).css("background-color","#F3F7F9");
}
//鼠标离开指定区域后恢复原来的颜色
function mouse_leave(obj) {
    $(obj).css("background-color","#ffffff");
}
//处理选择行业事件
function chose_industry(obj) {
    var value = obj.id;
    var op = $("#opName").val();
    var index = value.indexOf("_");
    var id = value.substring(0,index);
    var industry = value.substring(index+1,value.length);
    if(op == "practice") {
        $("#pIndustryInput").val(industry);
        $("#pIndustryIdInput").val(id);
    }else if(op == "hope"){
        $("#industryInput").val(industry);
        $("#industryIdInput").val(id);
    }
    closeIndustryDiv();
}
//处理选择公司事件
function choseComp(obj) {
    var _id = obj.id;
    var array = _id.split(";");
    $("#compIdInput").val(array[0]);
    $("#compInput").val(array[1]);
    $(".compList").css("display","none");
}
//编辑期望职位
function hope_edit_click(obj) {
    var _id = obj.id;
    var id = getSimple(_id);
    $("#jobId").val(id);
    $("#jobOp").val("update");
    for(var i = 0; i < hopes.length; i++) {
        if(id == hopes[i].id) {
            $("#catetoryInput").val(hopes[i].category);
            $("#categoryIdInput").val(hopes[i].cateId);
            $("#salarySelect").val(hopes[i].salary);
            $("#salaryInput").val(hopes[i].salary)
            $("#industryInput").val(hopes[i].industry);
            $("#industryIdInput").val(hopes[i].industryId);
            $("#cityInput").val(hopes[i].city);
            break;
        }
    }
    $(".show_hope_job").css("display","none");
    $(".edit_hope_job").css("display","block");
}
//编辑工作经历
function practice_edit_click(obj){
    var _id = obj.id;
    var index = _id.indexOf("_")+1;
    var id = _id.substring(index,_id.length);
    $("#practiceId").val(id);
    $("#practiceOp").val("update");
    for(var i = 0; i < practices.length; i++) {
        if(id == practices[i].id) {
            $("#compInput").val(practices[i].comp);
            $("#compIdInput").val(practices[i].compId);
            $("#pIndustryIdInput").val(practices[i].industryId);
            $("#pIndustryInput").val(practices[i].industry);
            $("#departInput").val(practices[i].depart);
            $("#jobNameInput").val(practices[i].job);
            $("#pCategoryInput").val(practices[i].category);
            $("#pCategoryIdInput").val(practices[i].cateId);
            $("#start_select").val(practices[i].start);
            $("#end_select").val(practices[i].end);
            $("#practice_content").val(practices[i].content);
            $("#practice_achieve").val(practices[i].achieve);
            break;
        }
    }
    $(".show_practice_experience").css("display","none");
    $(".edit_practice_experience").css("display","block");
}
//编辑项目经历
function pro_edit_click(obj) {
    $(".show_project").css("display","none");
    $(".edit_project").css("display","block");
    var _id = obj.id;
    var index = _id.indexOf("_")+1;
    var id = _id.substring(index,_id.length);
    $("#proId").val(id);
    $("#proOp").val("update");
    for(var i = 0; i < pros.length; i++) {
        if(pros[i].id == id) {
            $("#proNameInput").val(pros[i].name);
            $("#roleInput").val(pros[i].role);
            $("#pro_start").val(pros[i].start);
            $("#pro_end").val(pros[i].end);
            $("#urlInput").val(pros[i].url);
            $("#pro_content").val(pros[i].content);
            $("#pro_achieve").val(pros[i].achieve);
            break;
        }
    }
}
//编辑社交主页链接
function social_edit_click(obj) {
    $(".show_social").css("display","none");
    $(".edit_social").css("display","block");
    var _id = obj.id;
    var start = _id.indexOf("_")+1;
    var id = _id.substring(start,_id.length);
    for(var i = 0; i < socials.length; i++) {
        if(socials[i].id == id) {
            $("#socialIdInput").val(id);
            $("#socialInput").val(socials[i].url);
            break;
        }
    }
    $("#socialOp").val("update");
}
//编辑教育经历
function edu_edit_click(obj) {
    $(".show_edu_exp").css("display","none");
    $(".edit_edu_exp").css("display","block");
    var _id = obj.id;
    var start = _id.indexOf("_")+1;
    var id = _id.substring(start,_id.length);
    $("#eduIdInput").val(id);
    $("#eduOp").val("update");
    for(var i = 0; i < edus.length; i++) {
        if(edus[i].id == id) {
            $("#schoolNameInput").val(edus[i].school);
            $("#majorInput").val(edus[i].major);
            $("#edu_select").empty();
            for(var j = 0; j < levelArray.length; j++) {
                if(edus[i].level == levelArray[j]) {
                    $("#edu_select").append("<option value='" + levelArray[j] + "' selected>" + levelArray[j] + "</option>");
                }else {
                    $("#edu_select").append("<option value='" + levelArray[j] + "'>" + levelArray[j] + "</option>");
                }
            }
            $("#levelInput").val(edus[i].level);
            $("#select_edu_start").val(edus[i].start);
            $("#edu_end").val(edus[i].end);
            $("#select_edu_end").empty();
            $("#select_edu_end").append("<option value='" + edus[i].end + "'>" + edus[i].end + "</option>");
            break;
        }
    }
}
//添加期望职位
function addHope(){
    $("#catetoryInput").val("");
    $("#categoryIdInput").val("");
    $("#salaryInput").val("3K以下");
    $("#industryInput").val("");
    $("#industryIdInput").val("");
    $("#cityInput").val("");
    $("#jobOp").val("add");
    $(".show_hope_job").css("display","none");
    $(".edit_hope_job").css("display","block");
}
//添加工作经历
function add_practice(){
    $(".show_practice_experience").css("display","none");
    $(".edit_practice_experience").css("display","block");
    $("#compInput").val("");
    $("#compIdInput").val("");
    $("#pIndustryInput").val("");
    $("#pIndustryIdInput").val("");
    $("#departInput").val("");
    $("#jobNameInput").val("");
    $("#pCategoryInput").val("");
    $("#pCategoryIdInput").val("");
    $("#start_select").val("");
    $("#end_select").val("");
    $("#practice_content").val("");
    $("#practice_achieve").val("");
    $("#practiceOp").val("add");
}
//添加项目经历
function add_project() {
    $(".show_project").css("display","none");
    $(".edit_project").css("display","block");
    $("#proNameInput").val("");
    $("#roleInput").val("");
    $("#pro_start").val("");
    $("#pro_end").val("");
    $("#urlInput").val("");
    $("#pro_content").val("");
    $("#pro_achieve").val("");
    $("#proOp").val("add");
}
//添加教育经历
function add_edu() {
    $(".show_edu_exp").css("display","none");
    $(".edit_edu_exp").css("display","block");
    $("#eduIdInput").empty();
    $("#eduOp").val("add");
    $("#select_edu_start").empty();
    var date = new Date();
    var curYear = date.getFullYear();
    $("#select_edu_end").empty();
    $("#schoolNameInput").empty();
    $("#edu_select").empty();
    for(var i = 0; i < levelArray.length; i++) {
        if(levelArray[i]=="本科") {
            $("#edu_select").append("<option value='本科' selected>本科</option>");
        }else{
            $("#edu_select").append("<option value='" + levelArray[i] +"'>" + levelArray[i] +"</option>");
        }
    }
    $("#levelInput").val("本科");
    $("#majorInput").empty();
}
//添加社交主页链接
function add_social(){
    $(".show_social").css("display","none");
    $(".edit_social").css("display","block");
    $("#socialOp").val("add");
    $("#socialInput").empty();
}
//检测基本信息
function checkBaseInfor(){
    var _sname = $("#snameInput").val().trim();
    if(_sname==null || _sname==""){
        alert("请填写姓名");
        $("#snameInput").focus();
        return false;
    }
    var _workExp = $("#workExpInput").val().trim();
    if(_workExp==null || _workExp==""){
        alert("请选择工作经验");
        $("#selectWorkExp").focus();
        return false;
    }
    var _birth = $("#birthInput").val().trim();
    if(_birth==null || _birth=="") {
        alert("请选择出生年月");
        $("#birthInput").focus();
        return false;
    }
    var _weichat = $("#weichatInput").val().trim();
    if(_weichat==null || _weichat==""){
        alert("请填写微信号");
        $("#weichatInput").focus();
        return false;
    }
    var _email = $("#emailInput").val().trim();
    if(_email==null || _email=="") {
        alert("请填写邮箱");
        $("#emailInput").focus();
        return false;
    }
    return true;
}
//检测期望职位
function checkHopeInfor(){
    var category = $("#catetoryInput").val().trim();
    if(category==null || category=="") {
        alert("请选择期望职位类型");
        $("#categoryInput").focus();
        return false;
    }
    var industry = $("#industryInput").val().trim();
    if(industry==null || industry=="") {
        alert("请选择期望从事的行业");
        $("#industryInput").focus();
        return false;
    }
    var city = $("#cityInput").val().trim();
    if(city==null || city=="") {
        alert("请选择期望城市");
        city.focus();
        return false;
    }
    return true;
}
//检测实习经历信息
function checkPracticeInfor() {
    var compId = $("#compIdInput").val().trim();
    if(compId==0){
        alert("您输入的公司不存在，请重新填写");
        $("#compInput").focus();
        return false;
    }
    var industryId = $("#pIndustryIdInput").val().trim();
    if(industryId==null || industryId=="") {
        alert("请选择所属行业");
        $("#pIndustryInput").focus();
        return false;
    }
    var cateId = $("#pCategoryIdInput").val().trim();
    if(cateId==null || cateId=="") {
        alert("请选择职位类型");
        $("#pCategoryInput").focus();
        return false;
    }
    var start = $("#start_select").val().trim();
    if(start==null || start=="") {
        alert("请选择实习开始时间");
        $("#start_select").focus();
        return false;
    }
    var end = $("#end_select").val().trim();
    if(end==null || end=="") {
        alert("请选择实习结束时间");
        return false;
    }
    return true;
}
//检测项目经历
function checkProInfor(){
    var name = $("#proNameInput").val().trim();
    if(name==null || name=="") {
        alert("请填写项目名称");
        $("#proNameInput").focus();
        return false;
    }
    var role = $("#roleInput").val().trim();
    if(role==null || role=="")  {
        alert("请填写您在项目中承担的角色");
        $("#roleInput").focus();
        return false;
    }
    var start = $("#pro_start").val().trim();
    if(start==null || start=="") {
        alert("请选择项目起始时间");
        $("#pro_start").focus();
        return false;
    }
    var end = $("#pro_end").val().trim();
    if(end==null || end=="") {
        alert("请选择项目结束时间");
        $("#pro_end").focus();
        return false;
    }
    return true;
}
//检测教育经历
function checkEduInfor() {
    var _start = $("#select_edu_start").val().trim();
    if(_start==null || _start=="") {
        alert("请选择请选择起始时间");
        $("#select_edu_start").focus();
        return false;
    }
    var _end = $("#edu_end").val().trim();
    if(_end==null || _end==""){
        alert("请选择终止时间");
        $("#select_edu_end").focus();
        return true;
    }
    var _school = $("#schoolNameInput").val().trim();
    if(_school==null || _school=="") {
        alert("请填写学校名称");
        $("#schoolNameInput").focus();
        return false;
    }
    var _level = $("#levelInput").val().trim();
    if(_level==null || _level=="") {
        alert("请选择学历");
        $("#edu_select").focus();
        return false;
    }
    var _major = $("#majorInput").val().trim();
    if(_major==null || _major=="") {
        alert("请填写专业信息");
        $("#majorInput").focus();
        return false;
    }
    return true;
}
//更新基本信息
function updateBaseInfor(){
    if(isLogin() == false) {
        alert("登录已过期，请重新登录");
        window.location ="http://localhost:8080/zhixin/Common/login.jsp";
    } else {
        var result = checkBaseInfor();
        if(result == false) return;
        var _sname = $("#snameInput").val().trim();
        var _status = $("#statusInput").val().trim();
        var _sex;
        if($("#sexInput").val().trim()=="男"){
            _sex = true;
        }else {
            _sex = false;
        }
        var _workExp = $("#workExpInput").val().trim();
        var _birth = $("#birthInput").val().trim();
        var _weichat = $("#weichatInput").val().trim();
        var _phone = $("#phoneInput").val().trim();
        var _email = $("#emailInput").val().trim();
        var _education = $("#eduInput").val().trim();
        var date = new Date();
        var _updateTime = date.getFullYear()+"-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        var item = {
            workExp: _workExp,
            birth: _birth,
            code: "",
            cvPath:"",
            email: _email,
            phone: _phone,
            psrc: "icon_face.jpg",
            sex: _sex,
            sname: _sname,
            status: _status,
            updateTime: _updateTime,
            weichat: _weichat,
            education: _education
        };
        $.ajax({
            url: "http://localhost:8080/zhixin/seeker/updateSeeker.action",
            data: JSON.stringify(item),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                if(data==true) {
                    alert("修改基本信息成功");
                    seeker.sname = _sname;
                    seeker.status = _status;
                    seeker.sex = $("#sexInput").val();
                    seeker.beginWorkTime = _workExp;
                    seeker.birth = _birth;
                    seeker.weichat = _weichat;
                    seeker.email = _email;
                    seeker.education = _education;
                    setBaseInfor();
                    $(".show_base_infor").css("display","block");
                    $(".edit_base_infor").css("display","none");
                }else {
                    alert("修改失败请稍后再试");
                }
            }
        });
    }
}
//更新个人优势
function updateAdvantage() {
    if(isLogin() == false) {
        alert("登录已过期，请重新登录");
        window.location ="http://localhost:8080/zhixin/Common/login.jsp";
    } else {
        var _adv = $("#advantageInput").val();
        var _phone = seeker.phone;
        var params = {
            advantage : _adv,
            phone: _phone
        };
        $.ajax({
            url: "http://localhost:8080/zhixin/seeker/updateAdvange.action",
            data: JSON.stringify(params),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                if(data==true) {
                    alert("修改个人优势成功");
                    seeker.advantage = _adv;
                    setAdvantage();
                    $(".show_user_advantange").css("display","block");
                    $(".edit_user_advantange").css("display","none");
                }else {
                    alert("修改个人优势失败");
                }
            }
        });
    }
}
//更新期望职位
function updateHope(){
    if(isLogin() == false) {
        alert("登录已过期，请重新登录");
        window.location ="http://localhost:8080/zhixin/Common/login.jsp";
    } else {
        if(checkHopeInfor()==false) return;
        var _id = $("#jobId").val().trim();
        var _userId = seeker.id;
        var _category = $("#catetoryInput").val().trim();
        var _cateId = $("#categoryIdInput").val().trim();
        var _salary = $("#salaryInput").val().trim();
        var _industry = $("#industryInput").val().trim();
        var _industryId = $("#industryIdInput").val().trim();
        var _city = $("#cityInput").val().trim();
        var item = {
            id: _id,
            userId: _userId,
            category: _category,
            cateId: _cateId,
            salary: _salary,
            industry: _industry,
            industryId: _industryId,
            city: _city
        };
        var op = $("#jobOp").val().trim();
        if(op == "update") {
            $.ajax({
                url: "http://localhost:8080/zhixin/seeker/updateHope.action",
                data: JSON.stringify(item),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function (data) {
                    if(data==true) {
                        alert("修改期望职位成功");
                        for(var i = 0; i < hopes.length; i++) {
                            if(hopes[i].id == item.id) {
                                hopes[i] = item;
                                break;
                            }
                        }
                        $(".edit_hope_job").css("display","none");
                        $(".show_hope_job").css("display","block");
                        setHopeInfor();
                    }else {
                        alert("修改期望职位失败，请稍后尝试");
                    }
                }
            });
        }else if(op == "add") {
            item.id = "";
            $.ajax({
                url: "http://localhost:8080/zhixin/seeker/insertHope.action",
                data: JSON.stringify(item),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function (data) {
                    if(data != -1) {
                        alert("添加期望职位成功");
                        item.id = data;
                        hopes.push(item);
                        $(".edit_hope_job").css("display","none");
                        $(".show_hope_job").css("display","block");
                        setHopeInfor();
                    }else {
                        alert("添加期望职位失败，请稍后尝试");
                    }
                }
            });
        }
    }
}
//更新实习经历
function update_practice(){
    if(isLogin() == false) {
        alert("登录已过期，请重新登录");
        window.location ="http://localhost:8080/zhixin/Common/login.jsp";
    } else {
        if(checkPracticeInfor()==false) return;
        var _id = $("#practiceId").val().trim();
        var _phone = seeker.phone;
        var _comp = $("#compInput").val().trim();
        var _industry = $("#pIndustryInput").val().trim();
        var _depart = $("#departInput").val().trim();
        var _job = $("#jobNameInput").val().trim();
        var _category = $("#pCategoryInput").val().trim();
        var _start = $("#start_select").val().trim();
        var _end = $("#end_select").val().trim();
        var _content = $("#practice_content").val().trim();
        var _achieve = $("#practice_achieve").val().trim();
        var item = {
            id: _id,
            comp: _comp,
            industry: _industry,
            depart: _depart,
            job: _job,
            category: _category,
            start: _start,
            end: _end,
            content: _content,
            achieve: _achieve,
            userId: $("#uid").val().trim(),
            cateId: $("#pCategoryIdInput").val().trim(),
            industryId: $("#pIndustryIdInput").val().trim(),
            compId: $("#compIdInput").val().trim()
        };
        var op = $("#practiceOp").val().trim();
        if(op=="update") {
            $.ajax({
                url: "http://localhost:8080/zhixin/seeker/updatePractice.action",
                data: JSON.stringify(item),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function (data) {
                    if(data==true) {
                        alert("修改实习经历成功");
                        for(var i = 0; i < practices.length; i++) {
                            if(practices[i].id == item.id) {
                                practices[i] = item;
                                break;
                            }
                        }
                        $(".edit_practice_experience").css("display","none");
                        $(".show_practice_experience").css("display","block");
                        setPracticeInfor();
                    }else {
                        alert("修改实习经历失败，请稍后尝试");
                    }
                }
            });
        }else {
            item.id = "";
            $.ajax({
                url: "http://localhost:8080/zhixin/seeker/insertPractice.action",
                data: JSON.stringify(item),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function (data) {
                    if(data != -1) {
                        alert("添加实习经历成功");
                        item.id = data;
                        practices.push(item);
                        $(".edit_practice_experience").css("display","none");
                        $(".show_practice_experience").css("display","block");
                        setPracticeInfor();
                    }else {
                        alert("添加实习经历失败，请稍后尝试");
                    }
                }
            });
        }
    }
}
//更新项目经历
function update_pro(){
    if(isLogin() == false) {
        alert("登录已过期，请重新登录");
        window.location ="http://localhost:8080/zhixin/Common/login.jsp";
    } else {
        if(checkProInfor()==false) return;
        var op = $("#proOp").val();
        var _id = $("#proId").val();
        var _phone = seeker.phone;
        var _name = $("#proNameInput").val().trim();
        var _role = $("#roleInput").val().trim();
        var _start = $("#pro_start").val().trim();
        var _end = $("#pro_end").val().trim();
        var _url = $("#urlInput").val().trim();
        var _content = $("#pro_content").val().trim();
        var _achieve = $("#pro_achieve").val().trim();
        var item = {
            id: _id,
            phone: _phone,
            name: _name,
            role: _role,
            start: _start,
            end: _end,
            url: _url,
            content: _content,
            achieve: _achieve
        };
        if(op=="update") {
            $.ajax({
                url: "http://localhost:8080/zhixin/seeker/updateProject.action",
                data: JSON.stringify(item),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function (data){
                    if(data==true) {
                        alert("修改项目经历成功");
                        for(var i = 0; i < pros.length; i++) {
                            if(pros[i].id == _id) {
                                pros[i].name = item.name;
                                pros[i].role = item.role;
                                pros[i].start = item.start;
                                pros[i].end = item.end;
                                pros[i].url = item.url;
                                pros[i].content = item.content;
                                pros[i].achieve = item.achieve;
                                break;
                            }
                        }
                        $(".edit_project").css("display","none");
                        $(".show_project").css("display","block");
                        setProInfor();
                    }else {
                        alert("修改项目经历失败");
                    }
                }
            });
        }else {
            item.id = "";
            $.ajax({
                url: "http://localhost:8080/zhixin/seeker/insertProject.action",
                data: JSON.stringify(item),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function (data) {
                    if(data==-1) {
                        alert("添加项目经历失败，请稍后尝试");
                    }else {
                        alert("添加项目经历成功");
                        $(".edit_project").css("display","none");
                        $(".show_project").css("display","block");
                        item.id = data;
                        pros.push(item);
                        setProInfor();
                    }
                }
            });
        }
    }
}
//更新社交主页
function update_social() {
    if(isLogin() == false) {
        alert("登录已过期，请重新登录");
        window.location ="http://localhost:8080/zhixin/Common/login.jsp";
    } else {
        var op = $("#socialOp").val();
        var _url = $("#socialInput").val().trim();
        if(_url==null || _url=="") {
            alert("请填写社交网页地址");
            $("#socialInput").focus();
            return;
        }
        if(op == "update"){
            var _id = $("#socialIdInput").val().trim();
            var params = {
                id : _id,
                userId: seeker.id,
                url: _url,
            };
            $.ajax({
                url: "http://localhost:8080/zhixin/seeker/updateSocial.action",
                data: JSON.stringify(params),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function (data) {
                    if(data==true) {
                        alert("修改社交网址成功");
                        for(var i = 0; i < socials.length; i++) {
                            if(socials[i].id == _id){
                                socials[i].url = _url;
                                break;
                            }
                        }
                        $(".edit_social").css("display","none");
                        $(".show_social").css("display","block");
                        setSocials();
                    }else{
                        alert("修改社交网址失败，请稍后尝试");
                    }
                }
            });
        } else if(op=="add"){
            var params = {
                id : "",
                userId: seeker.id,
                url : _url
            };
            $.ajax({
                url: "http://localhost:8080/zhixin/seeker/insertSocial.action",
                data: JSON.stringify(params),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function(data) {
                    if(data == -1) {
                        alert("添加社交主页失败，请稍后再试！");
                    }else {
                        alert("添加社交主页成功");
                        params.id = data;
                        socials.push(params);
                        $(".edit_social").css("display","none");
                        $(".show_social").css("display","block");
                        setSocials();
                    }
                }
            });
        }
    }
}
//更新教育经历
function update_edu(){
    if(isLogin() == false) {
        alert("登录已过期，请重新登录");
        window.location ="http://localhost:8080/zhixin/Common/login.jsp";
    } else {
        if(checkEduInfor() == false) return;
        var op = $("#eduOp").val().trim();
        var _id = $("#eduIdInput").val().trim();
        var _phone = seeker.phone;
        var _school = $("#schoolNameInput").val().trim();
        var _start = $("#select_edu_start").val().trim();
        var _end = $("#edu_end").val().trim();
        var _major = $("#majorInput").val().trim();
        var _level = $("#levelInput").val().trim();
        var item = {
            id: _id,
            userId: $("#uid").val().trim(),
            school: _school,
            start: _start,
            end: _end,
            major: _major,
            level: _level
        };
        if(op == "update") {
            $.ajax({
                url: "http://localhost:8080/zhixin/seeker/updateEdu.action",
                data: JSON.stringify(item),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function (data) {
                    if(data==true) {
                        alert("修改教育经历成功");
                        for(var i = 0; i < edus.length; i++) {
                            if(edus[i].id == _id) {
                                edus[i].phone = item.phone;
                                edus[i].school = item.school;
                                edus[i].start = item.start;
                                edus[i].end = item.end;
                                edus[i].major = item.major;
                                edus[i].level = item.level;
                                break;
                            }
                        }
                        $(".edit_edu_exp").css("display","none");
                        $(".show_edu_exp").css("display","block");
                        setEduInfor();
                    }else {
                        alert("修改教育经历失败，稍后尝试");
                    }
                }
            });
        }else {
            item.id = "";
            $.ajax({
                url: "http://localhost:8080/zhixin/seeker/insertEdu.action",
                data: JSON.stringify(item),
                contentType: "application/json;charset=UTF-8",
                async: false,
                type: "post",
                success: function (data) {
                    if(data == -1) {
                        alert("添加教育经历失败，请稍后尝试");
                    }else {
                        item.id = data;
                        edus.push(item);
                        $(".edit_edu_exp").css("display","none");
                        $(".show_edu_exp").css("display","block");
                        setEduInfor();
                    }
                }
            });
        }
    }
}
function closeIndustryDiv() {
    $(".industryDiv").css("display","none");
    $(".hiddenDiv").css("display","none");
}
function showIndustryDiv(){
    $(".industryDiv").css("display","block");
    $(".hiddenDiv").css("display","block");
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
        index = array[i].indexOf("_");
        var third = array[i].substring(index+1,array[i].length);
        $(".cate_third_list").append('<label id="'+array[i]+'" onclick="chose_category(this)">'+ third +'</label>');
    }
}
function chose_category(obj) {
    var _id = obj.id;
    var index = _id.lastIndexOf('_');
    var third = _id.substring(index+1,_id.length);
    var id = _id.substring(0,index);
    var op = $("#cateOpName").val();
    if(op=="hope") {
        $("#catetoryInput").val(third);
        $("#categoryIdInput").val(id);
    }else if(op == "practice") {
        $("#pCategoryInput").val(third);
        $("#pCategoryIdInput").val(id);
    }
    closeCateDiv();
}
function chose_city(obj) {
    var str = $(obj).html();
    $("#cityInput").val(str);
    closeCityDiv();
}
function closeCateDiv(){
    $(".hiddenDiv").css("display","none");
    $(".categoryDiv").css("display","none");
}
function showCateDiv(){
    $(".hiddenDiv").css("display","block");
    $(".categoryDiv").css("display","block");
}
function goForward(){
    $(".cate_third").css("display","none");
    $(".cate_second").css("display","block");
}
function closeCityDiv(){
    $(".hiddenDiv").css("display","none");
    $(".cityDiv").css("display","none");
}
function showCityDiv(){
    $(".hiddenDiv").css("display","block");
    $(".cityDiv").css("display","block");
}
function deleteInfor(obj) {
    var value = obj.id;
    var index = value.indexOf("_");
    var left = value.substring(0,index);
    var right = value.substring(index+1,value.length);
    var _tableName,hint;
    if(left=="hopeTrash") {
        _tableName = "t_hope";
        hint = "期望职位";
    }else if(left=="practiceTrash"){
        _tableName = "t_practice";
        hint = "实习经历";
    }else if(left=="proTrash") {
        _tableName = "t_project";
        hint = "项目经验";
    }else if(left=="eduTrash") {
        _tableName = "t_education";
        hint = "教育经历";
    }else if(left=="socialTrash") {
        _tableName = "t_social";
        hint = "社交网址";
    }
    var params = {
        tableName: _tableName,
        id: right
    };
   
    $.ajax({
        url: "http://localhost:8080/zhixin/seeker/deleteInfor.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data==true) {
                alert("删除" + hint + "成功");
                var array = new Array();
                if(_tableName=="t_hope") {
                    array = hopes;
                    hopes = new Array();
                    for(var i = 0; i < array.length; i++) {
                        if(array[i].id == right) continue;
                        else {
                            hopes.push(array[i]);
                        }
                    }
                    setHopeInfor();
                }else if(_tableName=="t_practice") {
                    array = practices;
                    practices = new Array();
                    for(var i = 0; i < array.length; i++) {
                        if(array[i].id == right) continue;
                        else {
                            practices.push(array[i]);
                        }
                    }
                    setPracticeInfor();
                }else if(_tableName=="t_project") {
                    array = pros;
                    pros = new Array();
                    for(var i = 0; i < array.length; i++) {
                        if(array[i].id == right) continue;
                        else {
                            pros.push(array[i]);
                        }
                    }
                    setProInfor();
                }else if(_tableName == "t_education") {
                    array = edus;
                    edus = new Array();
                    for(var i = 0; i < array.length; i++) {
                        if(array[i].id == right) continue;
                        else {
                            edus.push(array[i]);
                        }
                    }
                    setEduInfor();
                }else if(_tableName == "t_social") {
                    array = socials;
                    socials = new Array();
                    for(var i = 0; i < array.length; i++) {
                        if(array[i].id == right) continue;
                        else {
                            socials.push(array[i]);
                        }
                    }
                    setSocials();
                }
            }else {
                alert("删除" + hint + "失败，请稍后尝试。");
            }
        }
    });

}