<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/12/23
  Time: 14:09
  求职者和招聘者共同的登录界面。
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 用户登录</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../CSS/CommonCss/login.css">
</head>
<body>
    <div class="user_login_container">
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
        <div class="user_login_div">
            <!-- Start 板块标题 -->
            <div class="user_login_up">
                <h2>登录知心招聘</h2>
                <label id="error_hint">账号不存在，请注册后再登录</label>
            </div> <!-- End 板块标题 -->
            <!-- Start 填写登录信息模块-->
            <div class="user_login_middle">
                <form role="form" action="${pageContext.request.contextPath }/user/login.action" method="post">
                    <div class="form-group">
                        <span class="input-group-addon" id="basic-addon1">
                            <span class="glyphicon glyphicon-th-list"></span>
                        </span>
                        <select id="chose_identity" name="chose" onchange="changeIdentity()">
                            <option selected>求职者</option>
                            <option>招聘者</option>
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
                        <input type="text" name="code" id="code" placeholder="请填写动态码" readonly="true" onblur="codeBlur()">
                        <button class="btn btn-default" type="button" id="getCode" disabled="false" onclick="getCodeClick()">获取动态码</button>
                    </div>
                    <button class="btn btn-default" type="submit" id="submit_infor" disabled="false">登 录</button>
                </form>
            </div><!-- End 填写登录信息模块结束 -->
            <!-- Start 放置注册链接模块 -->
            <div class="user_login_down">
                <label id="noAccount">没有账号</label>&nbsp&nbsp<a href="../Common/register.jsp" id="goRegister">立即注册</a>
            </div>
        </div><!-- End 登录板块结束-->
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/login.js" type="text/javascript"></script>
</body>
</html>
