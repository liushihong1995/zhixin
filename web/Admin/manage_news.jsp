<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/12/18
  Time: 14:46
  网站资讯管理
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<html>
<head>
    <title>知心招聘 | 资讯管理</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../wangEditor-master/release/wangEditor.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/AdminCss/manage_news.css" type="text/css">
</head>
<body>
    <div id="hidden_div">
        <div id="hidden_div_close">
            <span class="glyphicon glyphicon-remove" onclick="closeHiddenDiv()"></span>
        </div>
        <!-- 资讯标题部分 -->
        <div id="hidden_div_infor">
            <label id="hidden_div_id" style="display: none"></label>
            <label id="hidden_div_title">
                无数据
            </label></br>
            <label id="hidden_div_type">
                无数据
            </label>
            <label id="hidden_div_time">
                2019-01-01 19:05:34
            </label>
        </div>
        <!-- 资讯内容部分-->
        <div id="hidden_div_content">
            <div id="brower_hidden_div">

            </div>
            <div id="edit_hidden_div">

            </div>
        </div>
        <div id="hidden_div_blank">
            <button type="button" class="btn btn-default" id="modify_new" onclick="updateContent()">更 新</button>
            <button type="button" class="btn btn-default" id="save_as_draft" onclick="savePubToDraft()">暂存草稿</button>
        </div>
    </div>
    <div class="manage_news_container">
        <!-- 按文章状态筛选，全部，以发布，草稿箱，回收站-->
        <div class="manage_news_status">
            <ul class="nav nav-tabs" id="news_status">
                <li role="presentation" class="active" id="news_pub" onclick="liClick('news_pub')"><a href="#" id="pub_news">已发布(12)</a></li>
                <li role="presentation" id="news_draft" onclick="liClick('news_draft')"><a href="#" id="draft_news">草稿箱(10)</a></li>
                <li role="presentation" id="news_trash" onclick="liClick('news_trash')"><a href="#" id="trash_news"><span class="glyphicon glyphicon-trash trash"></span>回收站(13)</a></li>

                <li role="presentation">
                        <form role="form" action="${pageContext.request.contextPath }/news/editNews.action"  method="post">
                            <input type="text" value="${adminId}" name="adminId" id="adminId" hidden>
                            <button type="submit" class="btn btn-default" id="editNewSubmit">
                                <span class="glyphicon glyphicon-plus plus"></span>写新闻
                            </button>
                        </form>
                </li>
            </ul>
        </div>
        <!-- 检索文章的条件-->
        <div class="manage_news_search">
            <label id="chose">筛选条件:</label>
            <label id="year_label">年份:</label>
            <select class="year" name="年" id="years">

            </select>
            <label id="month_label">月份:</label>
            <select class="month" name="月" id="months">
                <option selected>不 限</option>
                <c:forEach var="i" begin="1" end="12" step="1" >
                    <option>${i}</option>
                </c:forEach>
            </select>
            <label id="type_label">文章类型:</label>
            <select class="newsType" name="文章类型" id="chose_new_type">
                <option selected>全 部</option>
                <option>开心一刻</option>
                <option>干货文章</option>
                <option>防骗指南</option>
            </select>
             <label id="key_label">文章关键字:</label>
            <input type="text" name="news_key" class="keyword" id="key_word" placeholder="请输入标题关键字"/>
            <button type="button" class="btn btn-default" id="search_btn" onclick="search_btn_click()">搜 索</button>
        </div>
        <div class="search_infor" style="display: none">
            <label id="tableName"></label>
            <label id="new_year"></label>
            <label id="new_month"></label>
            <label id="new_type"></label>
            <label id="new_title"></label>
        </div>
        <!-- 文章列表 -->
        <div class="news_list" id="list">
            <!--
            <div class="item">
                <label class="title">文章题目</label>
                <label class="type">文章类型</label>
                <label class="pubTime">发布时间</label>
                <label class="see">查 看</label>
                <label class="edit">编 辑</label>
                <label class="delete">删 除</label>
            </div>
            <div class="item">
                <label class="title">圣诞不孤单，一起来狂欢</label>
                <label class="type">干货文章</label>
                <label class="pubTime">2018-12-31 16:12</label>
                <label class="see">&nbsp&nbsp<span class="glyphicon glyphicon-eye-open"></span></label>
                <label class="edit">&nbsp&nbsp<span class="glyphicon glyphicon-pencil"></span></label>
                <label class="delete">&nbsp&nbsp<span class="glyphicon glyphicon-trash"></span></label>
            </div>
            -->
        </div>
        <!-- 分页模块 -->
        <div class="manage_news_page">
            <div class="page" id="page_content">
            </div>
        </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../wangEditor-master/release/wangEditor.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../JS/AdminJs/manage_news.js" type="text/javascript"></script>
</body>
</html>
