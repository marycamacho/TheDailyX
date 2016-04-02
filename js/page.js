/**
 * Created by mary on 3/31/2016.
 */

$(function(){
    var data = getData();

    $(".square").each(function(){
        var this$=$(this);
        //console.log(this$.data());
        var cellID=this$.data().cell;
        if (data[cellID]){
            if (data[cellID]==1){
                this$.addClass('single');
            } else {
                this$.addClass('double');
            }
        }
    });

    $(".square").click(function () {
        var this$=$(this);
        if (this$.hasClass('single')){
            this$.addClass('double').removeClass('single');
        } else if (this$.hasClass('double')){
            this$.removeClass('double');
        } else {
            this$.addClass('single');
        }
    });


});

