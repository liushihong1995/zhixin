$(function () {
    var pre = "无";

    $(".item").on("click",function () {
        if(pre != "无") {
            pre.css("background-color","#F2F5FA");
            pre.css("color","black");
            pre.css("border-color"," #adadad")
        }
       $(this).css("background-color","#ffffff");
        $(this).css("color","black");
        $(this).css("border-color","#ffffff");
        pre = $(this);
        var str = this.id;
        if(str=="basicInfor") {
            $(".midRight").load("../Boss/editBasic.jsp");
        }else if(str == "productInfor") {
            $(".midRight").load("../Boss/editProduct.jsp");
        }else if(str == "seniorInfor") {
            $(".midRight").load("../Boss/editSenior.jsp");
        } else if(str == "pictureInfor") {
            $(".midRight").load("../Boss/editEnvironment.jsp");
        }
    });
    initRight();
});

function initRight(){
    var page = $("#pageInput").val().trim();
    if(page=="basicInfor") {
        $("#basicInfor").attr("")
        $("#basicInfor").click();
    }else if(page == "productInfor") {
        $("#productInfor").click();
    }else if(page == "seniorInfor") {
        $("#seniorInfor").click();
    }else {
        $("#pictureInfor").click();
    }
}





