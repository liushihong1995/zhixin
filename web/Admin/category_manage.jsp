<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2019/1/8
  Time: 11:14
  职类管理
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 职类管理</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/AdminCss/category_manage.css" type="text/css">
</head>
<body>
    <div class="category_manage_div">
        <div class="first_manage">
            <label id="first_class_label">一级分类列表 :</label>
            <select id="select_first_class" onchange="selectFirstClassChange()">
            </select>
            <label id="first_name_label">
                当前一级分类：
            </label>
            <input type="text" disabled="false" id="first_class_name">
            <label id="first_input_label">一级分类全称 ：</label>
            <input type="text" placeholder="请输入分类全称" id="first_input">
            <label id="simple_input_label">一级分类简称 : </label>&nbsp&nbsp
            <input type="text" placeholder="请输入分类简称" id="simple_input">
            <button type="button" class="btn btn-default" id="add_first" onclick="addFirst()">添加一级分类</button>
            <button type="button" class="btn btn-default" id="first_update" onclick="modifyFirst()">修改一级分类</button>
            <button type="button" class="btn btn-default" id="first_delete" onclick="deleteFirst()">删除一级分类</button>
        </div>
        <div class="second_manage">
            <label id="second_frist_class_label">一级分类列表 :</label>
            <select id="select_second_first_class" onchange="selectSecondFirstClassChange()">
            </select>
            <label id="second_class_label">二级分类列表 :</label>
            <select id="select_second_class" onchange="selectSecondClassChange()">
            </select></br>
            <label id="second_input_label">二级分类名称 : </label>
            <input type="text" id="second_input">
            <button type="button" class="btn btn-default" id="add_second" onclick="addSecond()">添加二级分类</button>
            <button type="button" class="btn btn-default" id="second_update" onclick="modifySecond()">修改二级分类</button>
            <button type="button" class="btn btn-default" id="second_delete" onclick="deleteSecond()">删除二级分类</button>
        </div>
        <div class="third_manage">
            <label id="third_frist_class_label">一级分类列表 :</label>
            <select id="select_third_first_class" onchange="selectThirdFirstClassChange()">
            </select>
            <label id="third_second_class_label">二级分类列表 :</label>
            <select id="select_third_second_class" onchange="selectThirdSecondClassChange()">
            </select></br>
            <label id="third_class_label">三级分类列表 :</label>
            <select id="select_third_class">
            </select>
            <label id="third_input_label">三级分类名称 : </label>
            <input type="text" id="third_input">
            <button type="button" class="btn btn-default" id="add_third" onclick="addThird()">添加三级分类</button>
            <button type="button" class="btn btn-default" id="third_update" onclick="modifyThird()">修改三级分类</button>
            <button type="button" class="btn btn-default" id="third_delete" onclick="deleteThird()">删除三级分类</button>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../JS/AdminJs/category_manage.js" type="text/javascript"></script>
</body>
</html>
