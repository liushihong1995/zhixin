$(function(){
    init();
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
    });

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

    $(".select_category").on("mouseleave",function () {
        $(".select_category").css("display","none");
        $("#category_extend").removeClass("glyphicon-triangle-top");
        $("#category_extend").addClass("glyphicon-triangle-bottom");
        CateStatus = false;
    });


    var subCitypre = "哈哈";
    $('.subCity').on("click","li",function (e) {
        if(IndustryStatus==true) {
            $("#industry_extend").click();
        }
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
        $("#city").html(curCity);
        $("#zone").html("");
        getZones(curCity);
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
        $("#catetoryInput").val(li_data);
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
        var id = $(this).attr("id");
        $("#categoryIdInput").val(id);
        $("#catetory").html(li_data);
        $("#catetoryInput").val(li_data);
        $("#category_extend").click();
    });


    var firstIndustryPre = "哈哈";
    var firstIndustryId = "";
    $(".industry_first").on("click","li",function () {
        if(firstIndustryPre == "哈哈") {
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            firstIndustryPre = $(this);
        }else {
            firstIndustryPre.css("background-color","#ffffff");
            firstIndustryPre.css("color","black");
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
            firstIndustryPre = $(this);
        }
        var li_data = $(this).attr('data-id');
        if(firstIndustryPre=="哈哈") {
            $('.industrySecond[data-id="' + li_data + '"]').removeClass("hide");
        }else {
            $(".industrySecond[data-id='" + firstIndustryId + "']").addClass("hide");
            $('.industrySecond[data-id="' + li_data + '"]').removeClass("hide");
        }
        firstIndustryId = li_data;
        var str = $("#categoryInput").val();
        str = str + ";" + li_data;
        $("#categoryInput").val(str);
    });

    var industrySecondId = "哈哈";
    $(".industrySecond").on("click","li",function () {
        if(industrySecondId=="哈哈") {
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
        }else{
            industrySecondId.css("background-color","#ffffff");
            industrySecondId.css("color","black");
            $(this).css("background-color"," #5DD5C8");
            $(this).css("color","#ffffff");
        }
        industrySecondId = $(this);
        var li_data =  $(this).attr('data-id');
        $("#industry").html(li_data);
        $("#industryInput").val(li_data);
        var id = $(this).attr("id");
        //alert(id);
        $("#industryIdInput").val(id);
    });



    $("#subSearchInfor").on("click",function () {
        var cateId = $("#categoryIdInput").val().trim();
        var cate = $("#catetoryInput").val().trim();
        var industryId = $("#industryIdInput").val().trim();
        var industry = $("#industryInput").val().trim();
        var city = $("#cityInput").val().trim();
        window.location = "http://localhost:8080/zhixin/boss/searchTalentWithCondition.action?cateId="+cateId+"&cateName="+cate+"&industry="+industry+"&industryId="+industryId+"&city=" + city;
    });

});

function init() {
    $("#categoryIdInput").val("default");
    $("#catetoryInput").val("default");
    $("#industryIdInput").val("default");
    $("#industryInput").val("default");
    $("#cityInput").val("全国");
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

function choseZone(obj) {
    $("#zone").html(obj.id);
}


