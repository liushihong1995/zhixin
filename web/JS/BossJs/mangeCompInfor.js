var boss;
var company;
$(function () {
    getBoss();
});

function getBoss() {
    var id = $("#bossIdInput").val();
    if(id==null || id=="") {
        alert("登录信息已过期，请重新登录");
        window.location = "http://localhost:8080/zhixin/Common/login.jsp";
        return;
    }
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getBossBasic.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            boss = data;
            getCompany(boss.compId);
        }
    });
}

//获取公司基本信息
function getCompany(id) {
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getCompany.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var company = data;
            $("#compLogo").attr("src","/compPic/" + company.logo);
            $("#compIdInput").val(id);
            $("#compName").html(company.fullName + "(" + company.shortName +")");
            $("#compIndustry").html(company.industry);
            $("#compScope").html(company.scope);
            $("#compStage").html(company.stage);
            $("#compWeb").html(company.website);
            getProducts();
            getSeniors();
            getEnvironments();
        }
    });
}

//获取产品信息
function getProducts() {
    var params = {
        compId: boss.compId,
        bossId: boss.id
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getProducts.action",
        data: JSON.stringify(params) ,
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            $(".productList").empty();
            $(".productList").append(' </br></br></br>\n' +
                '                <div class="title"><label>产品列表</label></div></br>');
            var product;
            for(var i = 0; i < array.length; i++) {
                product = array[i];
                $(".productList").append(' <div class="productItem">\n' +
                    '                    <div class="productLogoDiv">\n' +
                    '                        <img class="productLogo" width="50px" height="50px" src="/proPic/'+product.logo+'">\n' +
                    '                    </div>\n' +
                    '                    <div class="productInforDiv">\n' +
                    '                        <label class="productName">' + product.name + " | " + product.slogan +'</label>\n' +
                    '                        <span class="glyphicon glyphicon-edit proEdit" id="modifyProduct_'+product.id+'" onclick="modify(this)"></span>\n' +
                    '                        <span class="glyphicon glyphicon-trash proTrash" id="deleteProduct_' + product.id + '" onclick="del(this)"></span></br>\n' +
                    '                        <label class="productUrl">'+product.url+'</label>\n' +
                    '                    </div>\n' +
                    '                </div>');
            }
            $(".productList").append(' <div class="addInfor">\n' +
                '                    <span class="glyphicon glyphicon-plus"></span><label id="addProduct" onclick="add(this)">添加公司产品</label>\n' +
                '                </div>');
        }
    });
}

//获取高管信息
function getSeniors() {
    var params = {
        compId: boss.compId,
        bossId: boss.id
    };
    $.ajax({
        url: "http://localhost:8080/zhixin/boss/getSeniors.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            $(".seniorList").empty();
            $(".seniorList").append(' <div class="title"><label>高管列表</label></div></br>');
            var senior;
            for(var i = 0; i < array.length; i++) {
                senior = array[i];
                $(".seniorList").append('<div class="seniorItem">\n' +
                    '                    <div class="seniorPhotoDiv">\n' +
                    '                        <img src="/senPic/'+senior.psrc+'" width="50px" height="50px" class="img-circle seniorPhoto">\n' +
                    '                    </div>\n' +
                    '                    <div class="seniorInforDiv">\n' +
                    '                        <label class="seniorName">'+senior.name+'</label></br>\n' +
                    '                        <label class="seniorJob">'+senior.job+'</label>\n' +
                    '                    </div>\n' +
                    '                    <div class="seniorIntroduce">\n' + senior.introduce +
                    '                    </div>\n' +
                    '                    <div class="seniorOpDiv">\n' +
                    '                        <span class="glyphicon glyphicon-edit seniorEdit" id="modifySenior_'+senior.id+'" onclick="modify(this)"></span>\n' +
                    '                        <span class="glyphicon glyphicon-trash seniorTrash" id="deleteSenior_' + senior.id + '" onclick="del(this)"></span>\n' +
                    '                    </div>\n' +
                    '                </div>');
            }
            $(".seniorList").append('  <div class="addInfor">\n' +
                '                    <span class="glyphicon glyphicon-plus"></span><label id="addSenior" onclick="add(this)">添加高管信息</label>\n' +
                '                </div>');
        }
    });
}

