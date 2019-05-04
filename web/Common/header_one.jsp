<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/12/23
  Time: 16:55
  上部导航栏
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 头部</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
</head>
<body>
    <div class="header_container">
        <!-- Start:网站logo区域-->
        <div class="title">
            <a id="website_name">知心招聘</a>
        </div> <!-- End:网站logo区域 -->
        <!-- Start:网站导航栏 -->
        <div class="daohang">
            <a href="http://localhost:8080/zhixin/seeker/homepage.action" id="home_page">首 页</a>
            <a href="http://localhost:8080/zhixin/seeker/searchJob.action" id="seek_job">求 职</a>
            <a href="../Common/share.jsp" id="share_infor">分 享</a>
            <a href="../Common/show_news.jsp" id="web_news">资 讯</a>
        </div><!-- End:网站导航栏 -->
        <c:choose>
            <c:when test="${not empty uid}"> <!-- 已经登录的情况下 -->
                <input type="text" value="${uid}" id="uid" hidden/>
                <input type="text" value="${identity}" id="identity" hidden/>
                <div class="user_photo">
                    <a href="#" id="message">消 息</a>
                    <a href="../Jobseeker/resume.jsp" id="cv">简 历</a>
                    <a href="../Jobseeker/setAccount.jsp" id="sname"></a>
                    <img id="seekerPhoto" src="" alt="用户头像" class="img-circle" width="35px" height="35px">
                </div>
            </c:when>
            <c:otherwise>
                <input type="text" value="0" id="uid" hidden/>
                <input type="text" value="noUser" id="identity" hidden/>
                <!-- Start:用户未登录时，登录或注册区域 -->
                <div class="login_or_register">
                    <button class="btn btn-default" id="user_login" type="button" onclick="goLogin()">登 录</button>
                    <button class="btn btn-default" id="user_register" type="button" onclick="goRegister()">注 册</button>
                </div>
            </c:otherwise>
        </c:choose>
    </div>
</body>
</html>
