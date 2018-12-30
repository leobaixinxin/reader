var fs = require("fs");
exports.get_content = function(){
    var content = fs.readFileSync("./mock/test.json","utf-8");
    return content;
}
exports.get_index_data = function(){
    var content = fs.readFileSync("./mock/home.json","utf-8");
    return content;
}
exports.get_book_data = function(id){
    if(!id){
        id="18218";
    }
    var content = fs.readFileSync("./mock/book/"+id+".json","utf-8");
    return content;
}


exports.get_search_result = function(start,end,keyword){
    return function(cb){
        console.log(cb);
        var http = require("http");
        var qs = require("querystring");
        var data = {
            s:keyword,
            start:start,
            end:end
        };
        var content = qs.stringify(data);
        var http_request = {
            host:'dushu.xiaomi.com',
            port:80,
            path:'/store/v0/lib/query/onebox?'+content
        };

        var req_obj = http.request(http_request,function(_res){
             var content = '';
             _res.setEncoding("utf-8");
             _res.on("data",function(chunk){
                content+=chunk
             });
             _res.on("end",function(){
                 cb(null,content);
             })
        });

        req_obj.on('error',function(){
            
        });

        req_obj.end();


    }

    // var content = fs.readFileSync("./mock/test.json","utf-8");
    // return content;
}