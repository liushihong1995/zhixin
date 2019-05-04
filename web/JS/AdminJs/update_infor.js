var admin = null;
$(function () {
    var console = window.console || { log: function () {} };
    var URL = window.URL || window.webkitURL;
    var $image = $('#image');
    var $dataX = $('#dataX');
    var $dataY = $('#dataY');
    var $dataHeight = $('#dataHeight');
    var $dataWidth = $('#dataWidth');
    var $dataRotate = $('#dataRotate');
    var $dataScaleX = $('#dataScaleX');
    var $dataScaleY = $('#dataScaleY');
    var options = {
        aspectRatio: 1 / 1, //裁剪框的宽高比
        viewMode: 1,        //视图模式,默认为0:无限制,1:截取框不能移到图片外部,2:不全部铺满背景,3:全部铺满背景
        dragMode: 'move',   //拖拽模式,默认为crop:产生一个新的裁剪框,可改变大小,move:可移动图片,none:不可移动图片
        preview: '.img-preview', //添加额外的元素(容器)以供预览
        autoCropArea: 0.5, //定义初始化裁剪框对比图片的比例大小,默认为0.8
        cropBoxResizable: true, //是否可以调整剪裁框的大小
        cropBoxMovable: true, //是否可以移动剪裁框
        crop: function (e) {
            $dataX.val(Math.round(e.x));
            $dataY.val(Math.round(e.y));
            $dataHeight.val(Math.round(e.height));
            $dataWidth.val(Math.round(e.width));
            $dataRotate.val(e.rotate);
            $dataScaleX.val(e.scaleX);
            $dataScaleY.val(e.scaleY);
        }
    };
    var originalImageURL = $image.attr('src');
    var uploadedImageName = '';
    var uploadedImageType = 'image/jpeg';
    var uploadedImageURL;

    // Cropper
    $image.on({
        ready: function (e) {
            //console.log(e.type);
        },
        cropstart: function (e) {
            //console.log(e.type, e.action);
        },
        cropmove: function (e) {
            //console.log(e.type, e.action);
        },
        cropend: function (e) {
            //console.log(e.type, e.action);
        },
        crop: function (e) {
            //console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
        },
        zoom: function (e) {
            //console.log(e.type, e.ratio);
        }
    }).cropper(options);

    // Buttons
    if (!$.isFunction(document.createElement('canvas').getContext)) {
        $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }

    if (typeof document.createElement('cropper').style.transition === 'undefined') {
        $('button[data-method="rotate"]').prop('disabled', true);
        $('button[data-method="scale"]').prop('disabled', true);
    }


    // Methods
    $('.docs-buttons').on('click', '[data-method]', function () {
        var $this = $(this);
        var data = $this.data();
        var cropper = $image.data('cropper');
        var cropped;
        var $target;
        var result;

        if ($this.prop('disabled') || $this.hasClass('disabled')) {
            return;
        }

        if (cropper && data.method) {
            data = $.extend({}, data); // Clone a new one

            if (typeof data.target !== 'undefined') {
                $target = $(data.target);

                if (typeof data.option === 'undefined') {
                    try {
                        data.option = JSON.parse($target.val());
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }

            cropped = cropper.cropped;

            switch (data.method) {
                case 'rotate': //旋转
                    if (cropped && options.viewMode > 0) {
                        $image.cropper('clear');
                    }

                    break;

                case 'getCroppedCanvas':
                    if (uploadedImageType === 'image/jpeg') {
                        if (!data.option) {
                            data.option = {};
                        }

                        data.option.fillColor = '#fff';
                    }

                    break;
            }

            result = $image.cropper(data.method, data.option, data.secondOption);

            switch (data.method) {
                case 'rotate':
                    if (cropped && options.viewMode > 0) {
                        $image.cropper('crop');
                    }
                    break;
                case 'scaleX':
                case 'scaleY':
                    $(this).data('option', -data.option);
                    break;

                case 'getCroppedCanvas':
                    if (result) {
                        // Bootstrap's Modal
                        $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

                    }

                    break;

                case 'destroy':
                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                        uploadedImageURL = '';
                        $image.attr('src', originalImageURL);
                    }

                    break;
            }

            if ($.isPlainObject(result) && $target) {
                try {
                    $target.val(JSON.stringify(result));
                } catch (e) {
                    console.log(e.message);
                }
            }

        }
    });

    // Import image
    var $inputImage = $('#inputImage');

    if (URL) {
        $inputImage.change(function () {
            var files = this.files;
            var file;

            if (!$image.data('cropper')) {
                return;
            }

            if (files && files.length) {
                file = files[0];

                if (/^image\/\w+$/.test(file.type)) {
                    uploadedImageName = file.name;
                    uploadedImageType = file.type;

                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }

                    uploadedImageURL = URL.createObjectURL(file);
                    $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
                    $inputImage.val('');
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        });
    } else {
        $inputImage.prop('disabled', true).parent().addClass('disabled');
    }

    //上传图片js变更为
    $("#getCroppedCanvas").on("click", function () {
        var canvas = $('#image').cropper('getCroppedCanvas');
        if(canvas == null){
            alert("请选择图片");
            return false;
        }else{
            var data = canvas.toDataURL("image/jpeg",0.7);  //转成base64
            var id = $("#userAccount").val().trim();
            var imgs = data.substring(23);
            var params = '{"id":"' + id + '","image":"' + imgs + '"}';
            $.ajax({
                url : "http://localhost:8080/zhixin/admin/uploadPicture.action",
                type: "post",
                data:  params,
                processData: false,
                contentType: "application/json;charset=UTF-8",
                success: function (data) {
                    if(data==true){
                        alert("上传成功");
                    }else {
                        alert("上传失败，请再次尝试！");
                    }
                }
            });
        }
    });
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
                $("#department").val(data.department);
                $("#email").val(data.email);
                $("#oldPhone").val(data.phone);

                $("#adminPhone").html(data.phone);
                $("#adminName").html("Hi~" + data.name);

                if(data.psrc==null || data.psrc=="") {
                    $("#image").attr("src","../images/icon_face.jpg");
                    $("#adminPsrc").attr("src","../images/icon_face.jpg");
                } else {
                    $("#image").attr("src","/adminPic/" + data.psrc);
                    $("#adminPsrc").attr("src","/adminPic/" + data.psrc);
                }
            }
        });
    }
}


