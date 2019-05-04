<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/27
  Time: 17:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 公司信息管理</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/header_two.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/manageComp.css" type="text/css">

</head>
<body>
    <div class="manageCompHeader">
        <jsp:include page="../Boss/header_two.jsp"></jsp:include>
    </div>
    <div class="manageCompContainer">
        <input type="text" value="${page}" id="pageInput" hidden/>
        <input type="text" value="${operator}" id="operatorInput" hidden/>
        <input type="text" value="${myId}" id="idInput" hidden/>
        <div class="manageCompContent">
            <div class="midLeft">
                <div class="item_first">
                    <label>公司信息编辑</label>
                </div>
                <div class="item" id="basicInfor">
                   <label>基本信息</label>
                </div>
                <div class="item" id="productInfor">
                    <label>产品信息</label>
                </div>
                <div class="item" id="seniorInfor">
                    <label>高管信息</label>
                </div>
                <div class="item" id="pictureInfor">
                    <label>公司图片</label>
                </div>
            </div>
            <div class="midRight">

            </div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/header_two.js" type="text/javascript"></script>
    <script src="../JS/BossJs/manageComp.js" type="text/javascript"></script>
</body>
</html>
