/**
 * Created by mary on 3/31/2016.
 */

$(function(){
    var data = getData();
    var allSquares$ = $(".square");

    allSquares$.each(function(){
        var this$=$(this);
        var cellID=this$.data().cell;
        if (data[cellID]){
            if (data[cellID]==1){
                this$.addClass('single');
            } else {
                this$.addClass('double');
            }
        }
    });

    allSquares$.click(function () {
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

