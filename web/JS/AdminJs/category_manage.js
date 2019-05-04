$(function () {
    initData();
});

function initData() {
    $.ajax({
        url : "http://localhost:8080/zhixin/category/getFirst.action",
        data: '{"id":"haha"}',
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            $("#select_first_class").empty();
            $("#select_second_first_class").empty();
            $("#select_third_first_class").empty();
            for(var i = 0; i < array.length; i++) {
                if(i == 0) {
                    $("#first_class_name").val(array[i]);
                    $("#select_first_class").append("<option value='" + array[i] + "' selected>" + array[i] + "</option>");
                    $("#select_second_first_class").append("<option value='" + array[i] + "' selected>"+ array[i] +"</option>");
                    $("#select_third_first_class").append("<option value='" + array[i] + "' selected>" + array[i] + "</option>");
                }else {
                    $("#select_first_class").append("<option value='"+array[i]+"'>" + array[i] + "</option>");
                    $("#select_second_first_class").append("<option value='"+array[i]+"'>"+array[i]+"</option>");
                    $("#select_third_first_class").append("<option value='"+array[i]+"'>" + array[i] + "</option>");
                }
            }
            selectSecondFirstClassChange();
            selectThirdFirstClassChange();
            selectThirdSecondClassChange();
        }
    });
}


//删除一级分类，属于一级分类的所有信息都将被删除
function deleteFirst() {
    var str = $("#first_class_name").val();
    var start = str.indexOf("[")+1;
    var end = str.indexOf("]");
    var simple = str.substring(start,end);
    alert(simple);
    $.ajax({
        url : "http://localhost:8080/zhixin/category/deleteFirstCate.action",
        data: String(simple),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            data = Number(data);
            if(data==0) {
                alert("删除一级分类成功。");
                initData();
            } else if(data == 1) {
                alert("该职位分类正在被使用，不可删除。");
            } else if(data == 2) {
                alert("删除一级分类失败，请稍后再试。");
            }
        }
    });
}

//添加一级分类
function addFirst(){
    var _first = $("#first_input").val().trim();
    var _simple = $("#simple_input").val().trim();
    if(_first==null || _first=="" || _simple==null || _simple=="") {
        alert("一级分类及其简称不可为空");
        return;
    }
    if(firstExist("add",_simple,_first)==false) {
        return;
    }
    var params = {
        simple: _simple,
        first: _first
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/category/insertCatetory.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data==true) {
                var str = "[" + _simple + "] " + _first;
                alert("添加一级分类成功");
                $("#select_first_class").append("<option value='"+ str + "'>" + str + "</option>");
                $("#select_second_first_class").append("<option value='"+ str + "'>" + str + "</option>");
                $("#select_third_first_class").append("<option value='"+ str + "'>" + str + "</option>");
                $("#first_input").val("");
                $("#simple_input").val("");
            }else {
                alert("添加一级分类失败");
            }
        }
    });
}

//修改一级分类
function modifyFirst() {
    var str = $("#first_class_name").val();
    var start = str.indexOf("[")+1;
    var end = str.indexOf("]");
    var _oldSimple = str.substring(start,end);
    var _oldFirst = str.substring(end+1,str.length);
    _oldFirst = _oldFirst.trim();
    var _newSimple = $("#first_input").val().trim();
    var _newFirst = $("#simple_input").val().trim();
    if(firstExist("modify",_newSimple,_newFirst)==false) {
        return;
    }
    var params = {
        oldSimple: _oldSimple,
        oldFirst: _oldFirst,
        newSimple: _newSimple,
        newFirst: _newFirst
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/category/modifyCateFirst.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function(data) {
            data = Number(data);
            if(data == 0) {
                alert("修改一级分类成功。");
                initData();
                $("#first_input").val();
                $("#simple_input").val();
            } else if(data == 2) {
                alert("修改一级分类失败，请稍后再试。")
            }
        }
    });
}

//删除二级分类
function deleteSecond() {
    //获取一级分类
    var value = $("#select_second_first_class option:selected").text();
    var start = value.indexOf("[")+1;
    var end = value.indexOf("]");
    var _simple = value.substring(start,end);
    var _second = $("#select_second_class option:selected").text();
    if(_second==null || _second=="") {
        alert("无二级分类，不可删除。");
        return;
    }
    var params = {
        simple: _simple,
        second: _second
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/category/deleteCateSecond.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function(data) {
            data = Number(data);
            if(data == 0) {
                alert("删除二级分类成功。");
                initData();
            } else if(data == 1) {
                alert("该二级分类正在被使用，不可删除。");
            } else if(data == 2) {
                alert("删除二级分类失败，请稍后再试。");
            }
        }
    });
}

