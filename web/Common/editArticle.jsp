<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/16
  Time: 21:13
  编辑分享与求助界面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 分享编辑</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../wangEditor-master/release/wangEditor.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/editArticle.css" type="text/css">
</head>
<body>
    <div class="edit_article_header">
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
    <div class="edit_article">
        <div class="edit_article_content">
            <input type="text" id="statusInput" value="${identity}" hidden/>
            <input type="text" id="userIdInput" value="${uid}" hidden/>

            <select id="type_select" onchange="selectType()">
                    <option value="笔经面经" selected>笔经面经</option>
                    <option value="职业发展">职业发展</option>
                    <option value="内推信息">内推信息</option>
                    <option value="我要提问">我要提问</option>
                    <option value="生活问题">生活问题</option>
                    <option value="留学生">留学生</option>
            </select>
            <input type="text" id="typeInput" hidden/> </br>
            <input type="text" id="titleInput" placeholder="文章标题: 一句话说明你遇到的问题或想分享的经验"/> </br>
            <div id="contentInput">

            </div>
            <div class="operateArticle">
                <button type="button" class="btn btn-default" id="cancel" onclick="goShare()">取 消</button>
                <button type="button" class="btn btn-default" id="publish">发 表</button>
            </div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../wangEditor-master/release/wangEditor.min.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/header_one.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/editArticle.js" type="text/javascript"></script>
</body>
</html>
