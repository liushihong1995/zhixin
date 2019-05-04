<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/11/27
  Time: 19:55
  创建管理员界面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 创建管理员</title>
    <META HTTP-EQUIV="pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
    <META HTTP-EQUIV="expires" CONTENT="0">
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="../CSS/AdminCss/create_admin.css">
</head>
<body>
    <div class="create_admin_container">
        <h1 id="create_admin_title"><b>填写管理员信息</b></h1></br></br>
        <div class="form-group">
            <label class="leftLabel">手机号码</label>
            <label class="rightLabel">用户密码</label></br>
            <input type="text" class="leftText" id="phone" placeholder="手机号码" onblur="phoneBlur()">&nbsp<span id="idSign" class=""></span>
            <input type="password" class="rightText" id="password" placeholder="用户密码" readonly="true">&nbsp<span id="pwdSign" class=""></span>
        </div>

        <div class="form-group">
            <label class="leftLabel">真实姓名</label>
            <label class="rightLabel">身份证号</label></br>
            <input type="text" class="rightText" id="name" placeholder="真实姓名" onblur="nameBlur()">&nbsp<span id="nameSign" class=""></span>
            <input type="text" class="leftText" id="cardNum" placeholder="身份证号" onblur="cardBlur()">&nbsp<span id="cardSign" class=""></span>
        </div>

        <div class="form-group">
            <label class="leftLabel">所在部门</label>
            <label class="rightLabel">常用邮箱</label></br>
            <input type="text" class="rightText" id="department" placeholder="所在部门" onblur="departBlur()">&nbsp<span id="departSign" class=""></span>
            <input type="text" class="leftText" id="email" placeholder="常用邮箱" onblur="emailBlur()">&nbsp<span id="emailSign" class=""></span>
            </br></br></br></br></br></br>
            <button type="button" class="btn btn-default" id="resetBtn" onclick="textClear()">重 置</button>
            <button type="button" class="btn btn-default" id="createBtn" onclick="save()">保 存</button>
        </div>
        <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
        <script src="../JS/AdminJs/create_admin.js" type="text/javascript"></script>
</div>
</body>
</html>
