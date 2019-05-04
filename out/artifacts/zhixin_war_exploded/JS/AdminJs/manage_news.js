$("#edit_hidden_div").empty();
/* Start：生成编辑器 */
var E = window.wangEditor;
var editor = new E("#edit_hidden_div");
editor.customConfig.uploadImgShowBase64 = true;
editor.create();

$(function () {
    initData("news_pub",1);
});

function initData(tableName,currentPage) {
    var adminId = $("#userAccount").val().trim();
    var params = {
        authorId: adminId,
        tableName: tableName,
        currentPage: currentPage
    };
    appendTableHeader(tableName);
    $("#tableName").html(tableName);
    //分类计数
    $.ajax({
       url: "http://localhost:8080/zhixin/news/classifyCount.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
           if(data=="无数据") {
               $("#list").append("无相应数据!");
               $("#page_content").empty();
           }else{
               var obj = JSON.parse(data);
               var news_pub = obj.news_pub;
               var news_draft= obj.news_draft;
               var news_trash = obj.news_trash;
               $("#pub_news").html("已发布(" + news_pub + ")");
               $("#draft_news").html("草稿箱(" + news_draft + ")");
               $("#trash_news").html("回收站(" + news_trash + ")");
               var years = obj.years;
               var temp = JSON.parse(years);
               $("#years").empty();
               $("#years").append("<option value='不 限' selected>不 限</option>");
               for(var i = 0; i < temp.length; i++) {
                   $("#years").append("<option value='" + temp[i] + "'>" + temp[i] + "</option>");
               }
               $("#months").find("option:contains('不 限')").attr("selected",true);
               $("#chose_new_type").find("option:contains('全 部')").attr("selected",true);
               $("#key_word").val("");
               initSearchCondition();   //初始化查询条件
               var str = obj.news;
               var news = eval(str);
               initList(tableName,news);
               var totalPage = obj.totalPage;
               var current = obj.current;
               var number = obj.thisPage;
               initPage(totalPage,current,number);
           }
        }
    });
}

function initList(tableName,news) {
    if(news == null) {
        alert("haha");
    }
    var pubTime = "";
    var index = 0;
    var time = "";
    for(var i = 0; i < news.length; i++) {
        time = news[i].pubTime;
        index = time.indexOf(" ");
        pubTime = time.substring(0,index);
        if(tableName == "news_pub") {
            $("#list").append('<div class="item">\n' +
                '                <label class="title">' + news[i].title + '</label>\n' +
                '                <label class="type">' + news[i].newsType + '</label>\n' +
                '                <label class="pubTime">' + pubTime + '</label>\n' +
                '                <label class="see" id="see_'+ news[i].id +'" onclick="see_new(this)">&nbsp&nbsp<span class="glyphicon glyphicon-eye-open"></span></label>\n' +
                '                <label class="edit" id="edit_' + news[i].id +'" onclick="edit_new(this)">&nbsp&nbsp<span class="glyphicon glyphicon-edit"></span></label>\n' +
                '                <label class="delete" id="delete_' + news[i].id +'" onclick="delete_new(this)">&nbsp&nbsp<span class="glyphicon glyphicon-trash"></span></label>\n' +
                '            </div>');
        }else if(tableName == "news_draft") {
            $("#list").append('<div class="item">\n' +
                '                <label class="title">' + news[i].title + '</label>\n' +
                '                <label class="type">' + news[i].newsType + '</label>\n' +
                '                <label class="pubTime">' + pubTime + '</label>\n' +
                '                <label class="see" id="see_'+ news[i].id +'" onclick="see_new(this)">&nbsp&nbsp<span class="glyphicon glyphicon-eye-open"></span></label>\n' +
                '                <label class="edit" id="edit_' + news[i].id +'" onclick="publish_new(this)">&nbsp&nbsp<span class="glyphicon glyphicon-arrow-up"></span></label>\n' +
                '                <label class="delete" id="delete_' + news[i].id +'" onclick="delete_new(this)">&nbsp&nbsp<span class="glyphicon glyphicon-trash"></span></label>\n' +
                '            </div>');
        }else if(tableName == "news_trash") {
            $("#list").append('<div class="item">\n' +
                '                <label class="title">' + news[i].title + '</label>\n' +
                '                <label class="type">' + news[i].newsType + '</label>\n' +
                '                <label class="pubTime">' + pubTime + '</label>\n' +
                '                <label class="see" id="see_'+ news[i].id +'" onclick="see_new(this)">&nbsp&nbsp<span class="glyphicon glyphicon-eye-open"></span></label>\n' +
                '                <label class="edit" id="edit_' + news[i].id +'" onclick="recover_new(this)">&nbsp&nbsp<span class="glyphicon glyphicon-asterisk"></span></label>\n' +
                '                <label class="delete" id="delete_' + news[i].id +'" onclick="delete_new(this)">&nbsp&nbsp<span class="glyphicon glyphicon-trash"></span></label>\n' +
                '            </div>');
        }

    }
}

