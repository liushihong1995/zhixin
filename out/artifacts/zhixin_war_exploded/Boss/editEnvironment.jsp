<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/4/25
  Time: 14:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 环境图片</title>
    <link rel="stylesheet" href="../cropper-master/dist/cropper.min.css" type="text/css">
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/editEnvironment.css" type="text/css">
</head>
<body>
    <div class="editEnvironmentContainer">
        <input type="text" id="bossId" value="${uid}" hidden/>
        <input type="text" id="eePage"hidden/>
        <input type="text" id="eeOperator" hidden/>
        <input type="text" id="eeId" hidden/>
    <div class="img-container">
        <img id="image" src="../images/icon_face.jpg">
    </div><!-- 盛放图片的容器 -->

    <div class="functionButton docs-buttons">
        <div class="btn-group">
            <button type="button" class="btn btn-primary" data-method="rotate" data-option="-90" title="Rotate Left">
                            <span class="docs-tooltip" data-animation="false" title="向左旋转">
                                <span class="fa fa-rotate-left">向左旋转</span>
                            </span>
            </button>
        </div></br>

        <div class="btn-group">
            <button type="button" class="btn btn-primary" data-method="rotate" data-option="90" title="Rotate Right">
                            <span class="docs-tooltip" data-animation="false" title="向右旋转">
                                <span class="fa fa-rotate-right">向右旋转</span>
                            </span>
            </button>
        </div></br>

        <div class="btn-group">
            <label class="btn btn-primary btn-upload" for="inputImage" title="Upload image file">
                <input type="file" class="sr-only" id="inputImage" name="file" accept="image/*">
                <span class="docs-tooltip" data-animation="false" title="打开本地图片">
                                <span class="fa fa-upload">选择图片</span>
                            </span>
            </label>
        </div></br>
        <!-- 截取固定尺寸 -->
        <div class="btn-group btn-group-crop">
            <button type="button" class="btn btn-success" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 200, &quot;height&quot;: 200 }">
                <span class="docs-tooltip" data-animation="false" title="200*200">&nbsp200*200</span>
            </button>
        </div></br>

        <div class="btn-group btn-group-crop">
            <button id="getCroppedCanvas" type="button" class="btn btn-success" >
                <span class="docs-tooltip" data-animation="false" title="上传图片">上传图片</span>
            </button>
        </div></br>
        <!-- 获取图片浮窗 -->
        <div class="modal fade docs-cropped" id="getCroppedCanvasModal" aria-hidden="true" aria-labelledby="getCroppedCanvasTitle" role="dialog" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="getCroppedCanvasTitle">图片</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../cropper-master/dist/cropper.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/header_two.js" type="text/javascript"></script>
    <script src="../JS/BossJs/editEnvironment.js" type="text/javascript"></script>
</body>
</html>