function departBlur() {
    if(checkDepart()==false) {
        alert("所在部门不能为空！");
    }
}

//检测填写的所在部门是否合法
function checkDepart() {
    var department = $("#department").val();
    var flag = true;
    if(department==null) {
        flag = false;
    }else {
        department = department.trim();
        if(department=="") {
            flag = false;
        }
    }
    return flag;
}

function emailBlur() {
    if(checkEmail()==false) {
        alert("常用邮箱不能为空!");
    }
}

function checkEmail() {
    var email = $("#email").val();
    var num = 0;
    if(email==null) {
        num = 1;
    }else {
        email = email.trim();
        if(email=="") {
            num = 1;
        }else {
            var index = email.indexOf('@');
            var str = email.substring(index,email.length);
            if(str=="@qq.com" || str=="@163.com" || str=="@sina.com") {
                num = 0;
            }else {
                num = 2;
            }
        }
    }
    if(num==0) {
        return true;
    }else {
        return false;
    }
}

//更新部门和邮箱
function deSave() {
    if(checkDepart()==false) {
        alert("所在部门不能为空");
        return;
    }
    if(checkEmail()==false) {
        alert("常用邮箱不能为空");
    }
    //获取所在部门
    var department = $("#department").val().trim();
    //获取邮箱
    var email = $("#email").val().trim();
    //获取账号
    var id = $("#userAccount").val().trim();
    var params = '{"id":"'+ id + '","department":"' + department + '","email":"' + email + '"}';
    $.ajax({
        url: "http://localhost:8080/zhixin/admin/updateDepartAndEmail.action",
        data: params,
        contentType: "application/json;charset=UTF-8",
        type: "post",
        success: function (data) {
            if(data==true) {
                alert("修改部门、邮箱成功。");
            }else {
                alert("修改部门、邮箱失败,请稍后再试!");
            }
        }
    });
}

