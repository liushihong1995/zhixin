<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/27
  Time: 17:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 基本信息编辑</title>
    <link rel="stylesheet" href="../cropper-master/dist/cropper.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/editBasic.css" type="text/css">
</head>
<body>
    <div class="editBasicContainer">
        <div class="hiddenDiv">
            <!-- 行业 -->
            <div class="industryDiv">
                <div class="industry_up">
                    <label class="industry_title">请选择行业类别</label>
                    <span class="glyphicon glyphicon-remove" id="closeIndustry" onclick="closeIndustryDiv()"></span>
                </div>
                <div class="industry_down">
                </div>
            </div>
        </div>
        <input type="text" value="${page}" id="ebPage" hidden/>
        <input type="text" value="${operator}" id="ebOperator" hidden/>
        <input type="text" value="${myId}" id="ebId" hidden/>
        <div class="fullNameDiv">
           <label id="fullName">公司全称：浙江创邻科技有限公司</label>
        </div>
        <div class="compInforDiv">
            <div class="editCompLogo">
                <label>修改公司LOGO</label></br>
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
            <div class="editCompInfor">
                <div class="compItem">
                    <label>公司简称：</label>
                    <input type="text" id="shortNameInput">
                </div>
                <div class="compItem">
                    <label>公司行业：</label>
                    <input type="text" id="industryInput">
                    <input type="text" id="industryIdInput" hidden/>
                </div>
                <div class="compItem">
                    <label>公司规模：</label>
                    <select id="selectCompScope" onchange="choseScope()">
                        <option value="0-20人">0-20人</option>
                        <option value="20-99人">20-99人</option>
                        <option value="100-499人">100-499人</option>
                        <option value="500-999人">500-999人</option>
                        <option value="1000-9999人">1000-9999人</option>
                        <option value="10000人以上">10000人以上</option>
                    </select>
                    <input type="text" id="scopeInput" hidden/>
                </div>
                <div class="compItem">
                    <label>融资阶段：</label>
                    <select id="selectCompStage" onchange="choseStage()">
                        <option value="未融资">未融资</option>
                        <option value="天使轮">天使轮</option>
                        <option value="A轮">A轮</option>
                        <option value="B轮">B轮</option>
                        <option value="C轮">C轮</option>
                        <option value="D轮及以上">D轮及以上</option>
                        <option value="已上市">已上市</option>
                        <option value="不需要融资">不需要融资</option>
                    </select>
                    <input type="text" id="stageInput" hidden/>
                </div>
                <div class="compItem">
                    <label>公司官网：</label>
                    <input type="text" id="websiteInput">
                </div>
                <div class="compIntro">
                    <label>公司简介：</label>
                    <textarea id="introductInput">

                    </textarea>
                </div>
                <div class="opDiv">
                    <button class="btn btn-default" type="button" id="cancel" onclick="clearCompInfor()">清 空</button>
                    <button class="btn btn-default" type="button" id="subCompInfor">完 成</button>
                </div>
            </div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../cropper-master/dist/cropper.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/editBasic.js" type="text/javascript"></script>
</body>
</html>
