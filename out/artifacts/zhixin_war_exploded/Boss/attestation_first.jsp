<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/21
  Time: 21:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 实名认证</title>
    <link rel="stylesheet" href="../CSS/BossCss/attestation_first.css" type="text/css">
</head>
<body>
    <div class="attestation_first">
        <input type="text" id="bossIdInput" value="${Boss.id}" hidden/>
        <div class="blank"></div>
        <!--- 认账步骤 -->
        <div class="attestation_step">
            <div class="step_item">
                <div class="order_item">
                    <div class="order">
                        <label>1</label>
                    </div>
                    <div class="item_title">
                        <label>完善基本信息</label>
                    </div>
                </div>
            </div>
            <div class="step_line">
                <div class="step_line_up">
                </div>
                <div class="step_line_down">
                </div>
            </div>
            <div class="step_item">
                <div class="order_item">
                    <div class="order">
                        <label>2</label>
                    </div>
                    <div class="item_title">
                        <label>上传个人证件</label>
                    </div>
                </div>
            </div>
            <div class="step_line">
                <div class="step_line_up">
                </div>
                <div class="step_line_down">
                </div>
            </div>
            <div class="step_item">
                <div class="order_item">
                    <div class="order">
                        <label>3</label>
                    </div>
                    <div class="item_title">
                        <label>耐心等待审核</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="attestation_content">
            <p>1.如何进行实名认证?</p>
            <p> 根据上图步骤进行个人认证，首先完善招聘者的基本个人信息，然后上传个人证件照（身份证正面，背面，手持身份证照），然后耐心等待本平台管理员审核，审核将在一个工作日内完成，审核结果将以短信方式通知各位招聘者。</p>
            <p>2.为何要实名认证?</p>
            <p> 为了保证求职者的安全，需要招聘者完成实名认证，本平台严禁以任何形式发布虚假招聘信息进行违法犯罪活动， 招聘者必须进行实名认证，否则无法享受本平台所提供的服务，招聘者如果利用本平台进行违法犯罪活动，必将承担相应法律责任。</p>
            <p>3.我的信息是否会泄露?</p>
            <p> 请各位招聘者放心认证，您所认证的个人信息仅仅用于求职过程中的违法犯罪活动的追责，本平台将会妥善保管用户信息，防止用户隐私信息泄露。</p>
        </div>
        <div class="begin_attestation">
        </div>
    </div>
    <script type="text/javascript" src="../JS/BossJs/attestation_first.js"></script>
</body>
</html>
