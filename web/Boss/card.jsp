<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/22
  Time: 19:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="../cropper-master/dist/cropper.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/card.css" type="text/css">
</head>
<body>
<div class="cardFrontDiv">
    <div class="cardFrontLeft">
        <p>手持身份证图片上传说明:</p>
        <p>此处要求上传本人手持身份证的照片。</p>
        <p>
            <img id="cardFront" src="../images/handWithCard.png" height="300px" width="300px">
        </p>
        <p>此处图片应是本人素颜手持身份证上半身照片，背景色要求白色，用户面部、手部均需出境，身份证应是清晰的。</p>
    </div>
    <div class="cardFrontRight">
        <div class="image-and-preview" id="show_cover">
            <div class="img-container">
                <img id="image" src="../images/handWithCard.png" height="400px" width="350px">
            </div> <!-- 盛放图片的容器-->
            <div class="btn-group" id="changePhoto">
                <label class="btn btn-primary btn-upload" for="inputImage" title="Upload image file">
                    <input type="file" class="sr-only" id="inputImage" name="file" accept="image/*">
                    <span class="docs-tooltip" data-animation="false" title="打开本地图片">
                                <span class="fa fa-upload">选择图片</span>
                            </span>
                </label>
            </div>
            <div class="btn-group btn-group-crop" id="uploadPhoto">
                <button id="getCroppedCanvas" type="button" class="btn btn-success" >
                    <span class="docs-tooltip" data-animation="false" title="上传图片">上传图片</span>
                </button>
            </div>
            <!-- START:截取固定尺寸Width:300px，Height:150px -->
            <div class="btn-group btn-group-crop" id="cutImage" style="display: none">
                <button type="button" class="btn btn-success" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 350, &quot;height&quot;: 400 }">
                    <span class="docs-tooltip" data-animation="false" title="300*150">&nbsp300*150</span>
                </button>
            </div>
            <!-- END：截取固定尺寸 -->
        </div>
        </br></br></br></br>
        <button class="btn btn-default" type="button" onclick="privous()"  id="previousStep">上一步</button>
        <button class="btn btn-default" type="button" onclick="submitInfor()" id="nextStep">提交认证</button>
    </div>
</div>
<script src="../cropper-master/dist/cropper.min.js" type="text/javascript"></script>
<script src="../JS/BossJs/card.js" type="text/javascript"></script>
</body>
</html>
