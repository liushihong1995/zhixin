<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/2/24
  Time: 20:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 热招职位</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/SeekerCss/jobInfor.css" type="text/css">
</head>
<body>
    <div class="jobInforContainer">
        <div class="jobInforDiv">
            <div class="jobTypeDiv">
            </div>
            <div class="jobList">
                <!--
                <div class="jobItem"></div>
                <div class="jobItem">
                    <a class="jobName" href="#">Java开发实习生</a>
                    <label class="jobSalary">3K-5K/月</label>
                    <label class="jobExp">经验 | 学历 | 行业</label>
                    <img src="../images/icon_face.jpg" width="25px" height="25px" class="img-circle bossPhoto">
                    <label class="bossNickName">boss昵称</label>
                    <label class="bossJob">boss职位</label>
                    <label class="bossTime">time</label>
                </div>
                -->
            </div>
            <div style="clear:both;"></div>
            <input type="text" id="jobType" hidden/>
            <input type="text" id="currentPage" hidden/>
            <input type="text" id="totalPage" hidden/>
            <div class="jobPage">
            </div>
        </div>
    </div>
    <script type="text/javascript" src="../bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../JS/SeekerJs/jobInfor.js"></script>
</body>
</html>