//判断密码是否存在
function passExist(){
    var id = $("#userAccount").val().trim();
    var oldPassword = $("#oldPassword").val().trim();
    var flag = true;
    if(oldPassword==null || oldPassword=="") {
        alert("旧密码不能为空");
        flag = false;
    }else {
        var params = '{"id":"' + id + '","password":"' + oldPassword + '"}';
        $.ajax({
            url: "http://localhost:8080/zhixin/admin/existPassword.action",
            data: params,
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function(data) {
                if(data==true) {
                    $("#existPass").removeClass("glyphicon glyphicon-remove");
                    $("#existPass").addClass("glyphicon glyphicon-ok");
                    $("#existPass").css("display","inline");
                    $("#newPassword").removeAttr("readonly");
                    flag = true;
                }else {
                    $("#existPass").removeClass("glyphicon glyphicon-ok");
                    $("#existPass").addClass("glyphicon glyphicon-remove");
                    $("#existPass").css("display","inline");
                    $("#newPassword").attr("readonly","true");
                    flag = false;
                }
            }
        });
    }
    return flag;
}

//检测新的密码
function checkNewPass() {
    var newPassword = $("#newPassword").val();
    if(newPassword==null) {
        $("#newPasswordSign").removeClass("glyphicon glyphicon-ok");
        $("#newPasswordSign").addClass("glyphicon glyphicon-remove");
        $("#newPasswordSign").css("display","inline");
        $("#confirPassword").attr("readonly","true");
        alert("新密码不能为空");
        return false;
    }else {
        newPassword = newPassword.trim();
        if(newPassword=="") {
            $("#newPasswordSign").removeClass("glyphicon glyphicon-ok");
            $("#newPasswordSign").addClass("glyphicon glyphicon-remove");
            $("#newPasswordSign").css("display","inline");
            $("#confirPassword").attr("readonly","true");
            alert("新密码不能为空");
            return false;
        }else {
            if(newPassword.length<6) {
                $("#newPasswordSign").removeClass("glyphicon glyphicon-ok");
                $("#newPasswordSign").addClass("glyphicon glyphicon-remove");
                $("#newPasswordSign").css("display","inline");
                $("#confirPassword").attr("readonly","true");
                alert("密码为>=6位字母加数字");
                return false;
            }else {
                for(var i = 0; i < newPassword.length; i++) {
                    if(newPassword[i]>='0'&&newPassword[i]<='9'){
                        continue;
                    }else if(newPassword[i]>='A' && newPassword[i]<='Z') {
                        continue;
                    }else if(newPassword[i]>='a' && newPassword[i]<='z') {
                        continue;
                    }else {
                        $("#newPasswordSign").removeClass("glyphicon glyphicon-ok");
                        $("#newPasswordSign").addClass("glyphicon glyphicon-remove");
                        $("#newPasswordSign").css("display","inline");
                        $("#confirPassword").attr("readonly","true");
                        alert("密码为>=6位字母加数字");
                        return false;
                    }
                }
            }
        }
    }
    $("#newPasswordSign").removeClass("glyphicon glyphicon-remove");
    $("#newPasswordSign").addClass("glyphicon glyphicon-ok");
    $("#newPasswordSign").css("display","inline");
    $("#confirPassword").removeAttr("readonly");
    return true;
}

