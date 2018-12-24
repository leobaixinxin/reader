var koa = require("koa");
var controller = require("koa-route");
var app = koa();

var views = require("co-views");
var render = views('./view',{
    map:{html:'ejs'}
});

var koa_static = require("koa-static-server");

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

app.listen(3003);

console.log("Koa serve is starting at 3003 port");
