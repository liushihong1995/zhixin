<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2018/12/23
  Time: 16:34
  求职者和招聘者共用同一个注册页面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 用户注册</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/register.css" type="text/css">
</head>
<body>
<div class="user_register_container">
    <!-- Start 网站logo -->
    <div class="logo">
        <label>
            知 心</br>
            招 聘
        </label>
    </div><!-- End 网站logo-->
    <!-- Start 网站口号-->
    <div class="slogan">
        <label>
            知你心意，</br>
            想你所想！
        </label>
    </div><!-- End 网站口号-->

    <!-- Start 登录板块 -->
    <div class="user_register_div">
        <!-- Start 板块标题 -->
        <div class="user_register_up">
            <h2>注册知心招聘</h2>
            <label id="error_hint">手机号已注册，请直接登录</label>
        </div> <!-- End 板块标题 -->
        <!-- Start 填写登录信息模块-->
        <div class="user_register_middle">
            <form role="form">
                <div class="form-group">
                        <span class="input-group-addon" id="basic-addon1">
                            <span class="glyphicon glyphicon-th-list"></span>
                        </span>
                    <select id="chose_identity" onchange="changeIdentity()">
                        <option selected>我要找工作</option>
                        <option>我要招聘</option>
                    </select>
                </div>
                <div class="form-group">
                        <span class="input-group-addon">
                           <span class="glyphicon glyphicon-phone"></span>
                        </span>
                    <input type="text" name="phone" id="phone" placeholder="请填写手机号码" onblur="phoneBlur()">
                </div>
                <div class="form-group">
                    <span class="input-group-addon" id="basic-addon3">
                        <span class="glyphicon glyphicon-envelope"></span>
                    </span>
                    <input type="text" name="code" id="code" placeholder="请填写动态码" disabled="false" onblur="codeBlur()">
                    <button class="btn btn-default" type="button" id="getCode" disabled="false" onclick="getCodeClick()">获取动态码</button>
                </div>
                <button class="btn btn-default" type="button" id="submit_infor" disabled="false" onclick="submitClick()">注 册</button>
            </form>
        </div><!-- End 填写登录信息模块结束 -->
        <!-- Start 放置注册链接模块 -->
        <div class="user_register_down">
            <label id="protocal_sign">点击注册按钮即为您同意</label>&nbsp&nbsp<a href="user_protocal.jsp" id="goUserProtocal">用户协议及隐私政策</a></br>
            <label id="noAccount">已有账号</label>&nbsp&nbsp<a href="../Common/login.jsp" id="goLogin">直接登录</a>
        </div>
    </div><!-- End 登录板块结束-->
</div>
<script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../JS/CommonJs/register.js" type="text/javascript"></script>
</body>
</html>
