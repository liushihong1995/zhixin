<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/21
  Time: 21:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 信息完善</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/header_two.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/attestation_second.css" type="text/css">
</head>
<body>
    <div class="attestation_container">
        <div class="attestation_header">
            <jsp:include page="../Boss/header_two.jsp"></jsp:include>
        </div>
        <div class="attestation_second">
            <input type="text" id="bossIdInput" value="${uid}" hidden/>
            <div class="attestation_step">
                <div class="step_item">
                    <div class="order_item">
                        <div class="item_title">
                            <label>完善基本信息</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="basic_infor_div">
                <label id="bossPhoneLabel">手机号码:</label><input type="text" id="bossPhoneInput" readonly="true"/></br>
                <label id="bossNickLabel">用户昵称:</label><input type="text" id="bossNickInput"/></br>
                <label id="bossRealLabel">真实姓名:</label><input type="text" id="bossRealInput" placeholder="请填写身份证上的真实姓名"/></br>
                <label id="bossCompLabel">任职公司:</label><input type="text" id="bossCompInput" placeholder="例如：北京嘀嘀无限科技发展有限公司"/>
                <input type="text" id="bossCompIdInput" hidden/>
                <input type="text" id="bossCompLongInput" hidden/>
                <div class="compList">
                </div>
                </br>
                <label id="bossJobLabel">工作职位:</label><input type="text" id="bossJobInput" placeholder="例如：HR"/></br>
                <label id="emailLabel">常用邮箱:</label><input type="text" id="bossEmailInput" placeholder="例如: XXX@qq.com"></br>
                <label id="bossSexLabel">用户性别:</label>
                <button class="btn btn-default" type="button" id="male">男</button>
                <button class="btn btn-default" type="button" id="female">女</button>
                <input type="text" id="bossSexInput" hidden/></br>
                <!--
                <button class="btn btn-default" type="button" id="saveOneStep" onclick="saveStep(1)">暂 存</button>
                <button class="btn btn-default" type="button" id="oneStep" onclick="goStep(2)">下一步</button>
                -->
                <button class="btn btn-default" type="button" id="saveInfor" onclick="save()">保 存</button>
            </div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/attestation_second.js" type="text/javascript"></script>
</body>
</html>
