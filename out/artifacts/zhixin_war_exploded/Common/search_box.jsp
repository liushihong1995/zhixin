<%--
  Created by IntelliJ IDEA.
  User: 57215
  Date: 2019/1/11
  Time: 12:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 搜索框</title>
    <link rel="stylesheet" href="../CSS/CommonCss/search_box.css" type="text/css">
</head>
<body>
    <!-- 职位检索框 -->
    <div class="search_box_container">
        <div class="search_form">
            <form>
                <div class="show_hope_city">
                    <label id="hope_city">全国</label><span id="city_extend"class="glyphicon glyphicon-triangle-bottom"></span>
                </div>
                <div class="show_search_content">
                    <input type="text" id="search_content" placeholder="  搜索职位、公司" name="search_content" autocomplete="off">
                    <div id="compNameList">
                        <ul id="compList">
                        </ul>
                    </div>
                </div>
                <div class="show_category">
                    <label id="catetory">职位类型</label><span id="category_extend"class="glyphicon glyphicon-triangle-bottom"></span>
                </div>
                <input type="text" id="cityInput" name="cityInput" hidden>
                <input type="text" id="categoryInput" name="categoryInput" hidden>
                <input type="text" id="categoryIdInput" name="categoryIdInput" hidden>
                <button type="button" id="subSearchInfor" onclick="searchJob()"><span class="glyphicon glyphicon-search"></span></button>
            </form>
       </div>
        <div class="select_condition_div">
            <!-- Start: 挑选城市-->
            <div class="select_position">
                <div class="select_province">
                    <ul>
                        <li data-id="全国">全国</li>
                        <c:forEach var="city" items="${Citys}">
                            <c:choose>
                                <c:when test="${city.province =='全国'}">

                                </c:when>
                                <c:otherwise>
                                    <li data-id="${city.province}">${city.province}</li>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                    </ul>
                </div>
                <div class="select_city">
                    <div class="subCity" data-id="全国">
                        <li><span>全国</span></li>
                    </div>
                    <c:forEach var="item" items="${Citys}">
                        <c:choose>
                            <c:when test="${item.province =='全国'}">
                            </c:when>
                            <c:otherwise>
                                <div class="subCity hide" data-id="${item.province}">
                                    <c:forEach var="city" items="${item.array}">
                                        <li>${city}</li>
                                    </c:forEach>
                                </div>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                </div>
            </div>
            <!-- End: 挑选城市 -->
            <!-- Start：挑选职位类型-->
            <div class="select_category">
                <div class="select_first">
                    <ul>
                        <c:forEach var="item" items="${Categorys}">
                            <li data-id="${item.simple}">${item.simple}</li>
                        </c:forEach>
                    </ul>
                </div>
                <div class="select_second">
                        <c:forEach var="item" items="${Categorys}">
                            <div class="cateSecond hide" data-id="${item.simple}">
                                <c:forEach var="secondLevel" items="${item.map}">
                                    <li data-id="${secondLevel.key}">${secondLevel.key}</li>
                                </c:forEach>
                            </div>
                        </c:forEach>
                </div>
                <div class="select_third">
                        <c:forEach var="item" items="${Categorys}">
                            <c:forEach var="cate" items="${item.map}">
                                <div class="cateThird hide" data-id="${cate.key}">
                                    <c:forEach var="thirdLevel" items="${cate.value}">
                                        <li data-id="${thirdLevel}" id="${thirdLevel.value}">${thirdLevel.key}</li>
                                    </c:forEach>
                                </div>
                            </c:forEach>
                        </c:forEach>
                </div>
            </div>
            <!-- End: 挑选职位类型-->
            <div class="select_industry" style="display: none;">
                ${Industrys}
            </div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../JS/CommonJs/search_box.js" type="text/javascript"></script>
</body>
</html>
