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
    <link rel="stylesheet" href="../CSS/BossCss/cardFront.css" type="text/css">
</head>
<body>
    <div class="cardFrontDiv">
        <div class="cardFrontLeft">
            <p>身份证正面上传说明:</p>
            <p>此处要求上传的是身份证带有个人信息的一面。效果如下图所示。</p>
            <p>
                <img id="cardFront" src="../images/cardFront.png" height="180px" width="300px">
            </p>
            <p>要求上传的身份证正面图片必须是清晰的、真实的、合法的，这关乎到身份证上的个人信息是否可以被成功地识别，如果上传的图片模糊，则无法通过审核。知心招聘平台严禁用户冒用他人身份证，上传虚假信息。</p>
        </div>
        <div class="cardFrontRight">
            <div class="image-and-preview" id="show_cover">
                <div class="img-container">
                    <img id="image" src="../images/cardFront.png" height="150px" width="300px">
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
                    <button type="button" class="btn btn-success" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 300, &quot;height&quot;: 150 }">
                        <span class="docs-tooltip" data-animation="false" title="300*150">&nbsp300*150</span>
                    </button>
                </div>
                <!-- END：截取固定尺寸 -->
            </div>
            </br></br></br></br></br></br></br></br>
            <button class="btn btn-default" type="button" onclick="next()" id="nextStep">下一步</button>
        </div>
    </div>
    <script src="../cropper-master/dist/cropper.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/cardFront.js" type="text/javascript"></script>
</body>
</html>
