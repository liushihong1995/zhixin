<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2019/1/20
  Time: 15:27
  阅读知心招聘分享模块的文章。
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 分享阅读</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../wangEditor-master/release/wangEditor.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/readArticle.css" type="text/css">
</head>
<body>
    <div class="read_article_header">
        <c:choose>
            <c:when test="${empty identity}">
                <jsp:include page="header_one.jsp"></jsp:include>
            </c:when>
            <c:otherwise>
                <c:choose>
                    <c:when test="${identity=='boss'}">
                        <jsp:include page="../Boss/header_two.jsp"></jsp:include>
                    </c:when>
                    <c:otherwise>
                        <jsp:include page="header_one.jsp"></jsp:include>
                    </c:otherwise>
                </c:choose>
            </c:otherwise>
        </c:choose>
    </div>
    <div class="read_article_container">
        <div class="read_article">
            <div class="read_article_left">
                <input id="articleIdInput" type="text" value="${Article.id}" hidden/>
                <input id="statusInput" type="text" value="${identity}" hidden/>
                <input id="userIdInput" type="text" value="${uid}" hidden/>
                <div class="article_title_div">
                    <label id="article_title">${Article.title}</label>
                </div>
                <div class="article_infor_div">
                    <div class="photo_div">
                        <c:choose>
                            <c:when test="${Article.status == 'seeker'}">
                                <img src="/seekerPic/${Article.photo}" class="img-circle" width="50px" height="50px">
                            </c:when>
                            <c:otherwise>
                                <img src="/seekerPic/${Article.photo}" class="img-circle" width="50px" height="50px">
                            </c:otherwise>
                        </c:choose>
                    </div>
                    <div class="name_and_time">
                        <div class="name_div">
                            <c:choose>
                                <c:when test="${Article.status=='seeker'}">
                                    <a id="user_name" href="http://localhost:8080/zhixin/seeker/browerResume.action?id=${Article.userId}">${Article.userName}</a>
                                </c:when>
                                <c:otherwise>
                                    <a id="user_name" href="http://localhost:8080/zhixin/seeker/browerResume.action?id=${Article.userId}">${Article.userName}</a>
                                </c:otherwise>
                            </c:choose>
                        </div>
                        <div class="time_div">
                            <label id="publish_time">编辑于${Article.time}</label>
                            <label id="replyLabel">回复</label>
                            <label id="replayCount">${Article.reply}</label>
                            <label id="visitLabel">浏览</label>
                            <label id="visitCount">${Article.visit}</label>
                        </div>
                    </div>
                </div>
                <div class="blank"></div>
                <div class="article_content" id="article_content">
                    ${Article.content}
                </div>
                <div class="blank"></div>
                <div class="blank"></div>
                <div class="writer_reply">
                    <label style="font-weight: normal;color: #5e5e5e">评论模块:</label></br>
                    <div class="edit_reply" id="edit_reply">

                    </div>
                    <div class="edit_submit">
                        <button type="button" class="btn btn-default" id="sumbitComment">评 论</button>
                    </div>
                </div>
                <div class="reply_content">
                    </br>
                    <label id="listLabel">评论列表:</label></br></br>
                    <div class="reply_list">
                        <div class="reply_item">
                            <div class="photo_div">
                                <img src="/seekerPic/${Article.photo}" class="img-circle" width="50px" height="50px">
                            </div>
                            <div class="comment_div">
                                <div class="comment_infor">
                                    <a href="#">温姑娘</a>
                                    <label>发表于2018-01-23 19:02:32</label>
                                </div>
                                <div class="comment_content">
                                    不错的文章</br>
                                    不错的文章</br>
                                </div>
                            </div>
                            <div style="clear:both;"></div>
                        </div></br>
                        <div style="clear:both;"></div>
                    </div>
                    <div class="reply_page">
                        <div class="blank">
                            <input id="currentPage" type="text" hidden/>
                            <input id="totalPage" type="text" hidden/>
                        </div>
                        <div class="comment_page">
                        </div>
                    </div>
                </div>
                <div style="clear:both;"></div>
            </div>

            <div class="read_article_right">
                <div class="hot_div_header">
                    <span class="glyphicon glyphicon-stop"></span> <label id="hotTitle">热门文章</label>
                </div>
                <div class="hot_list">
                    <div class="hot_item">
                        <div class="hot_title_div">
                            <a href="#"class="hot_title">圣诞不孤单，一起来狂欢</a>
                        </div>
                        <div class="hot_infor">
                            <label class="hotStaticLabel">发表于</label>
                            <label class="hotPubTime">2019-01-02 19:01:23</label>
                            <label class="hotReplyLabel">回复</label>
                            <label class="hotReply">(51)</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../wangEditor-master/release/wangEditor.min.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/header_one.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/readArticle.js" type="text/javascript"></script>
</body>
</html>
