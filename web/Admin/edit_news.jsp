<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2018/12/19
  Time: 18:01
  网站新闻资讯的编辑页面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 资讯编辑</title>
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../wangEditor-master/release/wangEditor.min.css" type="text/css">
    <link rel="stylesheet" href="../cropper-master/dist/cropper.min.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="../CSS/AdminCss/edit_news.css">
</head>
<body>

    <div class="news_edit_container">
    <div class="news_edit_up">
        <div class="news_edit_title">
            <label id="ne_title">资讯编辑</label>
        </div>
    </div>
    <div class="news_edit_content">
        <!-- 填写文章相关信息 -->
        <div class="edit_infor">
            <!-- 文章封面 -->
            <div class="news_cover">  <!-- 300*140 -->
                <div class="image-and-preview" id="show_cover">
                    <div class="img-container">
                        <img id="image" src="../images/icon_face.jpg" height="150px" width="300px">
                    </div> <!-- 盛放图片的容器-->
                    <div class="btn-group">
                        <label class="btn btn-primary btn-upload" for="inputImage" title="Upload image file">
                            <input type="file" class="sr-only" id="inputImage" name="file" accept="image/*">
                            <span class="docs-tooltip" data-animation="false" title="打开本地图片">
                                <span class="fa fa-upload">修改封面</span>
                            </span>
                        </label>
                    </div>
                    <!-- START:截取固定尺寸Width:300px，Height:150px -->
                    <div class="btn-group btn-group-crop" id="cutImage">
                        <button type="button" class="btn btn-success" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 300, &quot;height&quot;: 150 }">
                            <span class="docs-tooltip" data-animation="false" title="300*150">&nbsp300*150</span>
                        </button>
                    </div>
                    <!-- END：截取固定尺寸 -->
                </div>
            </div>
            <!-- 文章信息 -->
            <div class="news_infor">
                <label class="must_star">*</label><label id="news_title_label">文章标题&nbsp&nbsp:&nbsp&nbsp</label>
                <input type="text" id="news_title" placeholder="输入文章标题" onblur="titleBlur()"></br>
                <label class="must_star">*</label><label id="news_type_label">文章类型&nbsp&nbsp:&nbsp&nbsp</label>
                <select id="news_type">
                    <option value="开心一刻" selected>开心一刻</option>
                    <option value="干货文章">干货文章</option>
                    <option value="防骗指南">防骗指导</option>
                </select></br>
                <label class="must_star">*</label><label id="news_author_label">文章作者&nbsp&nbsp:&nbsp&nbsp</label>
                <input type="text" id="news_author" readonly="true" value="${Admin.name}"/>
                <input type="text" id="news_author_id" value="${Admin.id}" hidden/>
            </div>
        </div>
        <!-- 编辑文章内容 -->
        <div class="edit_content" id="myEditor">
        </div>
        <!--操作内容，包括发布、保存至草稿、丢弃 -->
        <div class="operate_news">
            <button type="button" class="btn btn-default" id="publish_new">发  布</button>
            <!--
               <button type="button" class="btn btn-default" id="save_new">保存到草稿</button>
            <button type="button" class="btn btn-default" id="leave_new">丢 弃</button>
            -->
        </div>
    </div>
    </div>
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../wangEditor-master/release/wangEditor.min.js" type="text/javascript"></script>
    <script src="../cropper-master/dist/cropper.min.js" type="text/javascript"></script>
    <script src="../JS/AdminJs/edit_news.js" type="text/javascript"></script>
</body>
</html>