//检测确认密码
function checkConfirmPass() {
    var newPassword = $("#newPassword").val().trim();
    var confirmPassword = $("#confirPassword").val().trim();
    if(newPassword==confirmPassword) {
        $("#confimSign").removeClass("glyphicon glyphicon-remove");
        $("#confimSign").addClass("glyphicon glyphicon-ok");
        $("#confimSign").css("display","inline");
        $("#passwordUpdate").removeAttr("disabled");
        return true;
    }else {
        $("#confimSign").removeClass("glyphicon glyphicon-ok");
        $("#confimSign").addClass("glyphicon glyphicon-remove");
        $("#confimSign").css("display","inline");
        $("#passwordUpdate").attr("disabled","false");
        alert("确认密码与新密码一致");
        return false;
    }
}

/*保存密码按钮*/
function savePassword() {
    if(passExist()==true && checkNewPass()==true && checkConfirmPass()==true) {
        var _id = $("#userAccount").val().trim();
        var _password = $("#newPassword").val().trim();
        var params = {
            id : _id,
            password: _password
        };
        $.ajax({
           url: "http://localhost:8080/zhixin/admin/updatePassword.action",
            data: JSON.stringify(params),
            contentType: "application/json;charset=UTF-8",
            type: "post",
            success: function (data) {
                if(data==true) {
                    alert("修改密码成功");
                    $("#oldPassword").val("");
                    $("#newPassword").attr("readonly","true");
                    $("#newPassword").val("");
                    $("#confirPassword").attr("readonly","true");
                    $("#confirPassword").val("");
                    $("#passwordUpdate").attr("disabled","false");
                    $("#existPass").css("display","none");
                    $("#newPasswordSign").css("display","none");
                    $("#confimSign").css("display","none");
                }else {
                    alert("修改失败，请稍后尝试");
                }
            }
        });
    }else {
        alert("数据有误");
    }
}

/**
 * 新手机号检测，检测条件：
 * 1.不能为空，且为11位数字。
 * 2.不能在数据库中已经存在。
 */
function newPhoneCheck() {
    var newPhone = $("#newPhone").val().trim();
    var flag = true;
    if(newPhone==null) {
        alert("新手机号不能为空");
        flag = false;
        $("#dynamicCode").attr("disabled","false");
    }else if(newPhone == "") {
        alert("新手机号不能为空");
        flag = false;
        $("#dynamicCode")
    }else {
        if (newPhone.length != 11) {
            alert("手机号码是11位数字");
            flag = false;
        } else {
            for (var i = 0; i < newPhone.length; i++) {
                if (newPhone[i] >= '0' && newPhone[i] <= '9') {
                    continue;
                } else {
                    alert("手机号码是11位数字");
                    flag = false;
                    break;
                }
            }
        }
    }
    if(flag) {
        /*提交验证账号是否已经存在*/
        var params = '{"phone":"' + newPhone + '"}';
        $.ajax({
            url: "http://localhost:8080/zhixin/admin/accountExist.action",
            data: params,
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                if(data==true) {
                    alert("该手机号已被注册");
                    flag = false;
                }else {
                    flag = true;
                }
            }
        });
    }
    if(flag==true) {
        $("#newPhoneSign").removeClass("glyphicon glyphicon-remove");
        $("#newPhoneSign").addClass("glyphicon glyphicon-ok");
        $("#newPhoneSign").css("display","inline");
        $("#getCode").removeAttr("disabled");
        $("#newPhone").attr("readonly","true");   //变成只读状态
    }else {
        $("#newPhoneSign").removeClass("glyphicon glyphicon-ok");
        $("#newPhoneSign").addClass("glyphicon glyphicon-remove");
        $("#newPhoneSign").css("display","inline");
        $("#dynamicCode").attr("disabled","false");
        $("#getCode").attr("disabled","false");
    }
    return flag;
}

/**
 * 清空号码换绑模块
 */
