/**
 * Created by mary on 3/31/2016.
 */

$(function(){
    $(".square").click(function () {
        var this$=$(this);
        if (this$.hasClass('single')){
            this$.addClass('double').removeClass('single');
        } else if (this$.hasClass('double')){
            this$.removeClass('double');
        } else {
            this$.addClass('single');
        }
    })


});

