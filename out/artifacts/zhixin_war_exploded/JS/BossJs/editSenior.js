var boss = null;
$(function () {
    getBoss();
    init();
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

});

function getBoss() {
    var id = $("#bossId").val();
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getBossBasic.action",
        data: id,
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            boss = data;
        }
    });
}

function init() {
    var page = $("#pageInput").val().trim();
    var id = $("#idInput").val().trim();
    var operator = $("#operatorInput").val().trim();
    $("#esPage").val(page);
    $("#esOperator").val(operator);
    $("#esId").val(id);
    if(page == "seniorInfor") {
        if(operator=="modify") {
           getSenior(id);
        }
    }
}

function checkInfor() {
    var name = $("#nameInput").val().trim();
    if(name==null || name=="") {
        alert("请输入高管姓名");
        $("#nameInput").focus();
        return false;
    }
    var job = $("#jobInput").val().trim();
    if(job==null || job=="") {
        alert("请输入其在公司担任的职位");
        $("#jobInput").focus();
        return false;
    }
    var introduce = $("#introduceInput").val().trim();
    if(introduce==null || introduce=="") {
        alert("请输入高管介绍");
        $("#introductInput").focus();
        return false;
    }
    return true;
}

function submitSenior(){
    if(checkInfor()==false) return;
    var canvas = $('#image').cropper('getCroppedCanvas');
    if(canvas == null){
        alert("请选择图片");
        return false;
    }
    var data = canvas.toDataURL("image/jpeg", 0.7);  //转成base64
    var imgs = data.substring(23);
    var _psrc = imgs;
    var _id = $("#esId").val().trim();
    var _name = $("#nameInput").val().trim();
    var _job = $("#jobInput").val().trim();
    var _introduce = $("#introduceInput").val().trim();
    var _compId = boss.compId;
    var _bossId = boss.id;
    var page = $("#esPage").val().trim();
    var operator = $("#esOperator").val().trim();
    var senior = {
        id: _id,
        name: _name,
        job: _job,
        introduce: _introduce,
        compId: _compId,
        bossId: _bossId,
        psrc: _psrc,
    };
    if(page != "seniorInfor") return;
    if(operator=="modify") {
        $.ajax({
            url : "http://localhost:8080/zhixin/boss/updateSenior.action",
            data: JSON.stringify(senior),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                if(data==true) {
                    alert("修改高管信息成功");
                    window.location = "http://localhost:8080/zhixin/Boss/mangeCompInfor.jsp";

                }else {
                    alert("修改高管信息失败，请稍后尝试。");
                }
            }
        });
    }else{
        $.ajax({
            url : "http://localhost:8080/zhixin/boss/insertSenior.action",
            data: JSON.stringify(senior),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                if(data==true) {
                    alert("添加高管信息成功");
                    window.location = "http://localhost:8080/zhixin/Boss/mangeCompInfor.jsp";
                }else {
                    alert("添加高管信息失败，请稍后尝试");
                }
            }
        });
    }
}

function getSenior(id){
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getSenior.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            $("#nameInput").val(data.name);
            $("#jobInput").val(data.job);
            $("#introduceInput").val(data.introduce);
            $("#image").attr("src","/senPic/" + data.psrc);
        }
    });
}

function clearText() {
    $("#nameInput").val("");
    $("#jobInput").val("");
    $("#introductInput").val("");
}
