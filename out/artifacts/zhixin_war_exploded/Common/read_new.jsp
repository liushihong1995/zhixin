<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/12/30
  Time: 22:05
  阅读资讯界面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 阅读资讯</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/header_two.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/read_news.css" type="text/css">
</head>
<body>
    <div class="read_new_container">
        <div class="read_new_up">
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
        <div class="read_new_down">
            <div class="new_item">
                <div class="a_new">
                    <div class="new_title">
                        <label id="title">${News.title}</label>
                    </div>
                    <div class="new_infor">
                        <label id="new_type">${News.newsType}</label>
                        <label id="new_author">${News.author}</label>
                    </div>
                    <div class="new_content">
                        ${News.content}
                    </div>
                    <div class="new_item_blank" style="width: 1200px;height: 150px"></div>
                </div>
                <div class="top_news">
                    <div class="top_news_up">
                        <span id="sign"></span>
                        <label>热门资讯</label>
                    </div>
                    <c:forEach items="${itemList}" var="item" varStatus="s">
                        <div class="top_new_item">
                            <a href="${pageContext.request.contextPath }/news/readNew.action?id=${item.id}">${item.title}</a></br>
                            <label id="top_new_type">
                                ${item.newsType}
                            </label>
                            <label id="top_new_author">
                                ${item.author}
                            </label>
                        </div>
                    </c:forEach>
                    <div id="blank_div">

                    </div>
                </div>
                <div style="clear:both;"></div>
            </div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/header_one.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/read_new.js" type="text/javascript"></script>
</body>
</html>
