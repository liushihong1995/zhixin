<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/16
  Time: 17:52
  To change this template use File | Settings | File Templates.
  分享求助模块
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 分享求助</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/share.css" type="text/css">
</head>
<body>
    <div class="share_header">
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
    <div class="share_middle">
        <div class="share_content">
            <div class="share_content_left">
                <div class="share_and_help_div">
                    <span class="glyphicon glyphicon-stop"></span> <label id="share_and_help_label">分享与求助</label>
                    <button type="button" class="btn btn-default" id="edit_article" onclick="goEditArticle()"><span class="glyphicon glyphicon-edit"></span> 我要发布</button>
                </div>
                <div class="share_type">
                    <div class="share_type_left">
                        <label>文章类型:</label>
                    </div>
                    <div class="share_type_right">
                        <label id="allType" onclick="typeClick('全部',this)">全 部</label>
                        <label onclick="typeClick('笔经面经',this)">笔经面经</label>
                        <label onclick="typeClick('职业发展',this)">职业发展</label>
                        <label onclick="typeClick('内推信息',this)">内推信息</label>
                        <label onclick="typeClick('我要提问',this)">我要提问</label>
                        <label onclick="typeClick('生活问题',this)">生活问题</label>
                        <label onclick="typeClick('留学生',this)">留学生</label>
                    </div>
                </div>
                <div class="article_list">
                    <!--
                    <div class="article_item">
                        <div class="userPhoto">
                            <img src="../images/icon_face.jpg" class="img-circle userImage" width="50px" height="50px">
                        </div>
                        <div class="article_infor">
                            <div class="article_title_div">
                                <a href="#" class="article_title">
                                    圣诞不孤单，一起来狂欢
                                </a>
                            </div>
                            <div class="article_other_infor">
                                <a href="#" class="userName">温姑娘</a>
                                <label class="pubTime">2019-01-16</label>
                                <label class="staticLabel">发表在</label>
                                <label class="articeType">[笔经面经]</label>
                                <label class="replyCountLabel">回复</label>
                                <label class="replyCount">51</label>
                                <label class="visitCountLabel">浏览</label>
                                <label class="visitCount">1200</label>
                            </div>
                        </div>
                    </div>
                    -->
                </div>
                <div class="page">
                    <input type="text" id="currentPage" hidden/>
                    <input type="text" id="totalPage" hidden/>
                </div>
                <div class="page" id="fenye">
                    <button class="btn btn-default" type="button" id="firstPage">首页</button>
                    <button class="btn btn-default" type="button" id="previous">上一页</button>
                    <button class="btn btn-default" type="button" >1</button>
                    <button class="btn btn-default" type="button">2</button>
                    <button class="btn btn-default" type="button">3</button>
                    <button class="btn btn-default" type="button">4</button>
                    <button class="btn btn-default" type="button">5</button>
                    <button class="btn btn-default" type="button">6</button>
                    <button class="btn btn-default" type="button">7</button>
                    <button class="btn btn-default" type="button" id="next">下一页</button>
                    <button class="btn btn-default" type="button" id="lastPage">末页</button>
                </div>
                <div class="page"></div>
                <div style="clear:both;"></div>
            </div>
            <div class="share_content_right">
                <div class="hot_div_header">
                    <span class="glyphicon glyphicon-stop" style="margin-left: 10px"></span> <label id="hotTitle">热门文章</label>
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
    <script src="../JS/CommonJs/header_one.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/share.js" type="text/javascript"></script>

</body>
</html>
