<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/2/17
  Time: 18:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 企业信息</title>
    <link rel="stylesheet" href="../bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" type="text/css">
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/header_one.css" type="text/css">
    <link rel="stylesheet" href="../CSS/SeekerCss/compDetail.css" type="text/css">
</head>
<body>
    <div class="compDetailHeader">
        <jsp:include page="../Common/header_one.jsp"></jsp:include>
    </div>
    <div class="compDetailMid">
        <input type="text" id="compId" value="${compId}" hidden/>
        <div class="compInforDiv">
            <div class="compInforLeft">
                <div class="compLogoDiv">
                    <img src="../images/icon_face.jpg" width="100px" height="100px" id="compLogo">
                </div>
                <div class="compInfor">
                    <label id="compShortName">阿里巴巴</label></br>
                    <label id="compStage">已上市</label>
                    <label id="compScope">10000人以上</label>
                    <label id="compIndustry">互联网</label>
                </div>
                <div class="chosePage">
                    <label id="showCompInfor" onclick="showCompInfor()">公司简介</label>
                    <label id="showRecruitJob" onclick="showRecruitJob()">招聘职位</label>
                </div>
            </div>
            <div class="compInforRight">
                <label id="jobNumber" onclick="showRecruitJob()">23</label><label id="bossNumber">28</label></br>
                <label id="jobNumberLabel">在招职位</label><label id="bossNumberLabel">位Boss</label>
            </div>
        </div>
    </div>
    <div class="compDetailDown">

    </div>
    <div style="clear:both;"></div>
    <div class="blank" style="width: 100%; height: 100px;"></div>
    <div class="compDetailFooter">
        <jsp:include page="../Common/footer_one.jsp"></jsp:include>
    </div>
    <script type="text/javascript" src="../JQuery/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="../bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../JS/CommonJs/header_one.js"></script>
    <script type="text/javascript" src="../JS/SeekerJs/homePage.js"></script>
    <script type="text/javascript" src="../JS/SeekerJs/compDetail.js"></script>
</body>
</html>
