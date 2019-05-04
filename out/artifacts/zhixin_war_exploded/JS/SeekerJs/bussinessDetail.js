var products = new Array();
var jobs = new Array();
var seniors = new Array();
var envirs = new Array();
$(function(){
    getCompanyIntroduce();
    getHotJob();
    getProducts();
    getBusiness();
    getSenior();
    getEnvir();
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,//可选选项，自动滑动
    });
});

function getCompanyIntroduce() {
    var id = $("#compId").val().trim();
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getCompany.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            $(".summary").html(data.summary);
        }
    });
}


function getHotJob() {
    var id = $("#compId").val().trim();
    $.ajax({
        url : "http://localhost:8080/zhixin/jobs/getHotJob.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var obj = eval(data);
            for(var i = 0; i < obj.length; i++) {
                jobs.push(obj[i]);
            }
            setHotJob();
        }
    });
}

function circleSenior() {
    var num = 0;
    while(true) {
        var item = jobs[num];
        $("#seniorPhoto").attr("/seniorPic/" + item.psrc);
        $("#seniorName").html(item.name);
        $("#seniorJob").html(item.job);
        countDownSenior(60);
        num++;
        num = num%jobs.length;
    }
}



function setHotJob() {
    if(jobs.length==0) {
        $(".compHotJobDiv").css("display","none");
    }else {
        $(".compHotJobDown").empty();
        var item;
        for(var i = 0; i < jobs.length; i++) {
            item = jobs[i];
            $(".compHotJobDown").append('<div class="hotJobItem">\n' +
                '                    <a class="jobName" href="http://localhost:8080/zhixin/jobs/jobDetail.action?id='+item.id+'">'+item.name+'</a><label class="jobSalary">'+item.salary+'/月</label></br>\n' +
                '                    <label class="jobExp">'+item.exp+'</label><label class="jobEdu">'+item.edu+'</label><label class="jobCity">'+item.city+'</label>\n' +
                '                </div>');
        }
    }
}

function getProducts() {
    var id = $("#compId").val().trim();
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getProductByCompId.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var obj = eval(data);
            for(var i = 0; i < obj.length; i++) {
                products.push(obj[i]);
            }
            setProducts();
        }
    });
}

function setProducts() {
    if(products.length == 0) {
        $(".compProduct").css("display","none");
        return;
    }
    $(".productList").empty();
    var item;
    for(var i = 0; i < products.length; i++) {
        item = products[i];
        $(".productList").append(' <div class="productLogoDiv">\n' +
            '                                <img width="50px" height="50px" src="/proPic/'+item.logo+'" class="productLogo">\n' +
            '                            </div>\n' +
            '                            <div class="productInfor">\n' +
            '                                <label class="productName">'+item.name+'</label><label class="productIntroduce">'+item.slogan+'</label></br>\n' +
            '                                <label class="productUrl">'+item.url+'</label>\n' +
            '                            </div>');
    }
}

function getBusiness() {
    var id = $("#compId").val().trim();
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getBussiness.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
           $("#compFullName").html(data.fullName);
           $("#corporate").html(data.corporate);
           $("#registerMoney").html(data.registerMoney);
           $("#publishTime").html(data.time);
           $("#compType").html(data.type);
           $("#compStatus").html(data.status);
           $("#compAddress").html(data.address);
           $("#registerCode").html(data.registerCode);
           $("#describtion").html(data.describe);
        }
    });
}

function getSenior(){
    var id = $("#compId").val().trim();
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getSeniorsByCompId.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var obj = eval(data);
            for(var i = 0; i < obj.length; i++) {
                seniors.push(obj[i]);
            }
            setSenior();
        }
    });
}

function setSenior(){
    $("#senior").empty();
    var item;
    for(var i = 0; i < seniors.length; i++) {
        item = seniors[i];
        $("#senior").append('<div class="swiper-slide">\n' +
            '                                        <div class="seniorPhotoDiv">\n' +
            '                                            <img class="seniorPhoto" src="/senPic/'+item.psrc+'" class="img-circle" width="50px" height="50px">\n' +
            '                                        </div>\n' +
            '                                        <div class="baseInforDiv">\n' +
            '                                            <label class="seniorName">'+item.name+'</label></br>\n' +
            '                                            <label class="seniorJob">'+item.job+'</label>\n' +
            '                                        </div>\n' +
            '                                        <div class="seniorIntroduce">\n' + item.introduce +
            '                                        </div>\n' +
            '                                    </div>');
    }
}

function getEnvir() {
    var id = $("#compId").val().trim();
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getEnvironmentByCompId.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            for(var i = 0; i < array.length; i++) {
                envirs.push(array[i]);
            }
            if(array.length == 0) {
                $(".compPhoto").css("display","none");
            } else {
                $("#compEnvi").empty();
                for(var i = 0; i < envirs.length; i++) {
                    $("#compEnvi").append('<div class="swiper-slide"><img src="/envirPic/'+envirs[i].psrc+'" width="250px" height="150px"></div>');
                }
            }
        }
    });
}

function setEnvir() {
    $("#compEnvi").empty();
    var item;
    for(var i = 0; i < envirs.length; i++) {
        item = envirs[i];
        $("#compEnvi").append('<div class="swiper-slide"><img src="/envirPic/'+item.psrc+'" width="230px" height="120px"></div>');
    }
}