/*浏览文章*/
function see_new(obj){
    var Id = obj.id;
    var index = Id.indexOf("_") + 1;
    var new_id = Id.substring(index,Id.length);
    var params = {
        tableName : $("#tableName").html().trim(),
        newId: new_id
    }
    $.ajax({
        url: "http://localhost:8080/zhixin/news/browserNew.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var news = JSON.parse(data);
            $("#hidden_div").css("display","block");
            $("#brower_hidden_div").css("display","block");
            $("#edit_hidden_div").css("display","none");
            $("#modify_new").css("display","none");
            $("#save_as_draft").css("display","none");
            $("#hidden_div_id").html(new_id);
            $("#hidden_div_title").html(news.title);
            $("#hidden_div_type").html(news.newsType);
            $("#hidden_div_time").html(news.pubTime);
            $("#brower_hidden_div").html(news.content);
        }
    });
}

/*编辑文章*/
function edit_new(obj){
    //$("#edit_hidden_div").empty();
    var Id = obj.id;
    var index = Id.indexOf("_") + 1;
    var new_id = Id.substring(index,Id.length);
    var params = {
        tableName : $("#tableName").html().trim(),
        newId: new_id
    }
    $.ajax({
        url: "http://localhost:8080/zhixin/news/browserNew.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var news = JSON.parse(data);
            $("#hidden_div").css("display","block");
            $("#brower_hidden_div").css("display","none");
            $("#edit_hidden_div").css("display","block");
            $("#modify_new").css("display","inline");
            $("#save_as_draft").css("display","inline");
            $("#hidden_div_id").html(news.id);
            $("#hidden_div_title").html(news.title);
            $("#hidden_div_type").html(news.newsType);
            $("#hidden_div_time").html(news.pubTime);
            editor.txt.html(news.content);
        }
    });
}

/*删除已发布的文章*/
function delete_new(obj) {
    var Id = obj.id; //新闻id
    var index = Id.indexOf("_") + 1;
    var newId = Id.substring(index,Id.length);
    var _tableName = $("#tableName").html();
    var flag = true;
    if(_tableName == "news_trash"){
        var msg = "确认要删除，在此删除文章将不可恢复！";
        if (confirm(msg)==true){
            flag = true;
        }else{
            flag = false;
        }
    }
    if(flag == false) {
        return;
    }
    var params = {
        id: newId,
        tableName: _tableName
    }
    $.ajax({
        url : "http://localhost:8080/zhixin/news/deleteNew.action",
        data : JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data==true) {
                alert("删除成功");
                var current = $("#currentPage").val().trim();
                getPage(current);
            }else {
                alert("删除失败，请稍后再试");
            }
        }
    });

}

/*发布文章*/
function publish_new(obj) {
    var Id = obj.id;
    var index = Id.indexOf("_") + 1;
    var _id = Id.substring(index,Id.length);
    var params = {
        id: _id
    }
    $.ajax({
        url: "http://localhost:8080/zhixin/news/publishNew.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data==true) {
                alert("发布成功！");
                var current = $("#currentPage").val().trim();
                getPage(current);
            }else {
                alert("发布失败，请稍后再试");
            }
        }
    })
}

