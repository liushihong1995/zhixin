$(function (){
    //根据不同的用户加入不同的样式
    includeLinkStyle();
    var E = window.wangEditor;
    var editor = new E("#edit_reply");
    editor.customConfig.uploadImgShowBase64 = true;
    editor.create();

    $("#sumbitComment").on("click",function () {
        var _status = $("#statusInput").val().trim();
        var _userId = $("#userIdInput").val().trim();
        if(_userId == null || _userId=="") {
            alert("您尚未登录或登录信息过期，请登录后评论");
            window.location = "http://localhost:8080/zhixin/Common/login.jsp";
            return;
        }
        var _articleId = $("#articleIdInput").val().trim();
        var _content = editor.txt.html();
        var item = {
            id: "",
            status: _status,
            userId: _userId,
            userName: "haha",
            photo: "haha",
            articleId: _articleId,
            content: _content,
            time: ""
        };
        $.ajax({
            url: "http://localhost:8080/zhixin/article/insertComment.action",
            type: "post",
            data:  JSON.stringify(item),
            contentType: "application/json;charset=UTF-8",
            async: false,
            success: function (data) {
                if(data==true) {
                    editor.txt.html("");
                    var currentPage = $("#currentPage").val().trim();
                    currentPage = Number(currentPage);
                    getPage(currentPage);
                }
            }
        });
    });

    getPage(1);
    initHot();
});

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

function getPage(current){
    var _articleId = $("#articleIdInput").val().trim();
    var item = {
        articleId: _articleId,
        currentPage: current
    };
    $.ajax({
        url: "http://localhost:8080/zhixin/article/getComment.action",
        type: "post",
        data:  JSON.stringify(item),
        contentType: "application/json;charset=UTF-8",
        async: false,
        success: function (data) {
            if(data=="无数据") {
                $(".reply_list").empty();
                $(".reply_list").append('无数据');
            }else {
                var obj = JSON.parse(data);
                var currentPage = Number(obj.currentPage);
                var totalPage = Number(obj.totalPage);
                var str = obj.comments;
                var array = eval(str);
                initList(array);
                initPage(currentPage,totalPage);
            }
        }
    });
}

function initList(array) {
    $(".reply_list").empty();
    var item;
    for(var i = 0; i < array.length; i++) {
        item = array[i];
        var photoUrl;
        var userUrl;
        if(item.status == "seeker") {
            photoUrl = "/seekerPic/" + item.photo;
            userUrl = "http://localhost:8080/zhixin/seeker/browerResume.action?id=" + item.userId;
        }else {
            photoUrl = "/bossPic/" + item.photo;
            userUrl = "#";
        }
        $(".reply_list").append('<div class="reply_item">\n' +
            '                            <div class="photo_div">\n' +
            '                                <img src="'+photoUrl+'" class="img-circle" width="50px" height="50px">\n' +
            '                            </div>\n' +
            '                            <div class="comment_div">\n' +
            '                                <div class="comment_infor">\n' +
            '                                    <a href="'+userUrl+'">'+item.userName+'</a>\n' +
            '                                    <label>发表于'+item.time+'</label>\n' +
            '                                </div>\n' +
            '                                <div class="comment_content">\n' +
            '                                    '+item.content+'</br>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <div style="clear:both;"></div>\n' +
            '                        </div></br>');
    }
}

function initPage(currentPage,totalPage) {
    $("#totalPage").val(totalPage);
    $("#currentPage").val(currentPage);
    var start = Math.max(currentPage-2,1);
    var end = Math.min(currentPage+2,totalPage);
    $(".comment_page").empty();
    $(".comment_page").append('<button type="button" class="btn btn-default" onclick="getPage(1)">首页</button>\n' +
        '                            <button type="button" class="btn btn-default" onclick="Previous()">上一页</button>\n');
    for(var i = start; i<=end; i++) {
        if(i == currentPage) {
            $(".comment_page").append('<button type="button" class="btn btn-default" onclick="goPage('+i+')" style="background-color: #5DD5C8">'+i+'</button>\n');
        }else {
            $(".comment_page").append('<button type="button" class="btn btn-default" onclick="goPage('+i+')">'+i+'</button>\n');
        }
    }
    $(".comment_page").append('<button type="button" class="btn btn-default" onclick="Next()">下一页</button>\n' +
        '                            <button type="button" class="btn btn-default" onclick="goPage('+totalPage+')">末页</button>\n');

}

function Previous(){
    var currentPage = $("#currentPage").val().trim();
    currentPage = Number(currentPage);
    if(currentPage == 1) {
        alert("已是第一页");
    }else {
        currentPage = currentPage-1;
        getPage(currentPage)
    }
}

function Next() {
    var currentPage = $("#currentPage").val().trim();
    currentPage = Number(currentPage);
    var totalPage = $("#totalPage").val().trim();
    totalPage = Number(totalPage);
    if(currentPage == totalPage) {
        alert("已是最后一页");
    }else {
        currentPage = currentPage + 1;
        getPage(currentPage);
    }
}
function goPage(currentPage) {
    currentPage = Number(currentPage);
    getPage(currentPage);
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
