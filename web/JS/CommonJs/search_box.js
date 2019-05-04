$(function(){
    var id = "全国";
    var pre = "哈哈";
    $(".select_province").on('click','li',function(e){
        if(pre=="哈哈") {
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            pre = $(this);
        }else {
            pre.css("background-color","#ffffff");
            pre.css("color","black");
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            pre = $(this);
        }
        var li_data = $(this).attr('data-id');
        $(".subCity[data-id='" + id + "']").addClass("hide");
        $('.subCity[data-id="' + li_data + '"]').removeClass("hide");
        id = li_data;
    });

    var CityStatus = false;
    var CateStatus = false;
    var IndustryStatus = false;
    $("#city_extend").on("click",function () {
        if(CityStatus==false) {
            $(".select_position").css("display","block");
            $(this).removeClass("glyphicon-triangle-bottom");
            $(this).addClass("glyphicon-triangle-top");
            CityStatus = true;
        }else {
            $(".select_position").css("display","none");
            $(this).removeClass("glyphicon-triangle-top");
            $(this).addClass("glyphicon-triangle-bottom");
            CityStatus = false;
        }
    });

    //选择城市离开后触发
    $(".select_position").on("mouseleave",function () {
        $(".select_position").css("display","none");
        $("#city_extend").removeClass("glyphicon-triangle-top");
        $("#city_extend").addClass("glyphicon-triangle-bottom");
        CityStatus = false;
    })

    //点击展开关闭选择城市面板按钮
    $("#category_extend").on("click",function () {
        if(CateStatus==false) {
            $(".select_category").css("display","block");
            $(this).removeClass("glyphicon-triangle-bottom");
            $(this).addClass("glyphicon-triangle-top");
            CateStatus = true;
        }else {
            $(".select_category").css("display","none");
            $(this).removeClass("glyphicon-triangle-top");
            $(this).addClass("glyphicon-triangle-bottom");
            CateStatus = false;
        }
    });


    //鼠标离开选择职位板块时发生。
    $(".select_category").on("mouseleave",function () {
        $(".select_category").css("display","none");
        $("#category_extend").removeClass("glyphicon-triangle-top");
        $("#category_extend").addClass("glyphicon-triangle-bottom");
        CateStatus = false;
    })

    $("#industry_extend").on("click",function () {
        if(IndustryStatus==false) {
            $(".select_industry").css("display","block");
            $(this).removeClass("glyphicon-triangle-bottom");
            $(this).addClass("glyphicon-triangle-top");
            IndustryStatus = true;
        }else {
            $(".select_industry").css("display","none");
            $(this).removeClass("glyphicon-triangle-top");
            $(this).addClass("glyphicon-triangle-bottom");
            IndustryStatus = false;
        }
    });

    $(".select_industry").on("mouseleave",function () {
        $(".select_industry").css("display","none");
        $("#industry_extend").removeClass("glyphicon-triangle-top");
        $("#industry_extend").addClass("glyphicon-triangle-bottom");
        IndustryStatus = false;
    });

    
    var subCitypre = "哈哈";
    $('.subCity').on("click","li",function (e) {
        if(subCitypre=="哈哈") {
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            subCitypre = $(this);
        }else {
            subCitypre.css("background-color","#ffffff");
            subCitypre.css("color","black");
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            subCitypre = $(this);
        }
        var curCity = $(this).html();
        $("#hope_city").html(curCity);
        $("#cityInput").val(curCity);
    });


    var cateFirstPre = "哈哈";
    var cateFirstId = "职位类型";
    $('.select_first').on("click","li",function (e) {
        if(cateFirstPre=="哈哈") {
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            cateFirstPre = $(this);
        }else {
            cateFirstPre.css("background-color","#ffffff");
            cateFirstPre.css("color","black");
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            cateFirstPre = $(this);
        }
        var li_data = $(this).attr('data-id');
        if(cateFirstId == "职位类型") {
            $('.cateSecond[data-id="' + li_data + '"]').removeClass("hide");
        }else {
            $(".cateSecond[data-id='" + cateFirstId + "']").addClass("hide");
            $('.cateSecond[data-id="' + li_data + '"]').removeClass("hide");
        }
        $('.cateThird[data-id="' + cateSecondId + '"]').addClass("hide");
        cateFirstId = li_data;
        $("#categoryInput").val(li_data);
    });

    //职位类型点击2级分类时触发
    var cateSecondPre = "哈哈";
    var cateSecondId = "哈哈";
    $(".cateSecond").on("click","li",function () {
        if(cateSecondPre=="哈哈") {
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            cateSecondPre = $(this);
        }else {
            cateSecondPre.css("background-color","#ffffff");
            cateSecondPre.css("color","black");
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            cateSecondPre = $(this);
        }
        var li_data = $(this).attr('data-id');
        if(cateSecondId == "哈哈") {
            $('.cateThird[data-id="' + li_data + '"]').removeClass("hide");
        }else {
            $(".cateThird[data-id='" + cateSecondId + "']").addClass("hide");
            $('.cateThird[data-id="' + li_data + '"]').removeClass("hide");
        }
        cateSecondId = li_data;
        var str = $("#categoryInput").val();
        str = str + ";" + li_data;
        $("#categoryInput").val(str);
    });

    /*点击三级分类时*/
    var cateThirdPre = "哈哈";
    $('.cateThird').on("click","li",function () {
        if(cateThirdPre=="哈哈") {
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            cateThirdPre = $(this);
        }else {
            cateThirdPre.css("background-color","#ffffff");
            cateThirdPre.css("color","black");
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            cateThirdPre = $(this);
        }
        var li_data = $(this).attr('data-id');
        var str = $("#categoryInput").val();
        $("#categoryInput").val(str);
        var id = li_data.split("=")[1];
        $("#categoryIdInput").val(id);
        $("#catetory").html(li_data.split("=")[0]);
    });

    var industryId = "哈哈";
    $('.select_industry').on("click","li",function (e) {
        if(industryId=="哈哈") {
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            industryId = $(this);
        }else {
            industryId.css("background-color","#ffffff");
            industryId.css("color","black");
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            industryId = $(this);
        }
        var str = $(this).html();
        $("#industry").html(str);
        $("#industryInput").val(str);
    });

    /*填入公司名称的时候触发事件*/
    $("#search_content").keyup(function () {
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

});

function choseComp(obj) {
    var compName = obj.innerText;
    //alert(compName);
    $("#search_content").val(compName);
    $("#compNameList").css("display","none");
}

function searchJob() {
    var city = $("#cityInput").val().trim();
    if(city==null || city=="" || city=="全国") city = "default";
    var cateId = $("#categoryIdInput").val().trim();
    if(cateId==null || cateId=="") cateId = "default";
    //alert(cateId);
    var cateName = $("#catetory").html().trim();
    //alert(cateName);
    if(cateName==null || cateName=="" || cateName=="职位类型") cateName = "default";
    var compName = $("#search_content").val().trim();
    if(compName==null || compName=="") compName = "default";
    var url = "http://localhost:8080/zhixin/seeker/searchJobWithCondition.action?cateId=" + cateId + "&cateName=" + cateName + "&compName=" + compName + "&city=" + city;
    window.location = url;
}