/*复原文章，把垃圾箱的文章复原到原来的地方*/
function recover_new(obj) {
    var Id = obj.id;
    var index = Id.indexOf("_") + 1;
    var _id = Id.substring(index,Id.length);
    var params = {
        id: _id
    }
    $.ajax({
        url: "http://localhost:8080/zhixin/news/recoverNew.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data==true) {
                alert("还原成功！");
                var current = $("#currentPage").val().trim();
                getPage(current);
            }else {
                alert("还原失败，请稍后再试");
            }
        }
    })
}

//向div中追加表头
function appendTableHeader(tableName){
    $("#list").empty();
    if(tableName == "news_pub") {
        $("#list").append('<div class="item">\n' +
            '                <label class="title">文章题目</label>\n' +
            '                <label class="type">文章类型</label>\n' +
            '                <label class="pubTime">发布时间</label>\n' +
            '                <label class="see">查 看</label>\n' +
            '                <label class="edit">编 辑</label>\n' +
            '                <label class="delete">删 除</label>\n' +
            '            </div>');
    }else if(tableName == "news_draft") {
        $("#list").append('<div class="item">\n' +
            '                <label class="title">文章题目</label>\n' +
            '                <label class="type">文章类型</label>\n' +
            '                <label class="pubTime">发布时间</label>\n' +
            '                <label class="see">查 看</label>\n' +
            '                <label class="edit">发 布</label>\n' +
            '                <label class="delete">删 除</label>\n' +
            '            </div>');
    }else if(tableName == "news_trash") {
        $("#list").append('<div class="item">\n' +
            '                <label class="title">文章题目</label>\n' +
            '                <label class="type">文章类型</label>\n' +
            '                <label class="pubTime">发布时间</label>\n' +
            '                <label class="see">查 看</label>\n' +
            '                <label class="edit">复 原</label>\n' +
            '                <label class="delete">删 除</label>\n' +
            '            </div>');
    }
}


/*点击上部按钮的时候触发*/
function liClick(tableName) {
    var oldName = "#" + $("#tableName").html().trim();
    $(oldName).removeClass("active");
    var newName = "#" + tableName;
    $(newName).addClass("active");
    $("#tableName").html(tableName);
    initData(tableName,1);
}

/*初始化界面数据*/
function initPage(total,current,number) {
    $("#page_content").empty();
    var sectionOne = '<input type="text" id="totalPage" value="'+total+'"hidden>\n' +
        '                <input type="text" id="currentPage" value="'+current+'"hidden>\n' +
        '                <input type="text" id="thisPage" value="'+number+'"hidden>\n' +
        '                <button type="button" class="btn btn-default" id="first" onclick="firstPage()">首 页</button>\n' +
        '                <button type="button" class="btn btn-default" id="previous" onclick="goPrevious()">上一页</button>\n';
    var start = Math.max(1,Number(current)-2);
    var end = Math.min(Number(total),Number(total)+2);
    if(end-start < 4) {
        start = Math.max(1,end-4);
    }
    var sectionTwo = '';
    for(var i = start; i <= end; i++) {
        if(i == Number(current)) {
            sectionTwo = sectionTwo +  '<button type="button" class="btn btn-default" style="background-color:#5DD5C8;color: #ffffff" onclick="getPage('+ i +')">' + i +'</button>\n'
        }else {
            sectionTwo = sectionTwo + '<button type="button" class="btn btn-default" onclick="getPage('+ i +')">' + i + '</button>\n';
        }
    }
    var sectionThree = ' <button type="button" class="btn btn-default" id="next" onclick="goNext()">下一页</button>\n' +
        '                <button type="button" class="btn btn-default" id="end" onclick="endPage()">末 页</button>\n';
    $("#page_content").append(sectionOne+sectionTwo+sectionThree);
}


/*初始化查找条件*/
function initSearchCondition(){
    var new_year = $('#years option:selected').val();
    var new_month = $("#months option:selected").val();
    var new_type = $("#chose_new_type option:selected").val();
    var new_title = $("#key_word").val().trim();
    $("#new_year").html(new_year);
    $("#new_month").html(new_month);
    $("#new_type").html(new_type);
    $("#new_title").html(new_title);

}

function search_btn_click(){
    initSearchCondition();
    var tableName = $("#tableName").html().trim();
    appendTableHeader(tableName);
    getPage(1);
}

