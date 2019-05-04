$(function (){
    includeLinkStyle();
    initTopNews();
    initNewsList(1);
});

/**
 * 按照用户的不同引入对应的头部。
 */
function includeLinkStyle() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    var identity = $("#identity").val().trim();
    if(identity == "boss") {
        link.href = "../CSS/BossCss/news_header.css";
    }else {
        link.href = "../CSS/CommonCss/header_two.css";
    }
    document.getElementsByTagName("head")[0].appendChild(link);
}

/*初始化置顶文章*/
function initTopNews() {
    $.ajax({
        url: "http://localhost:8080/zhixin/topNews.action",
        type: "post",
        data: '{"id":"haha"}',
        contentType: "application/json;charset=UTF-8",
        async: false,
        success : function (data) {
            var news = JSON.parse(data);
            for(var i = 0; i < news.length; i++) {
                if(news[i].newsType == "开心一刻"){
                    //设置文章封面
                    $("#happy_mid_img").attr("src","/newsPic/" + news[i].psrc + ".jpeg");
                    $("#happy_down").html(news[i].title + "</br><a href='http://localhost:8080/zhixin/news/readNew.action?id=" + news[i].id +"'>查看详情</a>");
                }else if(news[i].newsType == "干货文章") {
                    //设置文章封面
                    $("#useful_mid_img").attr("src","/newsPic/" + news[i].psrc + ".jpeg");
                    $("#useful_down").html(news[i].title + "</br><a href='http://localhost:8080/zhixin/news/readNew.action?id=" + news[i].id + "'>查看详情</a>");
                }else if(news[i].newsType == "防骗指导") {
                    $("#guide_mid_img").attr("src","/newsPic/" + news[i].psrc + ".jpeg");
                    $("#guide_down").html(news[i].title + "</br><a href='http://localhost:8080/zhixin/news/readNew.action?id=" + news[i].id + "'>查看详情</a>");
                }
            }
        }
    });
}


/*初始化新闻列表*/
function initNewsList(start){
    var param = '{"currentPage":"' + start + '"}';
    $.ajax({
        url: "http://localhost:8080/zhixin/news/queryPage.action",
        type: "post",
        data: param,
        contentType: "application/json;charset=UTF-8",
        async: false,
        success: function (data) {
            var obj = JSON.parse(data);
            var currentPage = obj.currentPage;
            var totalPage = obj.totalPage;
            var str = obj.news;
            var news = eval(str);
            $("#list").empty();  //清空div
            var title = "";
            var content = "";
            var author = "";
            var psrc = "";
            var time = "";
            var index = 0;
            for(var i = 0; i < news.length; i++) {
                    title = news[i].title;
                    content = news[i].content;
                    time = news[i].pubTime;
                    index = time.indexOf(" ");
                    author = news[i].newsType + " . " + news[i].author + " . " + time.substring(0,index);
                    psrc = news[i].psrc + ".jpeg";
                    $("#list").append(' <!-- Start:一篇新闻 -->\n' +
                        '                <div class="news_item">\n' +
                        '                    <!-- Start:新闻封面 -->\n' +
                        '                    <div class="news_cover">\n' +
                        '                        <img class="cover" src="/newsPic/' + psrc + '" width="300px" height="150px">\n' +
                        '                    </div><!-- End:新闻封面 -->\n' +
                        '                    <div class="summary">\n' +
                        '                        <div class="news_title">\n' +
                        '                            <a href="http://localhost:8080/zhixin/news/readNew.action?id=' + news[i].id + '">' + title + '</a></br>\n' +
                        '                        </div>\n' +
                        '                        <div class="news_content">\n' + content +
                        '                            \n' +
                        '                        </div>\n' +
                        '                        <div class="news_author">\n' +
                        '                            <label>' + author + '</label>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </div><!-- End:一条信息结束 -->');
            }
            var start = Math.max(1,Number(currentPage)-2);
            var end = Math.min(Number(currentPage+2),Number(totalPage));
            var sectionOne = '<div class="pageNumber">\n' +
                '                    <div class="page_button">\n' +
                '                        <button type="button" class="btn btn-default page" id="first" onclick="initNewsList(1)">首页</button>\n' +
                '                        <button type="button" class="btn btn-default page" id="previous" onclick="goPrevious()">上一页</button>\n';

            var sectionThree = '<button type="button" class="btn btn-default page" id="next" onclick="goNext()">下一页</button>\n' +
                '                        <button type="button" class="btn btn-default page" id="end" onclick="endPage()" >末页</button>\n' +
                '                        <input type="text" id="totalPage" value="' + totalPage + '"hidden>\n' +
                '                        <input type="text" id="currentPage" value="'+ currentPage +'"hidden>\n' +
                '                    </div>\n';
            var sectionTwo = '';
            if(end-start < 4) {
                start = Math.max(1,end-4);
            }
            for(var i = start; i <= end; i++) {
                if(i == Number(currentPage)) {
                    sectionTwo = sectionTwo + '<button type="button" class="btn btn-default page" onclick="initNewsList('+ i +')" style="background-color: #B4CDCD">'+ i +'</button>\n';
                }else {
                    sectionTwo = sectionTwo + '<button type="button" class="btn btn-default page" onclick="initNewsList('+ i +')">'+ i +'</button>\n';
                }
            }
            $("#list").append(sectionOne+sectionTwo+sectionThree);
        }
    });

}

/*上一页*/
function goPrevious(){
    var currentPage = $("#currentPage").val().trim();
    alert(currentPage);
    if(currentPage == "1") {
        alert("本页已是第一页");
    }else {
        initNewsList(Number(currentPage)-1);
    }
}

/*下一页*/
function goNext() {
    var currentPage = $("#currentPage").val().trim();
    var totalPage = $("#totalPage").val().trim();
    if(currentPage == totalPage) {
        alert("本页已是最后一页");
    }else {
        initNewsList(Number(currentPage)+1);
    }
}

/*末页*/
function endPage() {
    var totalPage = $("#totalPage").val().trim();
    initNewsList(Number(totalPage));
}

