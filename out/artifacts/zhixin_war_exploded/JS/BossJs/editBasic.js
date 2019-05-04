var industrys = new Array();
$(function () {
    init();
    initIndustryInfor();

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
        //aspectRatio: 1/1 , //裁剪框的宽高比
        viewMode: 2,        //视图模式,默认为0:无限制,1:截取框不能移到图片外部,2:不全部铺满背景,3:全部铺满背景
        dragMode: 'move',   //拖拽模式,默认为crop:产生一个新的裁剪框,可改变大小,move:可移动图片,none:不可移动图片
        preview: '.img-preview', //添加额外的元素(容器)以供预览
        autoCropArea: 0.8,        //定义初始化裁剪框对比图片的比例大小,默认为0.8
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

    $("#subCompInfor").on("click",function () {
        if(checkInfor()==true) {
            var _id = $("#ebId").val().trim();
            var _shortName = $("#shortNameInput").val().trim();
            var _summary = $("#introductInput").val().trim();
            var _stage = $("#stageInput").val().trim();
            var _scope = $("#scopeInput").val().trim();
            var _industry = $("#industryInput").val().trim();
            var _industryId = $("#industryIdInput").val().trim();
            var _website = $("#websiteInput").val().trim();
            var canvas = $('#image').cropper('getCroppedCanvas');
            if(canvas == null){
                alert("请选择图片");
                return false;
            }else {
                var data = canvas.toDataURL("image/jpeg", 0.7);  //转成base64
                var imgs = data.substring(23);
                var _logo = imgs;
                var item = {
                    id: _id,
                    fullName: "",
                    shortName: _shortName,
                    logo: _logo,
                    summary: _summary,
                    stage: _stage,
                    scope: _scope,
                    industry: _industry,
                    industryId: _industryId,
                    website:_website
                };
                $.ajax({
                    url : "http://localhost:8080/zhixin/boss/updateCompany.action",
                    data: JSON.stringify(item),
                    contentType: "application/json;charset=UTF-8",
                    async: false,
                    type: "post",
                    success: function (data) {
                        if(data==true) {
                            alert("修改公司基本信息成功");
                        }else {
                            alert("修改公司基本信息失败，请稍后尝试");
                        }
                    }
                });
            }
        }
    });


    $("#industryInput").on("focus",function () {
       showIndustryDiv();
    });

});

function choseScope(){
    var scope = $("#selectCompScope option:selected").val().trim();
    alert(scope);
    $("#scopeInput").val(scope);
}
function choseStage(){
    var stage = $("#selectCompStage option:selected").val().trim();
    $("#stageInput").val(stage);
}

function init() {
    var page = $("#pageInput").val().trim();
    var id = $("#idInput").val().trim();
    var operator = $("#operatorInput").val().trim();
    $("#ebPage").val(page);
    $("#ebOperator").val(operator);
    $("#ebId").val(id);

    if(page == "basicInfor") {
        var id = $("#idInput").val().trim();
        getCompany(id);
    }
}

function getCompany(id) {
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getCompany.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var company = data;
            var logo = company.logo;
            if(logo == null || logo=="") {
                $("#image").attr("src","../images/icon_face.jpg");
            } else {
                $("#image").attr("src","/compPic/" + company.logo);
            }
            $("#fullName").html("公司全称:" + company.fullName);
            $("#shortNameInput").val(company.shortName);
            $("#industryInput").val(company.industry);
            $("#industryIdInput").val(company.industryId);
            $("#selectCompScope").val(company.scope);
            $("#scopeInput").val(company.scope);
            $("#selectCompStage").val(company.stage);
            $("#stageInput").val(company.stage);
            $("#websiteInput").val(company.website);
            $("#introductInput").val(company.summary);
        }
    });
}

function clearCompInfor(){
    $("#shortNameInput").val("");
    $("#industryInput").val("");
    $("#industryIdInput").val("");
    $("#websiteInput").val("");
    $("#introductInput").val("");
}

function checkInfor() {
    var shortName = $("#shortNameInput").val().trim();
    if(shortName==null || shortName=="") {
        alert("请输入公司的简称");
        $("#shortNameInput").focus();
        return false;
    }
    var industry = $("#industryInput").val().trim();
    if(industry==null || industry=="") {
        alert("请输入公司所属行业");
        $("#industryInput").focus();
        return false;
    }
    var scope = $("#scopeInput").val().trim();
    if(scope==null || scope=="") {
        alert("请选择公司规模");
        $("#selectCompScope").focus();
        return false;
    }
    var stage = $("#stageInput").val().trim();
    if(stage==null || stage=="") {
        alert("请选择公司目前的发展阶段");
        $("#selectCompStage").focus();
        return false;
    }
    var website = $("#websiteInput").val().trim();
    if(website==null || website=="") {
        alert("请填写公司官网网址");
        $("#websiteInput").focus();
        return false;
    }
    var introduce = $("#introductInput").val().trim();
    if(introduce==null || introduce=="") {
        alert("请填写公司的简介");
        $("#introductInput").focus();
        return false;
    }
    return true;

}



//初始化行业信息
function initIndustryInfor() {
    $.ajax({
        url: "http://localhost:8080/zhixin/seeker/getIndustry.action",
        data: "haha",
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var obj = JSON.parse(data);
            var temp = obj["header"];
            var header = eval(temp);
            for(var i = 0; i < header.length; i++) {
                var str = obj[header[i]];
                var secondArr = eval(str);
                var array = new Array();
                for(var j = 0; j < secondArr.length; j++) {
                    array.push(secondArr[j]);
                }
                var item = {
                    first: header[i],
                    second: array
                }
                industrys.push(item);
            }
            setIndustryInfor();
        }
    });
}

//设置行业类别
function setIndustryInfor(){
    var content = "";
    for(var i = 0; i < industrys.length; i++) {
        var section = '<div class="industry_item">\n' +
            '                    <div class="industry_first">\n' +
            '                        <label>' + industrys[i].first + '</label>\n' +
            '                    </div>\n' +
            '                    <div class="industry_second">\n';
        var array = industrys[i].second;
        var index,len;
        var temp;
        for(var j = 0; j < array.length; j++) {
            index = array[j].indexOf("_");
            len = array[j].length;
            temp = array[j].substring(index+1,len);
            section = section + '<label id="'+array[j]+'" class="industry_name" onclick="chose_industry(this)">' + temp + '</label>';
        }
        section = section + '</div>\n' +
            '                </div>\n';
        content = content + section;
    }
    $(".industry_down").empty();
    $(".industry_down").append(content);
}


function closeIndustryDiv(){
    $(".hiddenDiv").css("display","none");
}
function showIndustryDiv() {
    $(".hiddenDiv").css("display","block");
}

function chose_industry(obj){
    var id = obj.id;
    var index = id.indexOf("_");
    var len = id.length;
    var industryId = id.substring(0,index);
    var industryName = id.substring(index+1,len);
    $("#industryInput").val(industryName);
    $("#industryIdInput").val(industryId);
    closeIndustryDiv();
}




