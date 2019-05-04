<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/4
  Time: 19:55
  行业管理
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘|行业管理</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/AdminCss/industry_manage.css" type="text/css">
</head>
<body>
    <div id="hidden_div">
        <div id="hidden_div_container">
            <div id="hidden_div_first">
                <label id="first_class_name">
                    IT互联网
                </label>
                <span class="glyphicon glyphicon-edit" id="edit" onclick="modifyFirstClass()"></span>
                <span class="glyphicon glyphicon-trash" id="trash" onclick="deleteFirstClass()"></span>
                <span class="glyphicon glyphicon-remove" id="close" onclick="closeHiddenDiv()"></span>
            </div>
            <div id="hidden_div_second">
                <div id="second_class">
                    <!--
                    <label class="second_name">电子商务</label>
                    <label class="second_name">游戏</label>
                    <label class="second_name">媒体</label>
                    <label class="second_name">广告营销</label>
                    <label class="second_name">数据服务</label>
                    <label class="second_name">医疗健康</label>
                    <label class="second_name">生活服务</label>
                    <label class="second_name">➕</label>
                    -->
                </div>
                <div id="edit_second_class">
                    <label id="second_class_name">电子商务</label>
                    <input type="text" id="type" hidden/>
                    <input type="text" placeholder="请填写二级分类新名称" id="newName">
                    <button type="button" class="btn btn-default" id="updateBtn" onclick="modifyClass()">修 改</button>
                    <button type="button" class="btn btn-default" id="deleteBtn" onclick="deleteClass()">删 除</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 行业管理-->
    <div class="industry_manage_container">
        <div class="industry_manage_div" id="industry_manage_div">
            <!--
            <div class="first_class">
                <label class="first_name">互联网/IT/电子/通讯</label>
            </div>
            -->
        </div>
    </div>
    <script type="text/javascript" src="../bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../JS/AdminJs/industry_manage.js"></script>
</body>
</html>
