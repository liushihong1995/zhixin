<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/28
  Time: 18:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 产品编辑</title>
    <link rel="stylesheet" href="../cropper-master/dist/cropper.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/editProduct.css" type="text/css">
</head>
<body>
    <div class="editProductContainer">
        <input type="text" id="bossId" value="${uid}" hidden/>
        <input type="text" id  ="epPage"hidden/>
        <input type="text" id="epOperator" hidden/>
        <input type="text" id="epId" hidden/>
        <div class="productLogoDiv">
            <label>修改产品LOGO</label></br>
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
        <div class="productInforDiv">
            <div class="itemInfor">
                <label>产品名称：</label>
                <input type="text" id="nameInput" placeholder="例如：抖音">
            </div>
            <div class="itemInfor">
                <label>产品广告：</label>
                <input type="text" id="sloganInput" placeholder="例如：创造美好生活！">
            </div>
            <div class="itemInfor">
                <label>产品链接：</label>
                <input type="text" id="urlInput">
            </div>
            <input type="text" id="compIdInput" hidden/>
            <div class="operateDiv">
                <button type="button" class="btn btn-default" id="cancel" onclick="clearText()">清 空</button>
                <button type="button" class="btn btn-default" id="productInforSubmit" onclick="submitProduct()">完 成</button>
            </div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../cropper-master/dist/cropper.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/editProduct.js" type="text/javascript"></script>
</body>
</html>
