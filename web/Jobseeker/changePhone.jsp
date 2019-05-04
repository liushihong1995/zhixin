<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/21
  Time: 11:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 换绑号码</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/SeekerCss/changePhone.css" type="text/css">
</head>
<body>
    <div class="changePhoneContainer">
        <div class="changePhone">
            <label class="oldPhoneLabel">当前绑定手机号:</label>
            <input type="text" id="oldPhoneInput" disabled="false"/></br></br></br>
            <label class="newPhoneLabel">更改绑定手机号:</label>
            <input type="text" id="newPhoneInput" placeholder="请填写新手机号码" onblur="checkNewPhone()"/></br></br></br>
            <label class="dynamicCodeLabel">短信验证码:</label>
            <input type="text" id="dynamicCode" placeholder="请填写收到的短信验证码" disabled="false" onblur="checkCode()"/>
            <button class="btn btn-default" id="getCode" disabled="false" onclick="getSMSCode()">获取验证码</button></br></br></br>
            <button class="btn btn-default" type="button" id="clearInfor" disabled="false" onclick="clearInfor()">清 空</button>
            <button class="btn btn-default" type="button" id="submitChange" disabled="false" onclick="submitInfor()">提 交</button>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/header_one.js" type="text/javascript"></script>
    <script src="../JS/SeekerJs/changePhone.js" type="text/javascript"></script>
</body>
</html>
