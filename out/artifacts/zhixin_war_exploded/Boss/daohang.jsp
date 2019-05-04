<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/9
  Time: 20:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘|导航</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/daohang.css" type="text/css">
</head>
<body>
    <div class="container">
        <div class="nav_left">
            <ul>
                <c:forEach var="item" items="${Categorys}">
                    <li data-id="${item.id}"><span>${item.first}</span></li>
                </c:forEach>
                <c:choose>
                    <c:when test="${fn:length(Categorys)>12}">
                        <li data-id="0" style="color: #5DD5C8;font-weight: bold"><span>收起展开列表⬆</span></li>
                    </c:when>
                </c:choose>
            </ul>
        </div>
        <div class="nav_right">
            <c:forEach var="item" items="${Categorys}">
                <div class="sub hide" data-id="${item.id}">
                    <c:forEach var="second" items="${item.map}">
                        <dl>
                            <dt>${second.key}</dt>
                            <dd>
                                <c:forEach var="third" items="${second.value}">
                                    <a href="http://localhost:8080/zhixin/boss/searchTalentWithCondition.action?cateId=${third.value}&cateName=${third.key}&industry=default&industryId=default&city=default">${third.key}</a>
                                </c:forEach>
                            </dd>
                        </dl>
                    </c:forEach>
                </div>
            </c:forEach>
        </div>
    </div>
</body>
</html>
