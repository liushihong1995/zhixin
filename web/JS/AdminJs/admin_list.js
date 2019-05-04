$(function(){
    initData(1);
});



//加载初始化数据
function initData(currentPage) {
    $.ajax({
       url: "http://localhost:8080/zhixin/admin/pagequery.action",
       data: '{"currentPage":' + currentPage + '}',
        contentType: "application/json;charset=UTF-8",
        type: "post",
        success: function (data) {
           var obj = JSON.parse(data);
           var currentPage = obj.currentPage;
           $("#currentPage").html(currentPage);
           var totalPage = "共" + obj.totalPageNum + "页";
           $("#totalPage").html(totalPage);
           var str = obj.admins;
           var admins = eval(str);
           var count = 0;
           for(var i = 0; i < admins.length; i++) {
                if(admins[i]==null) {
                    $("#list").append(" <div class=\"item\">\n" +
                        "                    <label class=\"itemId itemLabel\"></label>\n" +
                        "                    <label class=\"itemName itemLabel\"></label>\n" +
                        "                    <label class=\"itemDepart itemLabel\"></label>\n" +
                        "                    <label class=\"itemBrower itemLabel\"></label>\n" +
                        "                    <label class=\"itemDelete itemLabel\"></span></label>\n" +
                        "                </div></br>");
                }else {
                    count++;
                    $("#list").append('<div class="item">\n' +
                        '                  <label class="itemId itemLabel" id=“id_' + i + '">' + admins[i].phone + "</label>\n" +
                        '                    <label class="itemName itemLabel">' + admins[i].name + "</label>\n" +
                        '                   <label class="itemDepart itemLabel">' + admins[i].department + "</label>\n" +
                        '                  <label class="itemBrower itemLabel" id="brower_' + admins[i].id + '" onclick="browerInfor(this)"><span class="glyphicon glyphicon-eye-open"></span></label>\n' +
                        '                    <label class="itemDelete itemLabel" id="delete_' + admins[i].id + '" onclick="deleteInfor(this)"><span class="glyphicon glyphicon-trash"></span></label>\n' +
                        "                </div></br>");
                }
            }
            $("#recordNum").html(count);
        }
    });
}

//浏览数据
function browerInfor(obj) {
    var id = obj.id;
    var index = id.indexOf("_");
    //用户账号
    var account = id.substring(index+1,id.length);
    $.ajax({
        url:"http://localhost:8080/zhixin/admin/getOneAdmin.action",
        data: '{"id":"' + account + '"}',
        contentType: "application/json;charset=UTF-8",
        type: "post",
        success: function (data) {
            var name = data.name;
            var id = data.id;
            var depart = data.department;
            var cardNum = data.cardNum;
            var email = data.email;
            $("#closeBtn").append('<span class="glyphicon glyphicon-remove" onclick="closeHideDiv()"></span>');
            $("#infor").append('            <table>\n' +
                '                <tr>\n' +
                '                   <td class="infor_title" colspan="4"><b>信息浏览</b></td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                    <td class="value_title" colspan="4"><b>管理员姓名 : ' + name + '</b></td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                    <td class="infor_label"><b>手机号码</b></td>\n' +
                '                    <td class="value_label"><b>' + id + '</b></td>\n' +
                '                    <td class="infor_label"><b>所在部门</b></td>\n' +
                '                    <td class="value_label"><b>' + depart + '</b></td>\n' +
                '                </tr>\n' +
                '                <tr>\n' +
                '                    <td class="infor_label"><b>身份证号</b></td>\n' +
                '                    <td class="value_label"><b>' + cardNum + '</b></td>\n' +
                '                    <td class="infor_label"><b>常用邮箱</b></td>\n' +
                '                    <td class=\"value_label\"><b>' + email + '</b></td>\n' +
                '                </tr>\n' +
                '            </table>\n' +
                '\n');
            $("#brower_info_div").css("display","block");
            $("#closeBtn").css("display","block");
            $("#infor").css("display","block");
        },
        error : function (data) {
            alert("获取数据失败，请稍后尝试。");
        }
    });
}


//关闭弹出的Div
function closeHideDiv() {
    $("#closeBtn").empty();
    $("#infor").empty();
    $("#closeBtn").css("display","none");
    $("#infor").css("display","none");
    $("#brower_info_div").css("display","none");
}

//删除一条记录
function deleteInfor(obj) {
    var fdel = window.confirm("是否确定删除？");
    var record = $("#recordNum").html().trim();
    var currentPage = $("#currentPage").html().trim();
    var currentPageNum = Number(currentPage);   //当前页码
    var count = Number(record);                 //本页记录条数
    if(fdel) {
        var id = obj.id;
        var index = id.indexOf("_");
        //用户账号
        var account = id.substring(index+1,id.length);
        $.ajax({
           url: "http://localhost:8080/zhixin/admin/deleteOneAdmin.action",
            data: '{"id":"' + account + '"}',
            contentType: "application/json;charset=UTF-8",
            type: "post",
            success: function (data) {
               if(data==true) {
                   alert("删除成功！");
                   count--;
                   //本页数据量为0，加载前一页数据
                   if(count == 0) {
                       currentPageNum = currentPageNum-1;
                       if(currentPageNum==0) {
                           currentPageNum = 1;
                       }
                       $("#list").empty();
                       initData(currentPageNum);
                   }else {
                       $("#list").empty();
                       //加载本页数据
                       initData(currentPage);
                   }
               }else {
                   alert("删除失败,请稍后再试！");
               }
            }
        });
    }else {
        return false;
    }
}

//获取上一页
function getPrevious() {
    //获取当前页码
    var currentPage = $("#currentPage").html().trim();
    if(currentPage==1) {
        alert("该页已是第一页!");
    }else {
        currentPage = currentPage-1;
        $("#list").empty();
        initData(currentPage);
    }
}

//获取下一页
function getNext() {
    var currentPage = $("#currentPage").html().trim();
    var totalPage = $("#totalPage").html().trim();
    var len = totalPage.length;
    totalPage = totalPage.substring(1,len-1);
    var currentPageNum = Number(currentPage);
    var totalPageNum = Number(totalPage);
    if(currentPageNum == totalPageNum) {
        alert("该页已是最后一页！");
    }else {
        currentPageNum = currentPageNum+1;
        $("#list").empty();
        initData(currentPageNum);
    }
}








