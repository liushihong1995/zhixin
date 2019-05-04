<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/11/27
  Time: 14:28
  侧边栏
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>侧边栏</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="../CSS/AdminCss/sidebar.css">
    <script type="text/javascript" src="../JS/AdminJs/sidebar.js"></script>
</head>
<body>
<body>
<div class="container-fluid">
    <div class="row">
        <!-- 侧边栏 -->
        <div class="sidebar">
            <h4>知心招聘管理</h4>
            <div class="cover">
                <!-- <h2><img class="img-circle" src="images/icon_face.jpg"/></h2>-->
                <b>Hi~ 小主</b>
                <p>超级管理员</p>
            </div>
            <ul class="sidenav animated fadeInUp">
                <li><a class="withripple" href="#"><span class="glyphicon glyphicon-home"></span><span class="sidespan">返回首页</span></a></li>
                <li><a class="withripple hover" href="javascript:;"><span class="glyphicon glyphicon-th" onclick="afterclick()"></span><span class="sidespan">账号管理</span><i class="iright pull-right">&gt;</i></a>
                    <ul class="sidebar-dropdown">
                        <li><a href="list.html" class="withripple" target="myframe">创建管理员账号</a></li>
                        <li><a href="add.html" class="withripple" target="myframe">销毁管理员账号</a></li>
                        <li><a href="#" class="withripple" target="myframe">封杀用户账号</a> </li>
                        <li><a href="#" class="withripple" target="myframe">解封用户账号</a></li>
                    </ul>
                </li>
                <li><a class="withripple" href="javascript:;"><span class="glyphicon glyphicon-cog"></span><span class="sidespan">个人中心</span><i class="iright pull-right">&gt;</i></a>
                    <ul class="sidebar-dropdown">
                        <li><a href="#" class="withripple">更换绑定号码</a></li>
                        <li><a href="#" class="withripple">密码重置</a></li>
                    </ul>
                </li>
                <li><a class="withripple" href="javascript:;"><span class="glyphicon glyphicon-asterisk"></span><span class="sidespan">文章管理</span><i class="iright pull-right">&gt;</i></a>
                    <ul class="sidebar-dropdown">
                        <li><a href="" class="withripple">资讯管理</a></li>
                        <li><a href="" class="withripple">面经管理</a></li>
                    </ul>
                </li>
                <li><a class="withripple" href="javascript:;"><span class="glyphicon glyphicon-star"></span><span class="sidespan">分类管理</span><i class="iright pull-right">&gt;</i></a>
                    <ul class="sidebar-dropdown">
                        <li><a href="#" class="withripple">面经分类</a></li>
                        <li><a href="#" class="withripple">职位分类</a></li>
                        <li><a href="#" class="widthripple">资讯分类</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 侧边栏 完-->
        <!-- 主体部分  -->
        <div class="main">    主体部分的内容</div>
    </div>
</body>
</body>
</html>
