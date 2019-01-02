var sex = location.href.split('/').pop();

$.get('/ajax/' + sex,function(d){
    var screenWidth = $(window).width();
    if(screenWidth < 320){
        screenWidth = 320;
    }
    var d = $.extend(d,{
        screenWidth:screenWidth,
        doubleScreenWidth:screenWidth*2
    }); 
	new Vue({
	  el: '#app',
	  data: d
	});
},'json');