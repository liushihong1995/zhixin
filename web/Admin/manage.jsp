<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/11/27
  Time: 12:33
  管理员管理界面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <meta name="applicable-device" content="pc">
    <title>知心招聘 | 管理</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/AdminCss/sidebar.css" type="text/css">
    <link rel="stylesheet" href="../CSS/AdminCss/manage.css" type="text/css">
</head>
<body>
    <div class="manage_up">
        <!-- manage_up_content用来固定导航栏 -->
        <div class="manage_up_content">
            <div class="manage_up_left">
                <h3 id="manage_page_title">知心招聘管理</h3>
            </div>
            <div class="manage_up_right">
                <span id="sign_out">
                    <label id="sign_out_label"><a href="http://localhost:8080/zhixin/admin/signOut.action" id="signOutHref">登 出</a></label>&nbsp
                    <span class="glyphicon glyphicon-log-out" id="logOut"></span>
                </span>
            </div>
        </div>
    </div><!-- 存放logo等-->

    <div class="manage_down">
        <!-- 侧边栏 -->
        <div class="sidebar">
            <div class="cover">
                <h2><img class="img-circle" id="adminPsrc" src=""/></h2>
                <b id="adminPhone"></b>
                <p id="adminName"></p>
                <input type="text" id="userAccount" value="${adminId}" hidden/>
            </div>
                <ul class="sidenav animated fadeInUp">
                    <li><a class="withripple" href="#"><span class="glyphicon glyphicon-home"></span><span class="sidespan">返回首页</span></a></li>
                    <li><a class="withripple hover" href="javascript:;"><span class="glyphicon glyphicon-th" onclick="afterclick()"></span><span class="sidespan">账号管理</span><i class="iright pull-right">&gt;</i></a>
                        <ul class="sidebar-dropdown">
                            <li><a href="#" class="withripple" onclick="show_create_admin()"><span class="subspan">创建管理员账号</span></a></li>
                            <li><a href="#" class="withripple" onclick="show_admin_list()"><span class="subspan"> 销毁管理员账号</span></a></li>
                        </ul>
                    </li>
                    <li><a class="withripple" href="javascript:;"><span class="glyphicon glyphicon-cog"></span><span class="sidespan">个人中心</span><i class="iright pull-right">&gt;</i></a>
                        <ul class="sidebar-dropdown">
                            <li><a href="#" class="withripple" onclick="update_admin_infor()"><span class="subspan">更新个人信息</span></a></li>
                        </ul>
                    </li>
                    <li><a class="withripple" href="javascript:;"><span class="glyphicon glyphicon-asterisk"></span><span class="sidespan">文章管理</span><i class="iright pull-right">&gt;</i></a>
                        <ul class="sidebar-dropdown">
                            <li><a href="#" class="withripple" onclick="show_manage_news()"><span class="subspan">资讯管理</span></a></li>
                        </ul>
                    </li>
                    <li><a class="withripple" href="javascript:;"><span class="glyphicon glyphicon-star"></span><span class="sidespan">分类管理</span><i class="iright pull-right">&gt;</i></a>
                        <ul class="sidebar-dropdown">
                            <li><a href="#" class="withripple" onclick="show_industry_manage()"><span class="subspan">行业分类</span></a></li>
                            <li><a href="#" class="withripple" onclick="show_category_manage()"><span class="subspan">职位分类</span></a></li>
                        </ul>
                    </li>
                </ul>
        </div><!-- 左边放导航栏，右边放框-->

        <div class="manage_content" id="content">

        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/AdminJs/sidebar.js" type="text/javascript"></script>
</body>
</html>
