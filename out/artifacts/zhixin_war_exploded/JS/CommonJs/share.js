var typeObj = $("#allType");
var _type = "全部";

$(function (){
    includeLinkStyle();
    typeObj.css("background-color","#5DD5C8");
    typeObj.css("color","#ffffff");
    getPage(1,_type);
    initHot();
});


/**
 * 发表文章，判断用户是否登录，没有登录的话要求用户登陆后才允许发表。
 */
function goEditArticle(){
    var identity = $("#identity").val().trim();
    if(identity == "noUser") {
        alert("您尚未登录，登录之后才可以编辑文章");
        window.location = "http://localhost:8080/zhixin/Common/login.jsp";
    } else { /*跳转到编辑文章的界面*/
        window.location = "http://localhost:8080/zhixin/Common/editArticle.jsp";
    }
}

function typeClick(articleType,obj){
    _type = articleType;
    typeObj.css("background-color","#ffffff");
    typeObj.css("color","#0f0f0f");
    $(obj).css("background-color","#5DD5C8");
    $(obj).css("color","#ffffff");
    typeObj = $(obj);
    getPage(1,articleType);
}

/*根据用户的不同引入相应的css*/
function includeLinkStyle() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    var identity = $("#identity").val().trim();
    if(identity == "boss") {
        link.href = "../CSS/BossCss/header_two.css";
    }else if(identity == "seeker"){
        link.href = "../CSS/CommonCss/header_one.css";
        /* <link rel="stylesheet" href="../CSS/CommonCss/header_one.css" type="text/css"> */
    }else {
        link.href = "../CSS/CommonCss/header_one.css";
    }
    document.getElementsByTagName("head")[0].appendChild(link);
}

function getPage(current,articleType) {
    current = Number(current);
    var params = {
        currentPage: current,
        type: articleType
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/article/getPage.action",
        type: "post",
        data: JSON.stringify(params),
        async: false,
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            var obj = JSON.parse(data);
            var currentPage = Number(obj.currentPage);
            var totalPage = Number(obj.totalPage);
            var str = obj.articles;
            var array = eval(str);
            initList(array);
            initPage(currentPage,totalPage);
        }
    });
}


function initHot(){
    $.ajax({
        url : "http://localhost:8080/zhixin/article/getHot.action",
        type: "post",
        data: "haha",
        async: false,
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            var array = eval(data);
            $(".hot_list").empty();
            var item;
            for(var i = 0; i < array.length; i++) {
                item = array[i];
                $(".hot_list").append('<div class="hot_item">\n' +
                    '                        <div class="hot_title_div">\n' +
                    '                            <a href="http://localhost:8080/zhixin/article/readArticle.action?id='+item.id+'"class="hot_title">'+item.title+'</a>\n' +
                    '                        </div>\n' +
                    '                        <div class="hot_infor">\n' +
                    '                            <label class="hotStaticLabel">发表于</label>\n' +
                    '                            <label class="hotPubTime">'+item.time+'</label>\n' +
                    '                            <label class="hotReplyLabel">浏览</label>\n' +
                    '                            <label class="hotReply">('+item.visit+')</label>\n' +
                    '                        </div>\n' +
                    '                    </div>\n');
            }
        }
    });
}

function initList(array){
    $(".article_list").empty();
    var item;
    for(var i=0; i < array.length; i++) {
        item = array[i];
        var photoUrl = "";
        var inforUrl = "";
        if(item.status == "seeker") {
            photoUrl = "/seekerPic/" + item.photo;
            inforUrl = "http://localhost:8080/zhixin/seeker/browerResume.action?id=" + item.userId;
        }else {
            photoUrl = "/bossPic/" + item.photo;
            inforUrl = "#";
        }
        $(".article_list").append(' <div class="article_item">\n' +
            '                        <div class="userPhoto">\n' +
            '                            <img src="'+photoUrl+'" class="img-circle userImage" width="50px" height="50px">\n' +
            '                        </div>\n' +
            '                        <div class="article_infor">\n' +
            '                            <div class="article_title_div">\n' +
            '                                <a href="http://localhost:8080/zhixin/article/readArticle.action?id='+item.id+ '" class="article_title">\n' +
            '                                    '+ item.title +'\n' +
            '                                </a>\n' +
            '                            </div>\n' +
            '                            <div class="article_other_infor">\n' +
            '                                <a href="'+inforUrl+'" class="userName">'+item.userName+'</a>\n' +
            '                                <label class="pubTime">'+item.time+'</label>\n' +
            '                                <label class="staticLabel">发表在</label>\n' +
            '                                <label class="articeType">['+item.type+']</label>\n' +
            '                                <label class="replyCountLabel">回复</label>\n' +
            '                                <label class="replyCount">'+item.reply+'</label>\n' +
            '                                <label class="visitCountLabel">浏览</label>\n' +
            '                                <label class="visitCount">'+item.visit+'</label>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>');
    }
}

function initPage(currentPage,totalPage) {
    currentPage = Number(currentPage);
    totalPage = Number(totalPage);
    var start = currentPage-3;
    start = Math.max(start,1);
    var end = currentPage+3;
    end = Math.min(end,totalPage);
    $("#fenye").empty();
    $("#fenye").append('<button class="btn btn-default" type="button" id="firstPage" onclick="firstPage()">首页</button>\n' +
        '                    <button class="btn btn-default" type="button" id="previous" onclick="getPrevious()">上一页</button>\n');
    for(var i = start; i <= end; i++) {
        if(Number(currentPage)==i) {
            $("#fenye").append(' <button class="btn btn-default" type="button" onclick="goPage('+i+')" style="background-color: #5DD5C8">'+i+'</button>\n');
        }else {
            $("#fenye").append(' <button class="btn btn-default" type="button" onclick="goPage('+i+')" >'+i+'</button>\n');
        }
    }
    $("#fenye").append('<button class="btn btn-default" type="button" id="next" onclick="getNext()">下一页</button>\n' +
        '                    <button class="btn btn-default" type="button" id="lastPage" onclick="endPage()">末页</button>\n');
    $("#currentPage").val(currentPage);
    $("#totalPage").val(totalPage);
}
function firstPage() {
    getPage(1,_type);
}
function endPage() {
    var totalPage = $("#totalPage").val().trim();
    getPage(Number(totalPage),_type);
}


function getPrevious(){
    var currengPage = $("#currentPage").val();
    currengPage = Number(currengPage);
    if(currengPage == 1) {
        alert("已经是第一页");
    }else {
        currengPage = currengPage-1;
        getPage(currengPage,type);
    }
}

function getNext(){
    var currentPage = $("#currentPage").val().trim();
    var totalPage = $("#totalPage").val().trim();
    currentPage = Number(currentPage);
    totalPage = Number(totalPage);
    if(currentPage == totalPage) {
        alert("已是最后一页");
    }else {
        getPage(currentPage+1,type);
    }
}

function goPage(currentPage) {
    currentPage = Number(currentPage);
    getPage(currentPage,_type);
}