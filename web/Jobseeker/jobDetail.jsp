<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2019/2/17
  Time: 15:28
  该界面用来显示职位详情。
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 职位详情</title>
    <link rel="stylesheet" href="../bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" type="text/css">
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/header_one.css" type="text/css">
    <link rel="stylesheet" href="../CSS/SeekerCss/jobDetail.css" type="text/css">
</head>
<body>
    <div class="jobDetailHeader">
        <jsp:include page="../Common/header_one.jsp"></jsp:include>
        <script type="text/javascript" src="../JS/CommonJs/header_one.js"></script>
    </div>
    <div class="jobDetailUp">
        <div class="jobInforDiv">
            <label id="jobName">${job.name}</label><label id="jobSalary">${job.salary}/月</label></br>
            <label id="jobCity">${job.city}</label><label id="jobExp">${job.exp}</label><label id="jobEdu">${job.edu}</label>
        </div>
    </div>
    <div class="jobDetailMid">
        <div class="jobDetailMidContent">
        <div class="jobDetailMidLeft">
            <div class="bossInfor">
                <div class="bossPhoto">
                    <img class="img-circle" src="/bossPic/${boss.psrc}" width="50px" height="50px">
                </div>
                <div class="bossNameDiv">
                    <label id="bossName">${boss.nickName}</label></br>
                    <label id="bossJob">${boss.job}</label>
                </div>
                <!-- 简历投递说明 -->
                <div class="sendCvHint">
                    对该职位有意者，可以发送邮件到${boss.email}邮箱,邮件中至少需要包含想要应聘的职位名称和个人的简历。
                </div>
            </div>
            <div class="jobDescriptionDiv">
                <div class="title"><label>职位描述</label></div></br></br>
                <div class="description">
                    ${job.detail}
                </div>
            </div>
            <div class="bussinessInfor">
                <div class="title"><label>工商信息</label></div></br></br>
                <div class="bussiness">
                    <label id="compFullName">${comp.fullName}</label></br>
                    <label>法人代表：</label><label>${buss.corporate}</label>
                    <label class="compLabel">注册资金：</label><label>${buss.registerMoney}</label>
                    <label class="compLabel">成立时间：</label><label>${buss.time}</label></br>
                    <label>企业类型：</label><label>${buss.type}</label>
                    <label class="compLabel">经营状态：</label><label>${buss.status}</label>
                    <label class="compLabel"><a href="http://localhost:8080/zhixin/jobs/compDetail.action?id=${comp.id}">查看全部</a></label>
                </div>
            </div>
            <div class="bussinessInfor">
                <div class="title"><label>工作地址</label></div></br></br>
                <span class="glyphicon glyphicon-map-marker"></span> <label style="font-weight: lighter">${job.city}${job.zone}${job.address}</label>
            </div>
        </div>
        <div class="jobDetailMidRight">
            <div class="compInfor">
                <div class="rightTitle"><label>公司基本信息</label></div>
                <div class="baseInfor">
                    <a id="compName" href="http://localhost:8080/zhixin/jobs/compDetail.action?id=${comp.id}">${comp.fullName}</a></br>
                    <label>发展阶段：</label><label>${comp.stage}</label></br>
                    <label>公司规模：</label><label>${comp.scope}</label></br>
                    <label>所属行业：</label><label>${comp.industry}</label></br>
                    <label>公司官网：</label><label>${comp.website}</label></br>
                </div>
            </div>
            <div class="compIntroduce">
                <div class="rightTitle"><label>公司简介</label></div>
                <div class="introduce">
                    ${comp.summary}
                </div>
            </div>
        </div>
        </div>
    </div>

    <div style="clear:both;"></div>
    <div class="blank" style="width: 100%; height: 100px;"></div>
    <div class="jobDetailFooter">
        <jsp:include page="../Common/footer_one.jsp"></jsp:include>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/header_one.js" type="text/javascript"></script>
</body>
</html>
