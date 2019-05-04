$(function () {
    /* Start：生成编辑器 */
    var E = window.wangEditor;
    var editor = new E("#myEditor");
    editor.customConfig.uploadImgShowBase64 = true;
    editor.create();
    /* End:生成编辑器 */


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
        aspectRatio: 2/1 , //裁剪框的宽高比
        viewMode: 3,        //视图模式,默认为0:无限制,1:截取框不能移到图片外部,2:不全部铺满背景,3:全部铺满背景
        dragMode: 'move',   //拖拽模式,默认为crop:产生一个新的裁剪框,可改变大小,move:可移动图片,none:不可移动图片
        preview: '.img-preview', //添加额外的元素(容器)以供预览
        autoCropArea: 1,        //定义初始化裁剪框对比图片的比例大小,默认为0.8
        cropBoxResizable: false, //是否可以调整剪裁框的大小
        cropBoxMovable: false, //是否可以移动剪裁框
        crop: function (e) {
            /*$dataX.val(Math.round(e.x));
            $dataY.val(Math.round(e.y));
            $dataHeight.val(Math.round(e.height));
            $dataWidth.val(Math.round(e.width));
            $dataRotate.val(e.rotate);
            $dataScaleX.val(e.scaleX);
            $dataScaleY.val(e.scaleY);*/
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

    //START上传图片js变更为
    $("#getCroppedCanvas").on("click", function () {
        var canvas = $('#image').cropper('getCroppedCanvas');
        if(canvas == null){
            alert("请选择图片");
            return false;
        }else{
            var data = canvas.toDataURL("image/jpeg",0.7);  //转成base64
            var id = $("#oldPhone").val().trim();  //获取用户账号
            var imgs = data.substring(23);
            var params = '{"id":"' + id + '","image":"' + imgs + '"}';
            $.ajax({
                url : "http://localhost:8080/zhixin/upload/adminPicture.action",
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
    });//END上传图片结束


    //Start:发布文章
    $("#publish_new").on("click", function () {
        //新闻标题
        var newsTitle = $("#news_title").val().trim();
        if(newsTitle==null || newsTitle=="") {
            alert("文章标题不能为空");
        }else {
            //新闻内容
            var newsContent = editor.txt.html();
            //新闻类型
            var newsType = $("#news_type").find("option:selected").text();
            //作者名称
            var newsAuthor = $("#news_author").val().trim();
            //新闻作者id
            var newsAuthorId =  $("#news_author_id").val().trim();
            //上传图片内容
            var canvas = $("#image").cropper("getCroppedCanvas");
            if(canvas==null) {
                alert("请选择图片");
                return;
            }else {
                var newsPsrc = canvas.toDataURL("image/jpeg",0.7); //转成base64
                var imgs = newsPsrc.substring(23);
                _content = editor.txt.html();
                var news = {
                    id : "",
                    title : $("#news_title").val().trim(),
                    authorId: $("#news_author_id").val().trim(),
                    newsType: $("#news_type").find("option:selected").text(),
                    pubTime: new Date(),
                    lastUpdateTime: new Date(),
                    content : _content,
                    psrc: imgs
                };
                $.ajax({
                    url : "http://localhost:8080/zhixin/news/insertNew.action",
                    type: "post",
                    data: JSON.stringify(news),
                    contentType: "application/json;charset=UTF-8",
                    success : function (data) {
                        if(data == true) {
                            alert("发布成功");
                            $("#news_title").val("");
                            $("#image").attr("src","../images/icon_face.jpg");
                            editor.txt.html("");
                            window.location = "http://localhost:8080/zhixin/admin/homePage.action";
                        }else {
                            alert("发布失败，请稍后重试。");
                        }
                    }
                });
            }
        }
    });//End:发布文章


});


/*判断文章标题是否为空*/
function isNullTitle() {
    var title = $("#news_title").val().trim();
    if(title==null || title=="") {
        return true;
    }else {
        return false;
    }
}

/* Start:离开文章标题时 */
function titleBlur() {
    if(isNullTitle()==true) {
        alert("文章标题不能为空");
    }
}