function clearText() {
    $("#newPhone").val("");      //新号码置空,并设置其状态可编辑

    $("#dynamicCode").val("");  //短信验证码文本框置空，并设置其状态不可编辑。
    $("#dynamicCode").attr("disabled","false");

    $("#onUpdate").attr("disabled","false");   //保存按钮设置为不可用
    $("#newPhoneSign").css("display","none");  //取消新号码的对错标识
    $("#dynamicCodeSign").css("display","none");  //取消动态码的对错标识
    $("#dynamicCode").attr("readonly","true");  //短信验证码为不可编辑状态

    $("#getCode").attr("disabled","false");     //获取动态码按钮为不可用状态
    $("#resetBtn").attr("disabled","false");    //自己也设置为不可用状态
}

/*点击获取动态码*/
function getCodeClick(restSecond) {
    $("#dynamicCode").removeAttr("disabled");
    var _newPhone = $("#newPhone").val().trim();
    var _oldPhone = $("#oldPhone").val().trim();
    var params = {
        oldPhone : _oldPhone,
        newPhone : _newPhone
    };

    $.ajax({
        type:"post",
        url: "http://localhost:8080/zhixin/admin/getDynamicCode.action",
        data: JSON.stringify(params),
        contentType: "application/json",
        async: false,
        success : function (data) {
            if(data==false) {
                alert("短信动态码发送失败，请稍后尝试！");
            }else {
                $("#dynamicCode").removeAttr("disabled");
                $("#dynamicCode").removeAttr("readonly");
                countDown(restSecond);
            }
        }
    });
}


//倒计时功能
function countDown(restSecond) {
    var obj = $("#getCode");
    if(restSecond==0) {
        obj.removeAttr("disabled");
        obj.html("获取动态码");
        restSecond = 60;
        $("#dynamicCode").val("");                   //清空
        $("#dynamicCode").attr("readonly","true");  //文本框变成不可编辑
        return;
    }else {
        obj.attr("disabled","false");
        obj.html("已发送(" + restSecond + "s)");
        restSecond--;
    }
    setTimeout(function(){
        countDown(restSecond)},1000);
}


//生成随机数,参数num代表生成几位
function generateRandom(num) {
    var str = "";
    for(var i = 0; i < num; i++) {
        var value = Math.floor(Math.random()*10);
        str += value;
    }
    return str;
}

//鼠标从dynamicCode移除时发生
function  dynamicCodeBlur() {
   var value = $("#getCode").val().trim();
   var dyCode = $("#dynamicCode").val().trim();  //动态码
    var oldPhone = $("#oldPhone").val().trim();    //旧手机号
    var params = '{"code":"' + dyCode + '","id":"' + oldPhone + '"}';
    $.ajax({
        type:"post",
        url: "http://localhost:8080/zhixin/checkCode.action",
        data: params,
        contentType: "application/json",
        async: false,
        success : function (data) {
            //验证成功
            if(data==true) {
                $("#dynamicCode").attr("readonly","true");  //设置为不可编辑
                $("#getCode").attr("disabled","false");   //按钮设置为不可用
                $("#resetBtn").removeAttr("disabled");     //清空按钮设置为可用
                $("#onUpdate").removeAttr("disabled");     //保存按钮设置为可用
            }else {
                alert("验证失败！");
                $("#dynamicCode").val("");
            }
        }
    });
}

/*换绑手机号码*/
function updatePhone() {
    var _id = $("#userAccount").val().trim();
    var _oldPhone = $("#oldPhone").val().trim();
    var _newPhone = $("#newPhone").val().trim();
    var params = {
        id : _id,
        oldPhone: _oldPhone,
        newPhone: _newPhone
    };
    $.ajax({
        type:"post",
        url: "http://localhost:8080/zhixin/admin/updatePhone.action",
        data: JSON.stringify(params),
        contentType: "application/json",
        async: false,
        success : function (data) {
            if(data == true) {
                $("#oldPhone").val(_newPhone);
                $("#adminPhone").html(_newPhone);
                alert("换绑手机号码成功");
            } else {
                alert("换绑手机号码失败，请稍后尝试");
            }
            //清空操作
            clearText();
        }
    });

}