function closeHiddenDiv(){
    $("#hidden_div").css("display","none");
}

/**
 * 更新新闻内容
 */
function updateContent(){
    var _content = editor.txt.html();
    var _id = $("#hidden_div_id").html();
   var params = {
       content: _content,
       id: _id
   };
   $.ajax({
       url: "http://localhost:8080/zhixin/news/updateContent.action",
       data: JSON.stringify(params),
       contentType: "application/json;charset=UTF-8",
       async: false,
       type: "post",
       success: function (data) {
           if(data==true) {
               alert("修改资讯成功");
               $("#hidden_div").css("display","none");
           }else {
               alert("修改失败，请稍后尝试");
           }
       }
   });
}

/*把已发布的文章暂存到草稿*/
function savePubToDraft(){
    var _content = editor.txt.html();
    var _id = $("#hidden_div_id").html();
    var params = {
        content: _content,
        id: _id
    }
    var flag = true;
    $.ajax({
        url : "http://localhost:8080/zhixin/news/savePubToDraft.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data==true) {
                alert("保存至草稿成功");
                $("#hidden_div").css("display","none");
                var _currentPage = $("#currentPage").val();
                getPage(_currentPage);
            }else {
                alert("保存到草稿箱失败，请稍后尝试");
                flag = false;
            }
        }
    });
}

function firstPage(){
    getPage(1);
}

function goPrevious() {
    var currentPage = $("#currentPage").val().trim();
    var current = Number(currentPage);
    if(current == 1) {
        alert("已是第一页");
    }else {
        current = current-1;
        currentPage = String(current);
        var tableName = $("#tableName").html().trim();
        appendTableHeader(tableName);
        getPage(currentPage);
    }
}

function goNext(){
    var currentPage = $("#currentPage").val();
    var totalPage = $("#totalPage").val();
    var current = Number(currentPage);
    var total = Number(totalPage);
    if(current == total) {
        alert("已是最后一页");
    }else {
        current = current + 1;
        currentPage = String(current);
        var tableName = $("#tableName").html().trim();
        appendTableHeader(tableName);
        getPage(currentPage);
    }
}

function endPage(){
    var totalPage = $("#totalPage").val();
    var tableName = $("#tableName").html().trim();
    appendTableHeader(tableName);
    getPage(totalPage);
}



/*获取一页内容*/
function getPage(CurrentPage){
    var _tableName = $("#tableName").html();
    appendTableHeader();
    var _year = $("#new_year").html().trim();
    var _month = $("#new_month").html().trim();
    var _type = $("#new_type").html().trim();
    var _keyword = $("#new_title").html().trim();
    var admin_id = $("#userAccount").val().trim();
    var _currentPage = CurrentPage;
    var params = {
        tableName: _tableName,
        year: _year,
        month: _month,
        type: _type,
        keyword: _keyword,
        current: _currentPage,
        adminId: admin_id
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/news/getPage.action" ,
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        type: "post",
        success: function (data) {
            if(data=="无数据") {
                $("#list").append("无相应数据!");
                $("#page_content").empty();
            }else {
                var obj = JSON.parse(data);
                //Start:设置检索框
                $("#years").find('option[value="'+ _year +'"]').attr("selected",true);
                if(_year=="不 限"){
                    $("#months").find('option[value="不 限"]').attr("selected",true);
                }else {
                    $("#months").find('option[value="' + _month +'"]').attr("selected",true);
                }
                $("#chose_new_type").find('option[value="' + _type +'"]').attr("selected",true);
                $("#key_word").val(_keyword);
                //End:设置检索框
                $("#pub_news").html("已发布(" + obj.news_pub + ")");
                $("#draft_news").html("草稿箱(" + obj.news_draft + ")");
                $("#trash_news").html("回收站(" + obj.news_trash + ")");
                var str = obj.news;
                var news = eval(str);
                initList(_tableName,news);
                var totalPage = obj.totalPage;
                var currentPage = obj.currentPage;
                var thisPage = obj.thisPage;
                initPage(totalPage,currentPage,thisPage);
            }
        }
    });
}
