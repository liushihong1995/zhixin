<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/31
  Time: 16:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 高管编辑</title>
    <link rel="stylesheet" href="../cropper-master/dist/cropper.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/editSenior.css" type="text/css">
</head>
<body>
    <div class="editSeniorContainer">
        <input type="text" id="bossId" value="${Boss.id}" hidden/>
        <input type="text" id="esPage" hidden/>
        <input type="text" id="esOperator" hidden/>
        <input type="text" id="esId" hidden/>
        <div class="seniorPhotoDiv">
            <label style="font-weight: lighter">修改高管头像</label></br>
            <div class="image-and-preview" id="show_cover">
                <div class="img-container">
                    <img id="image" src="../images/icon_face.jpg" height="150px" width="150px">
                </div> <!-- 盛放图片的容器-->
                <div class="btn-group" id="changeLogo">
                    <label class="btn btn-primary btn-upload" for="inputImage" title="Upload image file" id="choseLogo">
                        <input type="file" class="sr-only" id="inputImage" name="file" accept="image/*">
                        <span class="docs-tooltip" data-animation="false" title="打开本地图片">
                                <span class="fa fa-upload">选择图片</span>
                            </span>
                    </label>
                </div>
                <!-- START:截取固定尺寸Width:300px，Height:150px -->
                <div class="btn-group btn-group-crop" id="cutImage" style="display: none">
                    <button type="button" class="btn btn-success" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 100, &quot;height&quot;: 100 }">
                        <span class="docs-tooltip" data-animation="false" title="150*150">&nbsp150*150</span>
                    </button>
                </div>
                <!-- END：截取固定尺寸 -->
            </div>

        </div>
        <div class="seniorInforDiv">
            <div class="itemInfor">
                <label>高管姓名：</label>
                <input type="text" id="nameInput" placeholder="例如：马云">
            </div>
            <div class="itemInfor">
                <label>高管职位：</label>
                <input type="text" id="jobInput" placeholder="例如：CEO/技术总监...">
            </div>
            <div class="itemInfor">
                <label>高管简介：</label>
                <textarea id="introduceInput" placeholder="简单介绍一下这个高管">

                </textarea>
            </div>
            <div class="itemInfor">
                <button class="btn btn-default" type="button" id="cancel" onclick="clearText()">清 空</button>
                <button class="btn btn-default" type="button" id="seniorInforSubmit" onclick="submitSenior()">完 成</button>
            </div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../cropper-master/dist/cropper.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/editSenior.js" type="text/javascript"></script>
</body>
</html>
