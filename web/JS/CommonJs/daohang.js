/**
 *
 */

$(function(){
    $('.container').on('mouseenter',function(){
        $(".nav_right").removeClass('hide');
    }).on('mouseleave',function(){
        $(".nav_right").addClass('hide');
        $(".sub").addClass('hide');
    }).on("mouseenter",'li',function(e){
        var li_data = $(this).attr('data-id');
        var num = Number(li_data);
        var temp = (num-2)*35;
        var str = String(temp) + "px";
        $(".nav_right").css("margin-top",str);
        $(".sub").addClass('hide');
        $('.sub[data-id="' + li_data + '"]').removeClass('hide');
        if(num==0) {
            $(".nav_left").css("overflow","hidden");
        }
    });
});