//获取公司环境图片
function getEnvironments() {
    var params = {
        compId: boss.compId,
        bossId: boss.id
    };
    $.ajax({
        url: "http://localhost:8080/zhixin/boss/getEnvironments.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            $(".pictureList").empty();
            $(".pictureList").append('<div class="title"><label>公司图片</label></div></br>');
            var environment;
            for(var i = 0; i < array.length ; i++) {
                environment = array[i];
                $(".pictureList").append(' <div class="pictureItem">\n' +
                    '                    <img src="/envirPic/'+ environment.psrc +'" width="160px" height="100px">\n' +
                    '                    <span class="glyphicon glyphicon-trash picTrash" id="deletePicture_'+ environment.id +'" onclick="del(this)" ></span>\n' +
                    '                </div>');
            }

            $(".pictureList").append('<br/>');
            $(".pictureList").append('<br/>');
            $(".pictureList").append(' <div class="addInfor">\n' +
                '                    <span class="glyphicon glyphicon-plus"></span><lable id="addPicture" onclick="add(this)">添加公司图片</lable>\n' +
                '                </div>');
        }
    });
}

function modify(obj) {
    var _id = obj.id;
    var index = _id.indexOf("_");
    var len = _id.length;
    var page = _id.substring(0,index);
    var id = _id.substring(index+1,len);
    if(page == "modifyProduct") {
        $("#pageInput").val("productInfor");
        $("#operatorInput").val("modify");
        $("#idInput").val(id);
        $("#submitParam").click();
    }else if(page == "modifySenior"){
        $("#pageInput").val("seniorInfor");
        $("#operatorInput").val("modify");
        $("#idInput").val(id);
        $("#submitParam").click();
    }
}

//添加信息
function add(obj) {
    var _id = obj.id;
    if(_id == "addProduct") {
        $("#pageInput").val("productInfor");
        $("#operatorInput").val("add");
        $("#idInput").val(boss.compId);
        $("#submitParam").click();
    }else if(_id == "addSenior") {
        $("#pageInput").val("seniorInfor");
        $("#operatorInput").val("add");
        $("#idInput").val(boss.compId);
        $("#submitParam").click();
    } else if(_id == "addPicture") {
        $("#pageInput").val("pictureInfor");
        $("#operatorInput").val("add");
        $("#idInput").valueOf(boss.compId);
        $("#submitParam").click();
    }
}

//删除信息
function del(obj) {
    var value = obj.id;
    var index = value.indexOf("_");
    var tableInfor = value.substring(0,index);
    var _id = value.substring(index+1,value.length);
    var tableName = "";
    if(tableInfor == "deleteProduct") {
        tableName = "t_product";
    } else if(tableInfor == "deleteSenior") {
        tableName = "t_senior";
    } else if(tableInfor == "deletePicture") {
        tableName = "t_environment";
    }
    var params = {
        table : tableName,
        id: _id
    };
    $.ajax({
        url: "http://localhost:8080/zhixin/boss/deleteCompInfor.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data == true) {
                alert("删除信息成功");
                if(tableName=="t_product") {
                    getProducts();
                } else if(tableName=="t_senior") {
                    getSeniors();
                } else if(tableName=="t_environment") {
                    getEnvironments();
                }
            } else {
                alert("删除失败，请稍后尝试");
            }
        }
    });

}


function deal(Page,Operator,Id) {
    var _id;
    if(Page == "basicInfor") {
        _id = $("#compIdInput").val().trim();
       $("#pageInput").val("basicInfor");
       $("#operatorInput").val(Operator);
       $("#idInput").val(_id);
       $("#submitParam").click();
    }else if(Page == "productInfor") {
        $("#pageInput").val("");
    }
}







