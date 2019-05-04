<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/2/23
  Time: 20:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>知心招聘 | 公司简介</title>
    <link rel="stylesheet" href="../CSS/SeekerCss/bussinessDetail.css" type="text/css">
    <link rel="stylesheet" href="../swiper-4.4.6/dist/css/swiper.min.css" type="text/css">
</head>
<body>
    <div class="compHotJobDiv">
        <div class="compHotJob">
            <div class="compHotJobUp">
                <label id="hotJobLabel">热招职位</label>
                <label id="showAllJob" onclick="showRecruitJob()">查看所有再招职位</label>
            </div>
            <div class="compHotJobDown">
                <div class="hotJobItem">
                    <a class="jobName">Java开发实习生</a><label class="jobSalary">3K-5K/月</label></br>
                    <label class="jobExp">工作经验</label><label class="jobEdu">学历</label><label class="jobCity">工作城市</label>
                </div>
            </div>
        </div>
    </div>
    <div class="bussinessInforDiv">
        <div class="bussinessInfor">
            <div class="bussinessInforLeft">
                <div class="compSummary">
                    <div class="leftTitle"><label>公司简介</label></div>
                    <div class="summary"></div>
                </div>
                <div class="compProduct">
                    <div class="leftTitle"><label>产品简介</label></div>
                    <div class="productList"></div>
                    <div style="clear:both;"></div>
                </div>
                <div class="compBussiness">
                    <div class="leftTitle"><label>工商信息</label></div>
                    <div class="bussInfor">
                        <label id="compFullName"></label></br>
                        <label id="corporateLabel">法人代表：</label><label id="corporate"></label>
                        <label id="registerMoneyLabel">注册资本：</label><label id="registerMoney"></label></br>
                        <label id="publishTimeLabel">成立时间：</label><label id="publishTime"></label></br>
                        <label id="compTypeLabel">企业类型：</label><label id="compType"></label></br>
                        <label id="compStatusLabel">经营状态：</label><label id="compStatus"></label></br>
                        <label id="compAddressLabel">注册地址：</label><label id="compAddress"></label></br>
                        <label id="registerCodeLabel">统一信用代码：</label><label id="registerCode"></label></br>
                        <label id="describtionLabel">经营范围：</label></br><label id="describtion"></label>
                    </div>
                </div>
            </div>
            <div class="bussinessInforRight">
                <div class="seniorInforDiv">
                    <div class="rightTitle"><label>公司高管</label></div>

                    <div class="seniorInfor">
                        <div class="seniorInforUp">
                            <div class="swiper-container">
                                <div class="swiper-wrapper" id="senior">
                                    <div class="swiper-slide">
                                        <div class="seniorPhotoDiv">
                                            <img class="seniorPhoto img-circle" src="../images/icon_face.jpg" class="img-circle" width="50px" height="50px">
                                        </div>
                                        <div class="baseInforDiv">
                                            <label class="seniorName"></label></br>
                                            <label class="seniorJob"></label>
                                        </div>
                                        <div class="seniorIntroduce">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="compPhoto">
                        <div class="rightTitle"><label>公司环境</label></div></br>
                        <div class="swiper-container">
                            <div class="swiper-wrapper" id="compEnvi">
                                <div class="swiper-slide"><img src="../images/icon_face.jpg" width="250px" height="150px"></div>
                                <div class="swiper-slide"><img src="../images/icon_face.jpg" width="230px" height="120px"></div>
                                <div class="swiper-slide"><img src="../images/icon_face.jpg" width="230px" height="120px"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="../swiper-4.4.6/dist/js/swiper.min.js"></script>
    <script type="text/javascript" src="../JS/SeekerJs/bussinessDetail.js"></script>
</body>
</html>
