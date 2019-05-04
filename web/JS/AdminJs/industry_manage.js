$(function () {
   initData();
});

//初始化类型
function initData() {
    $.ajax({
        url : "http://localhost:8080/zhixin/industry/getAllIndustry.action",
        data: '{"id":"haha"}',
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success:function (data) {
            var obj = eval(data);
            $("#industry_manage_div").empty();
            for(var i = 0; i < obj.length; i++) {
                $("#industry_manage_div").append('  <div class="first_class">\n' +
                    '                <label class="first_name" onclick="showHiddenDiv(this)" id="'+ obj[i] +'">' + obj[i] + '</label>\n' +
                    '            </div>');
            }

            $("#industry_manage_div").append('  <div class="first_class">\n' +
                '                <label class="first_name" onclick="addFrist(this)">' + '➕' + '</label>\n' +
                '            </div>');

        }
    });
}

function addFrist(obj) {
    var first = prompt("请输入要添加的一级分类名称");
    if(first != null) {
        var params = '{"id":"' + first + '"}';
        $.ajax({
            url: "http://localhost:8080/zhixin/industry/existFirst.action",
            data: params,
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                if(data==true) {
                    initData();
                }else {
                    alert("该一级分类已存在");
                }
            }
        })
    }
}

/*关闭hiddenDiv*/
function closeHiddenDiv(){
    $("#hidden_div").css("display","none");
}

function showHiddenDiv(obj) {
    var id = obj.id;
    $("#hidden_div").css("display","block");
    $("#first_class_name").html(id);
    $("#newName").val("");
    $("#type").val("second");
    initSecond(id);
}

//删除一级分类
function deleteFirstClass() {
    var firstLevel = $("#first_class_name").html();
    $.ajax({
        url: "http://localhost:8080/zhixin/industry/deleteFirstLevel.action",
        data: String(firstLevel),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            data = Number(data);
            if(data == 0) {
                alert("删除一级分类[" + firstLevel + "]成功。");
                closeHiddenDiv();
                initData();
            } else if(data == 1) {
                alert("一级分类[" + firstLevel + "]正在被使用不能删除。");
            } else {
                alert("删除一级分类[" + firstLevel + "]失败，请稍后尝试");
            }
        }
    });
}

function initSecond(param) {
    var data = {
        "id": param
    }
    $("#second_class").empty();
    $.ajax({
        url: "http://localhost:8080/zhixin/industry/getSecond.action",
        data: JSON.stringify(data),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success:function (data) {
            var obj = eval(data);
            if(obj.length!=0) {
                for(var i = 0; i < obj.length; i++) {
                    $("#second_class").append('<label class="second_name" id="'+obj[i]+'" onclick="operateSecond(this)">' + obj[i] + '</label>');
                }
                $("#second_class").append('<label class="second_name" id="addSecond" onclick="addSecondClass()">➕</label>');
                $("#second_class_name").html(obj[0]);
            }else{
                $("#second_class").append('<label class="second_name" id="addSecond" onclick="addSecondClass()">➕</label>');
                $("#second_class_name").html("未选中选项");
            }
        }
    });
}

//操作二级分类
function operateSecond(obj) {
    var id = obj.id;
    //alert(id);
    $("#type").val("second");
    $("#second_class_name").html(id);
    $("#newName").val("");
    $("#updateBtn").css("margin-left","15px");
    $("#deleteBtn").css("display","inline");
}


function addSecondClass(){
    var _second = prompt("添加二级分类：");
    if(_second==null && _second=="") {

    }else {
        var _first = $("#first_class_name").html().trim();
        var params = {
            first: _first,
            second: _second
        }
        $.ajax({
            url: "http://localhost:8080/zhixin/industry/insertSecond.action",
            data: JSON.stringify(params),
            contentType: "application/json;charset=UTF-8",
            async: false,
            type: "post",
            success: function (data) {
                if(data==true) {
                    initSecond(_first);
                }else {
                    alert("添加失败");
                }
            }
        });
    }
}

//修改一级分类
function modifyFirstClass() {
    var firstLeval = $("#first_class_name").html();
    $("#type").val("first");
    $("#second_class_name").html("修改一级分类[" + firstLeval + "]");
    $("#newName").val(firstLeval);
    $("#updateBtn").css("margin-left","110px");
    $("#deleteBtn").css("display","none");
}

//修改一级分类或二级分类
function modifyClass() {
    var type = $("#type").val().trim();  //表明修改的类型
    var params = null;
    var _url = "http://localhost:8080/zhixin/";
    //修改一级分类
    if(type == "first") {
        var _oldFirstName = $("#first_class_name").html();
        var _newFirstName = $("#newName").val().trim();
        //alert(_oldFirstName);
        //alert(_newFirstName);
        params = {
            oldFirstName : _oldFirstName,
            newFirstName : _newFirstName
        };
        _url = _url + "industry/modifyFirstClass.action";
    } else {
        var _firstName = $("#first_class_name").html();
        var _oldSecondName = $("#second_class_name").html();
        var _newSecondName = $("#newName").val().trim();
        //alert(_firstName);
        //alert(_oldSecondName);
        //alert(_newSecondName);
        params = {
            firstName: _firstName,
            oldSecondName:  _oldSecondName,
            newSecondName: _newSecondName
        };
        _url = _url + "industry/modifySecondClass.action";
    }
    $.ajax({
        url: _url,
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var result = Number(data);
            if(result == 0) {
                if(type == "first") {
                    alert("修改一级分类成功");
                    closeHiddenDiv();
                    initData();
                } else {
                    alert("修改二级分类成功");
                    initSecond(_firstName);
                }
            } else if(result == 1) {
                if(type=="first") {
                    alert("该一级分类已存在。");
                } else {
                    alert("该二级分类已存在。");
                }
            } else {
                alert("修改分类失败，请稍后尝试。")
            }
        }
    });
}

//删除2级分类
function deleteClass() {
    var _firstName = $("#first_class_name").html();
    var _secondName = $("#second_class_name").html();
    //alert(_firstName);
    //alert(_secondName);
    params = {
        first: _firstName,
        second: _secondName
    };
    $.ajax({
        url: "http://localhost:8080/zhixin/industry/deleteSecond.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            data = Number(data);
            if(data == 0) {
                alert("删除二级分类成功");
                initSecond(_firstName);
            } else if(data == 1) {
                alert("该二级分类正在被使用，不可以被删除。");
            } else {
                alert("删除二级分类失败，请稍后再试。");
            }
        }
    });
}