//修改二级分类
function modifySecond() {
    //获取一级分类
    var value = $("#select_second_first_class option:selected").text();
    var start = value.indexOf("[")+1;
    var end = value.indexOf("]");
    var _simple = value.substring(start,end);
    var _oldSecond = $("#select_second_class option:selected").text();
    var _newSecond = $("#second_input").val().trim();
    //alert(_simple);
    //alert(_oldSecond);
    //alert(_newSecond);
    var array = new Array();
    $("#select_second_class option").each(function () {
        var value = $(this).val();
        array.push(value);
    });
    var count = 0;
    for(var i = 0; i < array.length; i++) {
        if(array[i] == _newSecond) {
            alert("该二级分类已存在，名字冲突。");
            return;
        }
    }
    var params = {
        simple: _simple,
        oldSecond: _oldSecond,
        newSecond: _newSecond
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/category/modifyCateSecond.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            data = Number(data);
            if(data == 0) {
                alert("修改二级分类成功。");
                initData();
            } else if(data == 2) {
                alert("修改二级分类失败，请稍后再试。")
            }
        }
    });
}

function selectFirstClassChange(){
    var value = $("#select_first_class option:selected").text();
    $("#first_class_name").val(value);
}

function selectSecondFirstClassChange() {
    var value = $("#select_second_first_class option:selected").text();
    var start =  value.indexOf("[")+1;
    var end = value.indexOf("]");
    var _simple = value.substring(start,end);
    $.ajax({
        url : "http://localhost:8080/zhixin/category/getCateSecond.action",
        data: '{"simple":"' + _simple + '"}',
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            $("#select_second_class").empty();
            for(var i = 0; i < array.length; i++) {
                if(i==0) {
                    $("#second_input").val(array[0]);
                    $("#select_second_class").append("<option value='" + array[i] + "' selected>" + array[i] + "</option>");
                }else {
                    $("#select_second_class").append("<option value='" + array[i] + "'>" + array[i] + "</option>");
                }
            }
        }
    });
}

//判断一级分类是否存在
function firstExist(operate,simple,first) {
    var array = new Array();
    $("#select_first_class option").each(function () {
        var value = $(this).val();
        array.push(value);
    });
    var cnt = 0;
    var start,end,tempSimple,tempFirst;
    for(var i = 0; i < array.length; i++) {
        start = array[i].indexOf("[")+1;
        end = array[i].indexOf("]");
        tempSimple = array[i].substring(start,end);
        tempFirst = array[i].substring(end+1,array[i].length);
        tempFirst = tempFirst.trim();
        if(tempSimple==simple || tempFirst==first) {
            cnt++;
        }
    }
    if(operate=="add" && cnt>0) {
        alert("该一级分类已存在，不可添加。");
        return false;
    }
    if(operate=="modify" && cnt>1) {
        alert("一级分类简称或全称存在冲突，请更换名称");
        return false;
    }
    return true;
}


function selectSecondClassChange(){
    var value = $("#select_second_class option:selected").val();
    $("#second_input").val(value);
}


//添加2级分类
function addSecond() {
    var _second = $("#second_input").val();
    if(_second==null || _second=="") {
        alert("二级分类名称不能为空");
        return;
    }
    var arr = new Array();
    $("#select_second_class option").each(function () {
        var value = $(this).val();
        arr.push(value);
    });

    var flag = true;
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] == _second) {
            flag = false;
            alert("该二级分类已存在，不可添加");
            break;
        }
    }
    if(flag==false) {
        return;
    }
    var value = $("#select_second_first_class option:selected").text();
    var start =  value.indexOf("[")+1;
    var end = value.indexOf("]");
    var _simple = value.substring(start,end); //简称
    var _frist = value.substring(end+1,value.length);
    var params = {
        simple: _simple,
        first: _frist,
        second: _second
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/category/insertCateSecond.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
           if(data==true) {
               alert("添加二级分类成功");
               $("#select_second_class").append("<option value='"+ _second + "'>" + _second + "</option>");
               var str = $("#select_third_first_class option:selected").val();
               if(str == value) {
                   $("#select_third_second_class").append("<option value='"+ _second + "'>" + _second + "</option>");
               }
           }else {
               alert("添加二级分类失败");
           }
        }
    });
}

