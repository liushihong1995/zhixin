<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2019/1/11
  Time: 19:09
  浏览简历
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 简历预览</title>
    <link rel="stylesheet" href="../bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" type="text/css">
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/header_three.css" type="text/css">
    <link rel="stylesheet" href="../CSS/SeekerCss/brower_resume.css" type="text/css">

</head>
<body>
<!-- Start:存放简历的容器-->
<div class="resume_container">
    <!-- Start:存放简历内容 -->
    <div class="resume_content" id="resumeContent">
        <!-- 显示更新事件和预览简历 -->
        <div class="update_and_brower">
        </div>
        <!-- Start:显示基本信息-->
        <div class="show_base_infor">
            <div class="show_base_infor_left">
                <label id="user_name">${seeker.sname}</label>
                <c:choose>
                    <c:when test="${seeker.sex=='true'}">
                        <img id="user_sex" src="../images/male.png" class="img-circle" width="35px" height="35px">
                    </c:when>
                    <c:otherwise>
                        <img id="user_sex" src="../images/female.png" class="img-circle" width="35px" height="35px">
                    </c:otherwise>
                </c:choose>
                </br>
                <label id="user_beginWorkTime">出生年月：${seeker.birth}</label>
                <label id="user_education">最高学历：${seeker.education}</label>
                <label id="user_status">求职状态：${seeker.status}</label></br>
                <label id="user_phone">工作经验：${seeker.workExp}</label>
                <label id="user_email">常用邮箱：${seeker.email}</label>
            </div>
            <div class="show_base_infor_right">
                <img id="user_photo" src="/seekerPic/${seeker.psrc}" class="img-circle" width="100px" height="100px">
            </div>
        </div>
        <!--End: 显示基本信息-->
        <!-- Start:展示个人优势-->
        <div class="show_user_advantange">
            <label class="mySign"></label><label id="advantage_label" class="show_title_label">个人优势</label></br>
            <div class="advantange_content">
                <div id="show_advange_content">
                   ${seeker.advantage}
                </div>
            </div>
            <div class="blank"></div>
        </div>
        <!-- Start:展示期望职位-->
        <div class="show_hope_job">
            <label class="mySign"></label><label id="show_hope_job_label" class="show_title_label">期望职位</label></br>
            <c:forEach var="item" items="${hopes}">
                <div class="hope_job_item">
                    <label class="hopeColumn">${item.category}</label>
                    <label class="hopeColumn">${item.salary}</label>
                    <label class="hopeColumn">${item.industry}</label>
                    <label class="hopeColumn">${item.city}</label>
                </div>
            </c:forEach>
            <div class="blank"></div>
        </div>
        <!-- End:展示期望职位 -->

        <!-- Start:展示实习经历-->
        <div class="show_practice_experience">
            <label class="mySign"></label><label id="show_practice_experience_label" class="show_title_label">实习经历</label>
            <c:forEach var="item" items="${practices}">
                <div class="pe_item">
                    <label>${item.comp}</label><label>${item.start}至${item.end}</label></br>
                    <label>${item.depart}</label><label>${item.job}</label></br>
                    <label>工作内容</label></br>
                    <div class="show_practice_content">${item.content}</div>
                    <label>工作成绩</label></br>
                    <div class="show_practice_achieve">${item.achieve}</div>
                    <div class="blank"></div>
                </div>
            </c:forEach>
        </div>
        <!-- End:展示实习经历-->
        <!-- Start：显示项目经历 -->
        <div class="show_project">
            <label class="mySign"></label><label class="show_title_label">项目经历</label>
            <c:forEach var="item" items="${projects}">
                <div class="project_item">
                    <label>${item.name}</label><label>${item.start}至${item.end}</label></br>
                    <label>${item.role}</label></br>
                    <label>项目描述</label></br>
                    <div class="project_content">
                       ${item.content}
                    </div>
                    <label>项目业绩</label>
                    <div class="project_achieve">
                        ${item.achieve}
                    </div>
                    <div class="blank"></div>
                </div>
            </c:forEach>
        </div>
        <!-- End: 显示项目经历 -->
        <!-- Start:显示教育经历-->
        <div class="show_edu_exp">
            <label class="mySign"></label><label id="show_edu_exp_label" class="show_title_label">教育经历</label>
            <c:forEach var="item" items="${educations}">
                <div class="edu_item">
                    <label>${item.school}</label>
                    <label>${item.start}-${item.end}</label>
                    <label>${item.major}</label>
                    <label>${item.level}</label>
                </div>
            </c:forEach>
            <div class="blank"></div>
        </div>
        <!-- End:显示教育经历 -->
        <!-- Start:显示社交主页 -->
        <div class="show_social">
            <label class="mySign"></label><label id="show_social_label" class="show_title_label">社交主页</label>
            <c:forEach var="item" items="${socials}">
                <div class="social_item">
                    <label>${item.url}</label>
                </div>
            </c:forEach>
            <div class="blank"></div>
        </div>
        <!-- End:显示社交主页结束 -->
        <div style="clear:both;"></div>
    </div><!-- 存放简历内容 -->
    <div style="clear:both;"></div>
    <div class="downloadDiv"></div>
    <div class="downloadDiv">
        <button type="button" class="btn btn-default" id="downloadResume" onclick="downloadResume()">下 载</button>
    </div>
    <div class="downloadDiv"></div>
</div><!-- End: 存放简历的容器 -->
<script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js" type="text/javascript"></script>
<script src="https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.js" type="text/javascript"></script>
<script src="../JS/CommonJs/header_one.js" type="text/javascript"></script>
<script src="../JS/SeekerJs/brower_resume.js" type="text/javascript"></script>
</body>
</html>
