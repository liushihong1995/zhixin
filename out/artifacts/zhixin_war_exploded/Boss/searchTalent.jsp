<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/4/26
  Time: 15:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 人才招聘</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/header_two.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/searchTalent.css" type="text/css">
</head>
<body>
    <!-- 招聘界面头部 -->
    <div class="searchTalentHeader">
        <jsp:include page="header_two.jsp"></jsp:include>
    </div>
    <div class="searchTalentContainer">
        <div class="searchTalentUp">
            <jsp:include page="searchBox.jsp"></jsp:include>
        </div>
        <div class="searchTalentDown">
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
                    <option value="3-5K">3-5K</option>
                    <option value="5-10K">5-10K</option>
                    <option value="10-15K">10-15K</option>
                    <option value="15-20K">15-20K</option>
                    <option value="20-30K">20-30K</option>
                    <option value="30-50K">30-50K</option>
                    <option value="50K以上">50K以上</option>
                    <input type="text" id="salaryInput" hidden/>
                </select>
                <select id="statusSelect">
                    <option value="" disabled selected hidden>求职状态</option>
                    <option value="离职-随时到岗">离职-随时到岗</option>
                    <option value="在职-考虑机会">在职-考虑机会</option>
                    <option value="在职-月内到岗">在职-月内到岗</option>
                    <input type="text" id="statusInput" hidden/>
                </select>
                <label id="clearCondition" onclick="clearCondition()">清空筛选条件</label>
            </div>
        </div>
    </div>
    <div class="showResultContainer">
        <div class="blank"></div>
        <div class="resultListContainer">
            <div class="seekerList">
                </br></br>
                <div class="seekerItem">
                    <div class="basicInfor">
                        <img class="img-circle" src="../images/icon_face.jpg" width="45px" height="48px">
                        <label class="seekerName" style="margin-left: 10px; margin-right: 5px">温姑娘</label> |
                        <label class="seekerEdu" style="margin-left: 5px;margin-right: 5px">本科</label> |
                        <label class="seekerExp" style="margin-left: 5px">应届生</label>
                    </div>
                    <div class="hopeInfor">
                        <label class="hopeCate">Java</label> |
                        <label class="hopeSaraly">3K-5K</label> |
                        <label class="hopeIndustry">计算机软件</label> |
                        <label class="hopeCity">杭州市</label>
                    </div>
                    <div class="resumeInfor">
                        <a href="#" class="lookResume">查看简历</a>
                    </div>
                </div>
            </div>
            <div class="seekerPage">
                <input type="text" id="currentPage" hidden/>
                <input type="text" id="totalPage" hidden/>
                <div class="page">
                </div>
            </div>
        </div>

    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/header_two.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/searchTalent.js" type="text/javascript"></script>
</body>
</html>
