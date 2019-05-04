<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/12/3
  Time: 16:17
  用来更新管理员信息的界面，包括上传头像，更新个人信息，更改绑定手机，密码重置。
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 更新管理员信息</title>
    <link rel="stylesheet" href="../cropper-master/dist/cropper.min.css" type="text/css">
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="../CSS/AdminCss/update_infor.css">
</head>
<body>
    <div class="update_info_container">
        <div class="update_info_up">
            <div class="left_up">
                <label id="left_up_title">基本信息修改</label></br>
                <label id="departLabel">所在部门</label>&nbsp&nbsp&nbsp
                <input type="text" id="department" placeholder="所在部门" onblur="departBlur()"> </br>
                <label id="emailLabel">常用邮箱</label>&nbsp&nbsp&nbsp
                <input type="text" id="email" placeholder="常用邮箱" onblur="emailBlur()"></br>
                <button type="button" class="btn btn-default" id="deUpdate" onclick="deSave()">保存</button>
            </div> <!-- 左上角，更新基本信息-->

            <div class="right_up">
                <div class="image-and-preview">
                    <div class="img-container">
                        <img id="image" src="">
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
                </div><!-- 显示上传的图片和预览的图片-->
        </div>

        <div class="update_info_down">
            <div class="left_down">
                <label id="left_down_title">换绑手机号码</label></br>
                <label id="oldPhoneLabel">旧手机号</label>&nbsp&nbsp&nbsp
                <input type="text" id="oldPhone" placeholder="请填写旧手机号" readonly="true" disabled="false"></br>
                <label id="newPhoneLabel">新手机号</label>&nbsp&nbsp&nbsp
                <input type="text" id="newPhone" placeholder="请填写新手机号" onblur="newPhoneCheck()">&nbsp&nbsp<span class="" id="newPhoneSign"></span></br>
                <label id="codeLabel">动 态 码</label>&nbsp&nbsp&nbsp&nbsp
                <input type="text" id="dynamicCode" placeholder="请填写短信验证码" disabled="false" onblur="dynamicCodeBlur()">
                <button type="button" class="btn btn-default" id="getCode" disabled="false" onclick="getCodeClick(60)">获取动态码</button></br>
                <button type="button" class="btn btn-default" id="resetBtn" disabled="false" onclick="clearText()">清空</button>
                <button type="button" class="btn btn-default" id="onUpdate" disabled="false" onclick="updatePhone()">保存</button>
            </div> <!-- 更新绑定的电话号码 -->

            <div class="right_down">
                <label id="right_down_title">个人密码重置</label></br>
                <label id="oldPasswordLable">旧 密 码</label>&nbsp&nbsp&nbsp&nbsp&nbsp
                <input type="password" id="oldPassword" placeholder="请填写旧密码" onblur="passExist()">&nbsp&nbsp<span id="existPass" class=""></span></br>
                <label id="newPasswordLabel">新 密 码</label>&nbsp&nbsp&nbsp&nbsp&nbsp
                <input type="password" id="newPassword" placeholder="填写>=6位的字母加数字为新密码" readonly="true" onblur="checkNewPass()">&nbsp&nbsp<span id="newPasswordSign" class=""></span></br>
                <label id="confirPasswordLabel">确认密码</label>&nbsp&nbsp&nbsp
                <input type="password" id="confirPassword" placeholder="再次确认密码" readonly="true" onblur="checkConfirmPass()">&nbsp&nbsp<span id="confimSign" class=""></span></br>
                <button type="button" class="btn btn-default" id="passwordUpdate" disabled="false" onclick="savePassword()">保存</button>
            </div> <!-- 密码重置服务 -->
        </div>
    </div>
    </div>
    <!-- 引入js-->
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../cropper-master/dist/cropper.min.js" type="text/javascript"></script>
    <script src="../JS/AdminJs/JQuerySession.js" type="text/javascript"></script>
    <script src="../JS/AdminJs/update_infor.js" type="text/javascript"></script>
</body>
</html>
