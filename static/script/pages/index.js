$.get("/ajax/index",function (d) {
        // 设置屏幕宽度
        var screenWidth = $(window).width();
        if(screenWidth < 320){
            screenWidth = 320;
        }
        var swipeTabWidth = $(".swipe_tab").width();
        new Vue({
            el:"#app",
            data:{
                screenWidth:screenWidth,
                doubleScreenWidth:screenWidth*2,
                swipeTabWidth:swipeTabWidth,

                top:d.items[0].data.data,
                hot:d.items[1].data.data,
                recommend:d.items[2].data.data,
                female:d.items[3].data.data,
                male:d.items[4].data.data,
                free:d.items[5].data.data,
                topic:d.items[6].data.data,

                duration:0,
                position:0,
                header_duration:0,
                header_position:0,
                tab_1_class:'swipe_tab_on',
                tab_2_class:''
            },
            methods: {
                tabSwitch(pos){
                    this.duration = 0.5;
                    this.header_duration = 0.5;
                    if(pos == 0){
                        this.position = 0;
                        this.header_position = 0;
                        this.tab_1_class = "swipe_tab_on";
                        this.tab_2_class ="";
                    }else{
                        this.position = (-this.screenWidth);
                        this.header_position = this.swipeTabWidth/2;
                        this.tab_1_class = "";
                        this.tab_2_class ="swipe_tab_on";
                    }
                }
            },
        })
    },
    "json"
);