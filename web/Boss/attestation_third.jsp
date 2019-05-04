<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/22
  Time: 15:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 上传证件</title>
    <link rel="stylesheet" href="../CSS/BossCss/attestation_third.css" type="text/css">
    <link rel="stylesheet" href="../cropper-master/dist/cropper.min.css" type="text/css">
</head>
<body>
    <div class="attestation_third">
        <input type="text" id="bossIdInput" value="${Boss.id}" hidden/>
        <div class="blank"></div>
        <div class="attestation_step">
            <div class="step_item">
                <div class="order_item">
                    <div class="order">
                        <label>2</label>
                    </div>
                    <div class="item_title">
                        <label>上传个人证件</label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Start:盛放证件照的DIV-->
        <div class="cardImageDiv" id="cardImage">

        </div>
        <!-- End:盛放证件照的DIV-->
    </div>
    <script src="../cropper-master/dist/cropper.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/attestation_third.js" type="text/javascript"></script>
</body>
</html>
