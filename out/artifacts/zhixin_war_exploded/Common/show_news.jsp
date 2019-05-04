<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/12/25
  Time: 21:06
  显示网站新闻资讯的界面。
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 新闻资讯</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/show_news.css" type="text/css">
</head>
<body>
    <div class="show_news_header">
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
    <div class="show_news_container">
        <!-- Start:上部封面 -->
        <div class="show_news_up">
        </div><!-- End:上部封面 -->
        <!-- Start:下部新闻-->
        <div class="show_news_down">
            <!-- Start: 置顶文章 -->
            <div class="top_news">
                <!-- Start:开心一刻 -->
                <div class="top_news_happy">
                    <div class="top_up" id="happy_up">
                        <span class="title_sign"></span> <label class="news_type">开心一刻</label>
                    </div>
                    <div class="top_mid" id="happy_mid">
                        <img id="happy_mid_img" src="/newsPic/82ba8b15-6d94-4656-b2f2-b3e2352509d5.jpeg" width="300px" height="150px">
                    </div>
                    <div class="top_down" id="happy_down">
                    </div>
                </div><!-- End;开心一刻-->
                <!-- Start:干货文章-->
                <div class="top_news_useful">
                    <div class="top_up" id="useful_up">
                        <span class="title_sign"></span> <label class="news_type">干货文章</label>
                    </div>
                    <div class="top_mid" id="useful_mid">
                        <img id="useful_mid_img" src="/newsPic/82ba8b15-6d94-4656-b2f2-b3e2352509d5.jpeg" width="300px" height="150px">
                    </div>
                    <div class="top_down" id="useful_down">
                    </div>
                </div><!-- End:干货文章-->
                <!-- Start:防骗指南 -->
                <div class="top_prevent_cheat_guide">
                    <div class="top_up" id="guide_up">
                        <span class="title_sign"></span><label class="news_type">防骗指南</label>
                    </div>
                    <div class="top_mid" id="guide_mid">
                        <img id="guide_mid_img" src="/newsPic/82ba8b15-6d94-4656-b2f2-b3e2352509d5.jpeg" width="300px" height="150px">
                    </div>
                    <div class="top_down" id="guide_down">

                    </div>
                </div><!-- End:防骗指南-->
            </div><!-- End:置顶文章 -->
            <!-- Start: 新闻列表 -->
            <div class="news_list" id="list">
                <!-- Start:一篇新闻
                <div class="news_item">
                    <div class="news_cover">
                        <img class="cover" src="/newsPic/82ba8b15-6d94-4656-b2f2-b3e2352509d5.jpeg" width="300px" height="150px">
                    </div>
                    <div class="summary">
                        <div class="news_title">
                            <a href="#"></a></br>
                        </div>
                        <div class="news_content">
                        </div>
                        <div class="news_author">
                            <label></label>
                        </div>
                    </div>
                </div>
            -->
                <div class="pageNumber">
                    <div class="page_button">
                        <button type="button" class="btn btn-default page" id="first">首页</button>
                        <button type="button" class="btn btn-default page" id="previous">上一页</button>
                        <button type="button" class="btn btn-default page" >1</button>
                        <button type="button" class="btn btn-default page">2</button>
                        <button type="button" class="btn btn-default page">3</button>
                        <button type="button" class="btn btn-default page">4</button>
                        <button type="button" class="btn btn-default page">5</button>
                        <button type="button" class="btn btn-default page" id="next">下一页</button>
                        <button type="button" class="btn btn-default page" id="end">末页</button>
                        <input type="text" id="totalPage" hidden>
                        <input type="text" id="currentPage" hidden>
                    </div>
                </div>
                <div style="clear:both;"></div>
            </div><!--End: 新闻列表-->
            <div style="clear:both;"></div>
        </div><!-- End: 下部新闻 -->
    </div>
</body>
<script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../JS/CommonJs/header_one.js" type="text/javascript"></script>
<script src="../JS/CommonJs/show_news.js" type="text/javascript"></script>
</html>
