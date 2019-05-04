<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2018/12/25
  Time: 16:38
  求职者的首页
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 招聘首页</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/header_two.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/homePage.css" type="text/css">
</head>
<body>
<!-- Start:头部开始 -->
<div class="seeker_homepage_up">
    <jsp:include page="../Boss/header_two.jsp"></jsp:include>
</div><!--  End:头部结束 -->

<!-- Start:中间部分-->
<div class="seeker_homepage_middle">
    <div class="seeker_homepage_middle_container">
        <div class="daohang_container">
            <jsp:include page="daohang.jsp"></jsp:include>
            <div class="extend_daohang">
                <label id="extend_btn" onclick="extendLi()">点击展开所有⬇</label>
            </div>
        </div>
        <div class="seeker_homepage_middle_right">
            <jsp:include page="homePageSearchBox.jsp"></jsp:include>
            <!-- Start:热门职位 -->
            <div class="hot_category">
                <a href="#">热门职位：</a>
                <a href="http://localhost:8080/zhixin/boss/searchTalentWithCondition.action?cateId=${828}&cateName=${Java}&industry=default&industryId=default&city=default">Java</a>
                <a href="http://localhost:8080/zhixin/boss/searchTalentWithCondition.action?cateId=${833}&cateName=${PHP}&industry=default&industryId=default&city=default">PHP</a>
                <a href="http://localhost:8080/zhixin/boss/searchTalentWithCondition.action?cateId=${834}&cateName=${Java}&industry=default&industryId=default&city=default">Python</a>
                <a href="http://localhost:8080/zhixin/boss/searchTalentWithCondition.action?cateId=${25}&cateName=${前端开发}&industry=default&industryId=default&city=default">web前端</a>
                <a href="http://localhost:8080/zhixin/boss/searchTalentWithCondition.action?cateId=${856}&cateName=${IOS}&industry=default&industryId=default&city=default">IOS</a>
                <a href="http://localhost:8080/zhixin/boss/searchTalentWithCondition.action?cateId=${852}&cateName=${Android}&industry=default&industryId=default&city=default">Android</a>
                <a href="http://localhost:8080/zhixin/boss/searchTalentWithCondition.action?cateId=${673}&cateName=${产品经理}&industry=default&industryId=default&city=default">产品经理</a>
                <a href="http://localhost:8080/zhixin/boss/searchTalentWithCondition.action?cateId=${309}&cateName=${UI设计师}&industry=default&industryId=default&city=default">UI设计师</a>
                <a href="http://localhost:8080/zhixin/boss/searchTalentWithCondition.action?cateId=${555}&cateName=${产品运营}&industry=default&industryId=default&city=default">产品运营</a>
            </div>
            <!-- End:热门职位-->
            <!-- Start:广告图片-->
            <div class="advert">
                <div class="advert_up">
                    <div class="advert_up_left">
                        <img src="../images/advOne.png" width="400px" height="200px">
                    </div>
                    <div class="adver_up_right">
                        <img src="../images/advThree.png" width="270px" height="200px">
                    </div>
                </div>
                <div class="advier_down">
                    <div class="advert_down_left">
                        <img src="../images/advTwo.png" width="400px" height="200px">
                    </div>
                    <div class="advert_down_right">
                        <img src="../images/advFour.png" width="270px" height="200px">
                    </div>
                </div>
            </div>
            <!-- End:广告图片 -->
        </div>
    </div>
</div> <!-- End:中间部分结束 -->
<div style="clear:both;"></div>
<!-- Start: 尾部 -->
<div class="boss_homepage_down">
    <jsp:include page="../Common/footer_one.jsp"></jsp:include>
</div><!-- End: 尾部-->
<script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../JS/CommonJs/daohang.js" type="text/javascript"></script>
<script src="../JS/SeekerJs/homePage.js" type="text/javascript"></script>
<script src="../JS/CommonJs/seeker_homepage.js" type="text/javascript"></script>
</body>
</html>
