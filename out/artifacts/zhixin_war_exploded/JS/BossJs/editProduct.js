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
    $("#epPage").val(page);
    $("#epOperator").val(operator);
    $("#epId").val(id);
    if(page == "productInfor") {
        if(operator=="modify") {
            getProduct(id);
        }
    }
}


function checkInfor() {
    var name = $("#nameInput").val().trim();
    if(name==null || name=="") {
        alert("请输入产品名称");
        $("#nameInput").focus();
        return false;
    }
    var slogan = $("#sloganInput").val().trim();
    if(slogan==null || slogan=="") {
        alert("清输入产品广告词");
        $("#sloganInput").focus();
        return false;
    }
    return true;
}

function submitProduct(){
    if(checkInfor()==false) return;
    var canvas = $('#image').cropper('getCroppedCanvas');
    if(canvas == null){
        alert("请选择图片");
        return false;
    }
    var data = canvas.toDataURL("image/jpeg", 0.7);  //转成base64
    var imgs = data.substring(23);
    var _logo = imgs;
    var _id = $("#epId").val().trim();
    var _name = $("#nameInput").val().trim();
    var _slogan = $("#sloganInput").val().trim();
    var _url = $("#urlInput").val().trim();
    var _compId = boss.compId;
    var _bossId = boss.id;
    var page = $("#epPage").val().trim();
    var operator = $("#epOperator").val().trim();
    var product = {
        id: _id,
        name: _name,
        slogan: _slogan,
        url: _url,
        compId: _compId,
        bossId: _bossId,
        logo: _logo
    };
    if(page != "productInfor") return;
    if(operator=="modify") {
        $.ajax({
            url : "http://localhost:8080/zhixin/boss/updateProduct.action",
            data: JSON.stringify(product),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                if(data==true) {
                    alert("修改产品信息成功");
                }else {
                    alert("修改产品信息失败，请稍后尝试");
                }
            }
        });
    }else{
        $.ajax({
            url : "http://localhost:8080/zhixin/boss/insertProduct.action",
            data: JSON.stringify(product),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                if(data==true) {
                    alert("添加产品信息成功");
                    window.location = "http://localhost:8080/zhixin/Boss/mangeCompInfor.jsp";
                }else {
                    alert("添加产品信息失败，请稍后尝试");
                }
            }
        });
    }
}

function getProduct(id){
    $.ajax({
        url : "http://localhost:8080/zhixin/boss/getProduct.action",
        data: String(id),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            $("#nameInput").val(data.name);
            $("#sloganInput").val(data.slogan);
            $("#urlInput").val(data.url);
            var logo = data.logo;
            if(logo==null || logo=="") {
            } else {
                $("#image").attr("src","/proPic/" + data.logo);
            }

        }
    });
}

function clearText() {
    $("#nameInput").val("");
    $("#sloganInput").val("");
    $("#urlInput").val("");
}
