<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/20
  Time: 21:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 账号设置</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/header_one.css" type="text/css">
    <link rel="stylesheet" href="../CSS/SeekerCss/setAccount.css" type="text/css">
</head>
<body>
    <div class="setAccountHeader">
        <c:choose>
            <c:when test="${empty identity}">
                <jsp:include page="../Common/header_one.jsp"></jsp:include>
            </c:when>
            <c:otherwise>
                <c:choose>
                    <c:when test="${identity=='boss'}">
                        <jsp:include page="../Boss/header_two.jsp"></jsp:include>
                    </c:when>
                    <c:otherwise>
                        <jsp:include page="../Common/header_one.jsp"></jsp:include>
                    </c:otherwise>
                </c:choose>
            </c:otherwise>
        </c:choose>
    </div>
    <div class="setAccountContainer">
        <div class="setAccountContent">
            <div class="list_left">
                <div class="list_item">
                    <a href="#" onclick="showChangePhoto()">修改头像</a>
                </div>
                <div class="list_item">
                    <a href="#" onclick="showChangePhone()">换绑手机</a>
                </div>
                <div class="list_item">
                    <a href="#">上传简历</a>
                </div>
                <div class="list_item">
                    <a href="#">屏蔽公司</a>
                </div>
                <div class="list_item">
                    <a href="#">收藏职位</a>
                </div>
                <div class="list_item">
                    <a href="#">文章管理</a>
                </div>
                <div class="list_item" id="setAccountSignOut">
                    <a href="http://localhost:8080/zhixin/seeker/signOut.action">退出登录</a>
                </div>
            </div>
            <div class="content" id="content">

            </div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/header_one.js" type="text/javascript"></script>
    <script src="../JS/SeekerJs/setAccount.js" type="text/javascript"></script>
</body>
</html>
