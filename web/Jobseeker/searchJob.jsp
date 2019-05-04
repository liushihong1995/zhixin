<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2019/2/14
  Time: 15:56
  职位检索界面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 求职</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/header_one.css" type="text/css">
    <link rel="stylesheet" href="../CSS/SeekerCss/searchJob.css" type="text/css">
</head>
<body>
    <div class="searchJobHeader">
        <jsp:include page="../Common/header_one.jsp"></jsp:include>
    </div>
    <div class="searchJobContainer">
        <div class="searchJobUp">
            <jsp:include page="searchBox.jsp"></jsp:include>
        </div>
        <div class="searchJobMid">
            <div class="cityDiv">
                <div class="address">
                    <label>期望城市：</label>
                    <label id="city">全国</label>
                    <label id="zone"></label>
                </div>
                <div class="hotCity">
                    <label>热门城市：</label>
                    <label class="hotCityName" onclick="changeCity('北京市')">北京市</label><label class="hotCityName" onclick="changeCity('上海市')">上海市</label><label class="hotCityName" onclick="changeCity('天津市')">天津市</label>
                    <label class="hotCityName" onclick="changeCity('重庆市')">重庆市</label><label class="hotCityName" onclick="changeCity('杭州市')">杭州市</label><label class="hotCityName" onclick="changeCity('成都市')">成都市</label>
                    <label class="hotCityName" onclick="changeCity('郑州市')">郑州市</label><label class="hotCityName" onclick="changeCity('南京市')">南京市</label><label class="hotCityName" onclick="changeCity('武汉市')">武汉市</label>
                    <label class="hotCityName" onclick="changeCity('西安市')">西安市</label><label class="hotCityName" onclick="changeCity('苏州市')">苏州市</label><label class="hotCityName" onclick="changeCity('长沙市')">长沙市</label>
                    <label class="hotCityName" onclick="changeCity('厦门市')">厦门市</label><label class="hotCityName" onclick="changeCity('深圳市')">深圳市</label><label class="hotCityName" onclick="changeCity('广州市')">广州市</label>
                </div>
            </div>
            <div class="zoneDiv">
                <label>二级地址：</label>
            </div>
            <!-- Start:筛选条件 -->
            <div class="conditionDiv">
                <label>筛选条件:</label>
                <select id="wordExpSelect">
                    <option value="" disabled selected hidden>工作经验</option>
                    <option value="不限">不限</option>
                    <option value="应届生">应届生</option>
                    <option value="1年以内">1年以内</option>
                    <option value="1-3年">1-3年</option>
                    <option value="3-5年">3-5年</option>
                    <option value="5-10年">5-10年</option>
                    <option value="10年以上">10年以上</option>
                    <input type="text" id="expInput" hidden/>
                </select>
                <select id="eduSelect">
                    <option value="" disabled selected hidden>学历要求</option>
                    <option value="不限">不限</option>
                    <option value="高中及以下">高中及以下</option>
                    <option value="专科">专科</option>
                    <option value="本科">本科</option>
                    <option value="硕士">硕士</option>
                    <option value="博士">博士</option>
                    <input type="text" id="eduInput" hidden/>
                </select>
                <select id="salarySelect">
                    <option value="" disabled selected hidden>薪资要求</option>
                    <option value="不限">不限</option>
                    <option value="3K以下">3K以下</option>
                    <option value="3K-5K">3K-5K</option>
                    <option value="5K-10K">5K-10K</option>
                    <option value="10K-15K">10K-15K</option>
                    <option value="15K-20K">15K-20K</option>
                    <option value="20K-30K">20K-30K</option>
                    <option value="30K-50K">30K-50K</option>
                    <option value="50K以上">50K以上</option>
                    <input type="text" id="salaryInput" hidden/>
                </select>
                <select id="stageSelect">
                    <option value="" disabled selected hidden>公司阶段</option>
                    <option value="不限">不限</option>
                    <option value="未融资">未融资</option>
                    <option value="天使轮">天使轮</option>
                    <option value="A轮">A轮</option>
                    <option value="B轮">B轮</option>
                    <option value="C轮">C轮</option>
                    <option value="D轮及以上">D轮及以上</option>
                    <option value="已上市">已上市</option>
                    <option value="不需要融资">不需要融资</option>
                    <input type="text" id="stageInput" hidden/>
                </select>
                <select id="scopeSelect">
                    <option value="" disabled selected hidden>公司规模</option>
                    <option value="不限">不限</option>
                    <option value="0-20人">0-20人</option>
                    <option value="20-99人">20-99人</option>
                    <option value="100-499人">100-499人</option>
                    <option value="500-999人">500-999人</option>
                    <option value="1000-9999人">1000-9999人</option>
                    <option value="10000人以上">10000人以上</option>
                    <input type="text" id="scopeInput" hidden/>
                </select>
                <label id="clearCondition" onclick="clearCondition()">清空筛选条件</label>
            </div>
            <!-- End:筛选条件-->
        </div>
    </div>
    <div class="searchJobContainerDown">
        <div class="blank"></div>
        <div class="searchJobDown">
            <div class="jobList">
                </br></br>
                <!--
                <div class="jobItem">
                    <div class="jobInfor">
                        <div class="jobInforUp">
                            <a href="#" class="jobNameLabel">Java开发实习生</a>
                            <label class="salaryLabel" style="color: red">3K-5K</label>
                        </div>
                        <div class="jobInforDown">
                            <label class="cityLabel">杭州</label>
                            <label class="zoneLabel">西湖区</label>
                            <label> | </label>
                            <label class="expLabel">经验不限</label>
                            <label> | </label>
                            <label class="eduLabel">本科</label>
                        </div>
                    </div>
                    <div class="compInfor">
                        <div class="compInforUp">
                            <a href="#" class="compShort">滴滴出行</a>
                        </div>
                        <div class="compInforDown">
                            <label class="industryLabel">移动互联网</label> <label> | </label>
                            <label class="stageLabel">D轮及以上</label> <label> | </label>
                            <label class="scopeLabel">100-499人</label>
                        </div>
                    </div>
                    <div class="bossInfor">
                        <div class="bossInforUp">
                            <img onclick="bossPhoto" class="img-circle" width="20px" height="20px" src="../images/icon_face.jpg">
                            <label class="nickLabel">张女士</label> <label> | </label>
                            <label class="jobLabel">招聘专员</label>
                        </div>
                        <div class="bossInforDown">
                            <label class="timeLabel">发布于2019-12-12 19:08:01</label>
                        </div>
                    </div>
                </div>
                -->
            </div>
            <div class="jobPage">
                <input type="text" id="currentPage" hidden/>
                <input type="text" id="totalPage" hidden/>
                <div class="page">
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="../JQuery/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="../bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="../JS/CommonJs/header_one.js" type="text/javascript"></script>
    <script src="../JS/SeekerJs/searchJob.js" type="text/javascript"></script>
</body>
</html>
