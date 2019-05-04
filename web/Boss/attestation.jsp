<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2019/1/21
  Time: 18:39
  实名认证界面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 实名认证</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/header_two.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/attestation.css" type="text/css">
</head>
<body>
    <div class="attestation_header">
        <jsp:include page="../Boss/header_two.jsp"></jsp:include>
    </div>
    <div class="attestation_container">
        <div class="attestation_middle" id="content">

        </div>
        <div style="clear:both;"></div>
    </div>
    <div class="another_blank"></div>
    <div class="attestation_footer">
        <jsp:include page="../Common/footer_one.jsp"></jsp:include>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/attestation.js" type="text/javascript"></script>
</body>
</html>
