<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/25
  Time: 20:19
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
    <link rel="stylesheet" href="../CSS/BossCss/mangeCompInfor.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/header_two.css" type="text/css">
</head>
<body>
    <div class="mangeCompInforHeader">
        <jsp:include page="../Boss/header_two.jsp"></jsp:include>
    </div>
    <div class="mangeCompInforUp">
        <form name="paramFrom" action="${pageContext.request.contextPath }/boss/manageComp.action" method="post" hidden>
            <input id="pageInput" name="pageInput">
            <input id="operatorInput" name="operatorInput">
            <input id="idInput" name="idInput">
            <button class="btn btn-default" type="submit" id="submitParam"></button>
        </form>
        <input id="bossIdInput" type="text" value="${uid}" hidden/>
        <div class="up_content">
            <div class="compLogoDiv">
                <img id="compLogo" width="100px" height="100px" src="../images/icon_face.jpg">
            </div>
            <div class="compInforDiv">
                <input id="compIdInput" type="text" hidden/>
                <label id="compName">北京嘀嘀无限科技发展有限公司(滴滴出行)</label>
                <span id="compEdit" class="glyphicon glyphicon-edit" onclick="deal('basicInfor','modify')"></span>
                <label id="compIndustry">移动互联网</label>
                <label id="compScope">10000人以上</label>
                <label id="compStage">D轮及以上</label></br>
                <label id="compWeb">http://www.didiglobal.com</label>
            </div>
        </div>
    </div>
    <div class="manageCompInforMid">
        <div class="manageCompInforContainer">
            <div class="productList">
                <!--
                </br></br></br>
                <div class="title"><label>产品列表</label></div></br>
                <div class="productItem">
                    <div class="productLogoDiv">
                        <img class="productLogo" width="50px" height="50px" src="../images/icon_face.jpg">
                    </div>
                    <div class="productInforDiv">
                        <label class="productName">抖音 | 记录美好生活</label></br>
                        <label class="productUrl">http://douyin.com</label>
                    </div>
                </div>
                <div class="addInfor">
                    <span class="glyphicon glyphicon-plus"></span><label id="addProduct" onclick="deal('productInfor','add')">添加公司产品</label>
                </div>
                -->
            </div>
            <div class="seniorList">
                <!--
                <div class="title"><label>高管列表</label></div></br>
                <div class="seniorItem">
                    <div class="seniorPhotoDiv">
                        <img src="../images/icon_face.jpg" width="50px" height="50px" class="img-circle seniorPhoto">
                    </div>
                    <div class="seniorInforDiv">
                        <label class="seniorName">温姑娘</label></br>
                        <label class="seniorJob">CEO</label>
                    </div>
                    <div class="seniorIntroduce">
                        哈哈哈啊哈哈哈啊哈哈哈
                    </div>
                    <div class="seniorOpDiv">
                        <span class="glyphicon glyphicon-edit seniorEdit"></span>
                        <span class="glyphicon glyphicon-trash seniorTrash"></span>
                    </div>
                </div>
                <div class="addInfor">
                    <span class="glyphicon glyphicon-plus"></span><lable id="addSenior()">添加高管信息</lable>
                </div>
                -->
            </div>
            <div class="pictureList">
                <!--
                <div class="title"><label>公司图片</label></div></br>
                <div class="pictureItem">
                    <img src="../images/icon_face.jpg" width="160px" height="100px">
                    <span class="glyphicon glyphicon-trash picTrash"></span>
                </div>
                <div class="pictureItem">
                    <img src="../images/icon_face.jpg" width="160px" height="100px">
                    <span class="glyphicon glyphicon-trash picTrash"></span>
                </div>
                <div class="pictureItem">
                    <img src="../images/icon_face.jpg" width="160px" height="100px">
                    <span class="glyphicon glyphicon-trash picTrash"></span>
                </div>
                <div class="addInfor">
                    <span class="glyphicon glyphicon-plus"></span><lable id="addPicture">添加公司图片</lable>
                </div>
                -->
            </div>
            <div class="blank"></div>
            <div class="blank"></div>
            <div style="clear:both;"></div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/mangeCompInfor.js" type="text/javascript"></script>
</body>
</html>
