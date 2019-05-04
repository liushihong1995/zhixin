$(function(){
    $("#search_content").keyup(function(){
        var fullName = $("#search_content").val().trim();
        $.ajax({
            url : "http://localhost:8080/zhixin/boss/getCompByFull.action",
            data: String(fullName),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function(data) {
                var companys = eval(data);
                $("#compNameList").css("display","block");
                $("#compList").empty();
                var shortName,array;
                for(var i = 0; i < companys.length; i++) {
                    array = companys[i].split(";");
                    shortName = array[2];
                    $("#compList").append('<li onclick="choseComp(this)">'+ shortName +'</li>');
                }
            }
        });
    });

    $("#extend_btn").on("click",function () {

    });
});



