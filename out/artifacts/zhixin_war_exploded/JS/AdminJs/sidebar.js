var admin;
$(function(){
    getUserInfor();
});

/**
 * 获取管理员的信息
 */
function getUserInfor() {
    var id = $("#userAccount").val().trim();
    if(id==null || id=="") {
        alert("登录已过期，请重新登录");
        window.location = "http://localhost:8080/zhixin/Admin/login.jsp";
    } else {
        $.ajax({
            url: "http://localhost:8080/zhixin/admin/getAdminById.action",
            data: String(id),
            contentType: "application/json;charset=UTF-8",
            type: "post",
            success: function (data) {
                admin = data;
                $("#adminPhone").html(data.phone);
                $("#adminName").html("Hi~" + data.name);
                if(data.psrc==null || data.psrc=="") {
                    $("#adminPsrc").attr("src","../images/icon_face.jpg");
                } else {
                    $("#adminPsrc").attr("src","/adminPic/" + data.psrc);
                }
            }
        });
    }
}

/* 侧边栏切换形态 */
$(".navbar-side a").click(function(){
    $("body").toggleClass("sidebar-collapse");
    if($("body").hasClass("sidebar-collapse")){
        $(".sidebar > h4").html("博客");
    }else{
        $(".sidebar > h4").html("博客管理系统(四月)");
    }
    return false;
})

$(".sidenav>li>a").click(function(){
    $(this).addClass("hover");
    $(this).next().slideToggle();
    $(this).parent().siblings().children("a").removeClass("hover").next().slideUp();
})


//创建管理员账户，检测登录用户是否是超级管理员。
function show_create_admin() {
    var id = $("#userAccount").val().trim();
    id = Number(id);
    if(id != 3) {
        alert("您不是超级管理员，没有创建普通管理员的权限");
    } else {
        $("#content").load("../Admin/create_admin.jsp"); //加载创建管理员的页面
    }
}

//展示管理员列表以便让超级管理员管理，需要提前检测登录用户是否是超级管理员
function show_admin_list() {
    var id = $("#userAccount").val().trim();
    id = Number(id);
    if(id != 3) {
        alert("您不是超级管理员，没有管理普通管理员的权限");
    } else {
        $("#content").load("../Admin/admin_list.jsp");  //加载显示管理员列表的页面
    }
}

//更新个人信息界面
function update_admin_infor() {
    $("#content").load("../Admin/update_infor.jsp");  //加载显示更新界面的页面
}

function show_manage_news() {
    $("#content").load("../Admin/manage_news.jsp");  //加载文章编辑页面
}

function show_industry_manage() {
    $("#content").load("../Admin/industry_manage.jsp");  //加载行业管理界面
}


function show_category_manage(){
    $("#content").load("../Admin/category_manage.jsp");
}


