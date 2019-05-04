<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2019/1/24
  Time: 13:12
  招聘者职位管理
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 职位管理</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/manageJob.css" type="text/css">
    <link rel="stylesheet" href="../CSS/BossCss/header_two.css" type="text/css">
</head>
<body>
    <div class="manageJobHeader">
        <jsp:include page="../Boss/header_two.jsp"></jsp:include>
    </div>
    <div class="manageJobUp">
        <input type="text" id="bossIdInput" value="${uid}" hidden/>
        <div class="manageJobUpContent">
            <div class="boss_infor">
                <div class="boss_infor_left">
                    <img src="../images/icon_face.jpg" alt="招聘者头像" id="bossPhoto" width="100px" height="100px">
                </div>
                <div class="boss_infor_right">
                    <label id="bossName"></label>
                    <label id="bossJob"></label>
                    <label id="bossEmail"></label>
                </div>
            </div>
            <div class="comp_infor">
                <div class="comp_infor_left">
                    <label id="compShort"></label>
                    <label id="compStage"></label><label id="compScope"></label><label id="compIndustry"></label>
                    </br>
                    <label id="compWeb"></label>
                </div>
                <div class="comp_infor_right">
                    <img src="../images/icon_face.jpg" alt="公司logo" width="100px" height="100px" id="compLogo">
                </div>
            </div>
        </div>
    </div>
    <div class="manageJobMid">
        <div class="manageJobContent">
            <div class="content_up">
                <span class="glyphicon glyphicon-stop"></span>
                <label id="jobListLabel">职位列表</label>
                <button class="btn btn-default" id="editJob" type="button" onclick="addJob()"><span class="glyphicon glyphicon-plus"></span> 添加职位</button>
            </div>
            <div class="content_mid">
                <div class="jobListContainer">
                    <div class="jobList">
                        <table id="list">
                            <!--
                            <tr>
                                <th class="jobId">职位编号</th>
                                <th class="jobName">职位名称</th>
                                <th class="jobType">职位类型</th>
                                <th class="jobEdu">学历要求</th>
                                <th class="jobSalary">薪资范围</th>
                                <th class="jobExp">工作经验</th>
                                <th class="jobOp">编辑 | 删除</th>
                            </tr>  <tr>
                            <td class="jobId">1</td>
                            <td class="jobName">Java开发实习生</td>
                            <td class="jobType">Java</td>
                            <td class="jobEdu">本科</td>
                            <td class="jobSalary">3K-5K</td>
                            <td class="jobExp">3年-5年</td>
                            <td class="jobOp"><span class="glyphicon glyphicon-edit"></span> | <span class="glyphicon glyphicon-trash"></span></td>
                        </tr>
                            -->
                        </table>
                    </div>
                    <input type="text" id="currentPage" hidden/>
                    <input type="text" id="totalPage" hidden/>
                    <div class="page">
                    </div>
                </div>
                <div class="hiddenDiv">
                    <!-- 职类-->
                    <div class="categoryDiv">
                        <div class="industry_up">
                            <label class="industry_title">请选择职位类型</label>
                            <span class="glyphicon glyphicon-remove" id="closeCategory" onclick="closeCateDiv()"></span>
                        </div>
                        <div class="category_down">
                            <div class="cate_first_list">
                            </div>
                            <div class="cate_second">
                                <div class="cate_second_header">
                                </div>
                                <div class="cate_second_list"></div>
                            </div>
                            <div class="cate_third">
                                <div class="cate_third_header">
                                    <label id="third_header" style="width: 440px"></label>
                                    <label id="return_second" style="width: 50px" onclick="goForward()">返回</label>
                                </div>
                                <div class="cate_third_list"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="edit_job">
                    <input type="text" id="opName" hidden/>
                    <input type="text" id="jobIdInput" hidden/>
                    <div class="infor_item">
                        <label>职位类型</label></br>
                        <input id="jobTypeInput" type="text"/>
                        <input id="jobTypeId" type="text" hidden/>
                    </div>
                    <div class="infor_item">
                        <label>职位名称:</label></br>
                        <input id="jobNameInput" type="text" placeholder="例如：Java开发实习生">
                    </div>
                    <div class="infor_item">
                        <label>学历要求:</label></br>
                        <select id="jobEduSelect" onchange="getEdu()">
                            <option value="不限" selected>不限</option>
                            <option value="高中及以下">高中及以下</option>
                            <option value="专科">专科</option>
                            <option value="本科">本科</option>
                            <option value="硕士">硕士</option>
                            <option value="博士">博士</option>
                        </select>
                        <input type="text" id="jobEduInput" hidden/>
                    </div>
                    <div class="infor_item">
                        <label>工作经验</label></br>
                        <select id="jobExpSelect" onchange="getExp()">
                            <option value="不限" selected>不限</option>
                            <option value="应届生">应届生</option>
                            <option value="1年以内">1年以内</option>
                            <option value="1-3年">1-3年</option>
                            <option value="3-5年">3-5年</option>
                            <option value="5-10年">5-10年</option>
                            <option value="10年以上">10年以上</option>
                        </select>
                        <input type="text" id="jobExpInput" hidden/>
                    </div>
                    <div class="infor_item">
                        <label>薪资范围</label></br>
                        <select id="salaryRange" onchange="getSalary()">
                            <option value="不限" selected>不限</option>
                            <option value="3K以下">3K以下</option>
                            <option value="3K-5K">3K-5K</option>
                            <option value="5K-10K">5K-10K</option>
                            <option value="10K-15K">10K-15K</option>
                            <option value="15K-20K">15K-20K</option>
                            <option value="20K-30K">20K-30K</option>
                            <option value="30K-50K">30K-50K</option>
                            <option value="50K以上">50K以上</option>
                        </select>
                        <input type="text" id="jobSalaryInput" hidden/>
                    </div>
                    <div class="workCity">
                        <div class="city">
                            <label>工作城市</label></br>
                            <input id="jobCityInput" type="text"/>
                            <div class="cityList">
                            </div>
                        </div>
                        <div class="zone">
                            </br>
                            <select id="zoneSelect" onchange="choseZone()">
                            </select>
                            <input id="jobZoneInput" type="text" hidden/>
                        </div>
                    </div>
                    <div class="wordAddress">
                        <label>详细地址</label></br>
                        <input id="jobAddress" type="text"/>
                    </div>
                    <div class="jobDetail">
                        <label>职位要求</label></br>
                        <textarea id="detailInput"></textarea>
                    </div>
                    <div class="opJobDiv">
                        <button type="button" class="btn btn-default" id="cancel" onclick="cancelAddJob()">取消</button>
                        <button type="button" class="btn btn-default" id="createJob" onclick="updateJob()">完成</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/BossJs/manageJob.js" type="text/javascript"></script>
</body>
</html>