//删除三级分类
function deleteThird() {
    var str = $("#select_third_first_class option:selected").val();
    var start = str.indexOf("[")+1;
    var end = str.indexOf("]");
    var _simple = str.substring(start,end);
    var _second = $("#select_third_second_class option:selected").val();
    var _third = $("#select_third_class option:selected").val();
    var params = {
        simple: _simple,
        second: _second,
        third: _third
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/category/deleteCateThree.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            data = Number(data);
            if(data == 0) {
                alert("删除三级分类成功。");
                initData();
            } else if(data == 1) {
                alert("该三级分类正在被使用，不可删除。");
            } else if(data == 2) {
                alert("删除三级分类失败，请稍后尝试。");
            }
        }
    });
}

//修改三级分类名
function modifyThird() {
    var str = $("#select_third_first_class option:selected").val();
    var start = str.indexOf("[")+1;
    var end = str.indexOf("]");
    var _simple = str.substring(start,end);
    var _second = $("#select_third_second_class option:selected").val();
    var _oldThird = $("#select_third_class option:selected").val();
    var _newThird = $("#third_input").val().trim();
    if(isBlank(_second)) {
        alert("二级分类不存在，不能修改三级分类。");
        return;
    }
    if(isBlank(_oldThird)) {
        alert("三级分类不存在，不能修改三级分类。");
        return;
    }
    if(isBlank(_newThird)) {
        alert("新三级分类名称不能为空。");
        return;
    }
    var params = {
        simple: _simple,
        second: _second,
        oldThird: _oldThird,
        newThird: _newThird
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/category/modifyCateThird.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            data = Number(data);
            if(data == 0) {
                alert("修改三级分类成功。");
                initData();
                $("#third_input").val();
            } else if(data == 2) {
                alert("修改三级分类失败，请稍后尝试。")
            }
        }
    });
}

function isBlank(data) {
    if(data==null || data=="") {
        return true;
    } else {
        return false;
    }
}
//当一级分类发生改变时
function selectThirdFirstClassChange(){
    var value = $("#select_third_first_class option:selected").val();
    var start =  value.indexOf("[")+1;
    var end = value.indexOf("]");
    var _simple = value.substring(start,end);
    $.ajax({
        url : "http://localhost:8080/zhixin/category/getCateSecond.action",
        data: '{"simple":"' + _simple + '"}',
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            $("#select_third_second_class").empty();
            for(var i = 0; i < array.length; i++) {
                if(i==0) {
                    $("#select_third_second_class").append("<option value='" + array[i] + "' selected>" + array[i] + "</option>");
                }else {
                    $("#select_third_second_class").append("<option value='" + array[i] + "'>" + array[i] + "</option>");
                }
            }
            selectThirdSecondClassChange();
        }
    });
}


function selectThirdSecondClassChange() {
    var value = $("#select_third_first_class option:selected").val();
    var start =  value.indexOf("[")+1;
    var end = value.indexOf("]");
    var _simple = value.substring(start,end);
    var _first = value.substring(end+1,value.length);
    var _second = $("#select_third_second_class option:selected").val();
    var params = {
        simple: _simple,
        first: _first,
        second: _second
    };
    $.ajax({
        url : "http://localhost:8080/zhixin/category/getCateThird.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            var array = eval(data);
            $("#select_third_class").empty();
            for(var i = 0; i < array.length; i++) {
                if(i==0) {
                    $("#select_third_class").append("<option value='" + array[i] + "' selected>" + array[i] + "</option>");
                }else {
                    $("#select_third_class").append("<option value='" + array[i] + "'>" + array[i] + "</option>");
                }
            }
        }
    });
}

function addThird() {
    var _third = $("#third_input").val().trim();
    if(_third==null || _third=="") {
        alert("三级分类不能为空");
        return;
    }
    var arr = new Array();
    $("#select_third_class option").each(function () {
        var val = $(this).val();
        arr.push(val);
    });
    var flag = true;
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] == _third) {
            flag = false;
            alert("该分类已存在，不可添加");
            break;
        }
    }
    if(flag==false) return;
    var value = $("#select_third_first_class option:selected").val();
    var start = value.indexOf("[")+1;
    var end = value.indexOf("]");
    var _simple = value.substring(start,end);
    var _first = value.substring(end+1,value.length);
    var _second = $("#select_third_second_class option:selected").val();
    var params = {
        simple : _simple,
        first : _first,
        second : _second,
        third : _third
    }

    $.ajax({
        url : "http://localhost:8080/zhixin/category/insertCateThird.action",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        async: false,
        type: "post",
        success: function (data) {
            if(data==true) {
                alert("添加三级分类成功");
                $("#select_third_class").append("<option value='" + _third + "'>" + _third + "</option>");
            }else {
                alert("添加三级分类失败，请稍后尝试");
            }
        }
    });
}