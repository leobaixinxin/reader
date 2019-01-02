var id = location.href.split("?id=").pop();
$.get("/ajax/book?id="+id,function (d) {
    var screenWidth = $(window).width();
    if(screenWidth < 320){
        screenWidth = 320;
    }
    var d = $.extend(d,{
        screenWidth:screenWidth
    });
    new Vue({
        el:"#app",
        data:d,
        methods: {
            
        },
    })
},"json");