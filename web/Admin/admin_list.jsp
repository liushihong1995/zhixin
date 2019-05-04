<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/11/29
  Time: 10:56
  该界面显示管理员列表
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 销毁管理员账号</title>
    <meta name="applicable-device" content="pc">
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="../CSS/AdminCss/admin_list.css">
</head>
<body>
    <div class="hiddenDiv" id="brower_info_div">
        <div class="close" id="closeBtn">
        </div>
        <div class="showInfor" id="infor">
        </div>
    </div> <!-- 弹出信息部分结束 -->
    <div class="admin_list_container">
        <div class="admin_list_title">
            <span class="glyphicon glyphicon-th-list">&nbsp<b>管理员列表</b></span>
            <label id="recordNum"></label>
        </div>
        <div class="tableHeader">
            <label class="adminId headerLabel">账 &nbsp号</label>
            <label class="adminName headerLabel">姓 &nbsp名</label>
            <label class="adminDepart headerLabel">部 &nbsp门</label>
            <label class="brower headerLabel">浏 &nbsp览</label>
            <label class="delete headerLabel">删 &nbsp除</label>
        </div>
        <div class="blank"></div>
        <div class="adminlist" id="list">
        </div>
        <div class="admin_list_pagination">
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true" onclick="getPrevious()">&laquo;</span>
                        </a>
                    </li>
                    <li><a href="#" id="currentPage">1</a></li>
                    <li>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true" onclick="getNext()">&raquo;</span>
                        </a>
                    </li>
                    <li><a href="#" id="totalPage">共5页</a></li>
                </ul>
            </nav>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../JS/AdminJs/admin_list.js" type="text/javascript"></script>
</body>
</html>
