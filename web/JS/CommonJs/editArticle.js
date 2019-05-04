$(function () {
    var identity = $("#identity").val().trim();
    if(identity == "noUser") {
        alert("您尚未登录，登录后方可编辑文章。");
        window.location = "http://localhost:8080/zhixin/Common/login.jsp";
    }else {
        includeLinkStyle();
        /* Start：生成编辑器 */
        var E = window.wangEditor;
        var editor = new E("#contentInput");
        editor.customConfig.uploadImgShowBase64 = true;
        editor.create();
        $("#typeInput").val("笔经面经");
        /* End:生成编辑器 */
        /*Start:发表文章*/
        $("#publish").on("click",function () {
            var _title = $("#titleInput").val().trim();
            if(_title==null || _title=="") {
                alert("请输入文章标题");
                $("#titleInput").focus();
                return;
            }
            var _content = editor.txt.html();
            var _status = $("#statusInput").val().trim();
            var _userId = $("#userIdInput").val().trim();
            var _type = $("#typeInput").val().trim();
            var article = {
                id: "",
                title: _title,
                content: _content,
                time: "",
                visit: 0,
                reply: 0,
                status: _status,
                userId: _userId,
                type: _type
            };
            var identity = $("#identity").val().trim();
            var flag = false;
            if(identity == "noUser") {
                alert("您尚未登录，登录后方可发表文章。");
                flag = true;
            }else {
                $.ajax({
                    url : "http://localhost:8080/zhixin/article/insertArticle.action",
                    type: "post",
                    data: JSON.stringify(article),
                    async: false,
                    contentType: "application/json;charset=UTF-8",
                    success: function (data) {
                        if(data==true) {
                            alert("文章发布成功");
                            $("#titleInput").val("");
                            editor.txt.html("");
                        }else {
                            alert("文章发布失败");
                        }
                    }
                });
            }
            if(flag == true) {
                window.href="http://localhost:8080/zhixin/Common/login.jsp";
            }
        });
    }
});

//选择文章类型
function selectType(){
    var value = $("#type_select option:selected").val().trim();
    $("#typeInput").val(value);
}

//去到分享界面
function goShare(){
    window.location = "http://localhost:8080/zhixin/Common/share.jsp";
}

//切换头部样式
function includeLinkStyle(){
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    var identity = $("#identity").val().trim();
    if(identity == "boss") {
        link.href = "../CSS/BossCss/header_two.css";
    }else if(identity == "seeker"){
    /*<link rel="stylesheet" href="../CSS/CommonCss/header_one.css" type="text/css">*/
        link.href = "../CSS/CommonCss/header_one.css";
    }else {
        link.href = "../CSS/CommonCss/header_one.css";
    }
    document.getElementsByTagName("head")[0].appendChild(link);
}


