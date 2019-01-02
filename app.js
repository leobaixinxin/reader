var koa = require("koa");
var controller = require("koa-route");
var app = koa();
var service = require("./service/webAppService");
var views = require("co-views");
var render = views('./view',{
    map:{html:'ejs'}
});

var koa_static = require("koa-static-server");
var qs = require("querystring");

app.use(koa_static({
    rootDir:"./static",
    rootPath:"/static",
    maxage:0
}))


app.use(controller.get("/route_test",function*(){
    console.log(this);
    this.set("Cache-Control","no-cache");
    this.body = "hello koa";
}));

app.use(controller.get("/ejs_test",function*(){
    this.set("Cache-Control","no-cache");
    this.body = yield render("test1",{test:"ejs_test"});
}));


app.use(controller.get("/",function*(){
    this.set("Cache-Control","no-cache");
    this.body = yield render("index");
}));
app.use(controller.get("/search",function*(){
    this.set("Cache-Control","no-cache");
    this.body = yield render("search");
}));
app.use(controller.get("/reader",function*(){
    this.set("Cache-Control","no-cache");
    this.body = yield render("reader");
}));

app.use(controller.get("/male",function*(){
    this.set("Cache-Control","no-cache");
    this.body = yield render("male",{nav:"男生频道"});
}));

app.use(controller.get("/book",function*(){
    this.set("Cache-Control","no-cache");
    var params = qs.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    if(!bookId){
        bookId = "";
    }
    this.body = yield render("book",{nav:"书籍详情",bookId:bookId});
}));

app.use(controller.get("/api_test",function*(){
    this.set("Cache-Control","no-cache");
    this.body = service.get_content();
}));

app.use(controller.get("/ajax/search",function*(){
    this.set("Cache-Control","no-cache");
    var qs = require("querystring");
    var params = qs.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_result(start,end,keyword);

    console.log(this.body);
}));

app.use(controller.get("/ajax/index",function*(){
    this.set("Cache-Control","no-cache");
    this.body = service.get_index_data();
}));

app.use(controller.get("/ajax/chapter",function*(){
    this.set("Cache-Control","no-cache");
    this.body = service.get_chapter_data();
}));

app.use(controller.get('/ajax/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_male_data();
}));

app.use(controller.get("/ajax/book",function*(){
    this.set("Cache-Control","no-cache");
    var params = qs.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id){
        id="";
    }
    

    this.body = service.get_book_data(id);
}));
app.use(controller.get("/ajax/chapter/data",function*(){
    this.set("Cache-Control","no-cache");
    var params = qs.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id){
        id="";
    }
    this.body = service.get_chapter_content_data(id);
}));

app.listen(3003);

console.log("Koa serve is starting at 3003 port");
