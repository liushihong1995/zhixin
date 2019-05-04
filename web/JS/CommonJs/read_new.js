$(function (){
    includeLinkStyle();
});
/*根据用户的不同引入相应的css*/
function includeLinkStyle() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    var identity = $("#identity").val().trim();
    if(identity == "boss") {
        link.href = "../CSS/BossCss/news_header.css";
    }else {
        link.href = "../CSS/CommonCss/header_two.css";
    }
    document.getElementsByTagName("head")[0].appendChild(link);
}