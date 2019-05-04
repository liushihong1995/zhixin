<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/21
  Time: 13:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 头部</title>
</head>
<body>
<div class="header_container">
    <!-- Start:网站logo区域-->
    <div class="title">
        <a id="website_name">知心招聘</a>
    </div> <!-- End:网站logo区域 -->
    <!-- Start:网站导航栏 -->
    <div class="daohang">
        <a href="http://localhost:8080/zhixin/boss/homepage.action" id="home_page">首 页</a>
        <a href="http://localhost:8080/zhixin/boss/searchTalent.action" id="seek_job">招 聘</a>
        <a href="../Common/share.jsp" id="share_infor">分 享</a>
        <a href="../Common/show_news.jsp" id="web_news">资 讯</a>
    </div><!-- End:网站导航栏 -->
    <c:choose>
        <c:when test="${not empty uid}"> <!-- 已经登录的情况下 -->
            <input type="text" value="${uid}" id="bossId" hidden/>
            <input type="text" value="${identity}" id="identity" hidden/>
            <div class="user_photo">
                <a href="#" id="message">消 息</a>
                <a href="../Boss/manageJob.jsp" id="cv">职 位</a>
                <div class="dropdownContainer">
                    <div class="dropdown">
                        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <label id="bossNickName"></label>
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li><a href="../Boss/attestation_second.jsp">完善信息</a></li>
                            <li><a href="../Jobseeker/setAccount.jsp">个人中心</a></li>
                            <li><a href="../Boss/mangeCompInfor.jsp">公司信息管理</a></li>
                            <li><a href="http://localhost:8080/zhixin/boss/signOut.action">退出登录</a></li>
                        </ul>
                    </div>
                </div>
                <img id="seekerPhoto" src="" alt="用户头像" class="img-circle" width="35px" height="35px">
            </div>
        </c:when>
        <c:otherwise>
            <input type="text" value="0" id="bossId" hidden/>
            <input type="text" value="noUser" id="identity" hidden/>
            <!-- Start:用户未登录时，登录或注册区域 -->
            <div class="login_or_register">
                <button class="btn btn-default" id="user_login" type="button" onclick="goLogin()">登 录</button>
                <button class="btn btn-default" id="user_register" type="button" onclick="goRegister()">注 册</button>
            </div>
        </c:otherwise>
    </c:choose>
</div>
<script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="../JS/BossJs/header_two.js" type="text/javascript"></script>
</body>
</html>
