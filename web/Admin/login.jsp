<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/11/23
  Time: 11:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<html>
<head>
    <title>知心招聘 | 管理员登录</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="../CSS/AdminCss/admin_login.css" type="text/css">
</head>
<body>
    <div class="admin_login_container">
        <div class="admin_login_up">
            <h1>zhixin</h1>
        </div>
        <div class="admin_login_down"></div>
        <div class="admin_login">
                <div class="login_up">
                    <!-- 标题 -->
                    <h2><span class="glyphicon glyphicon-user"></span>&nbspSIGN&nbspIN</h2><br>
                </div> <!-- 上半部分图标-->
                <!-- 表单 -->
                <div class="login_down">
                    <hr>
                    <form role="form" name="login_form" action="${pageContext.request.contextPath }/admin/adminLogin.action" method="post">
                        <div class="form-group" id="name_block">
                            <label id="name_label" for="username">USERNAME</label>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Account" onblur="usenameBlur()" autocomplete="true">
                        </div>
                        <div class="form-group" id="pass_block">
                            <label id="pass_label" for="password">PASSWORD</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" readonly="true" onblur="passwordBlur()" autocomplete="true">
                        </div>
                        <button type="submit" class="btn btn-default" id="submitBtn"><span class="glyphicon glyphicon-log-in"/> SIGN IN</button>
                    </form>
                </div>
        </div>
    </div>
    <script src="../JS/AdminJs/admin_login.js" type="text/javascript"></script>
</body>
</html>
