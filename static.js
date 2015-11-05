var http = require('http');
var fs = require('fs');
module.exports = function(){
    return  function(request, response){
        var htmlEnd = ".html";
        var cssEnd = ".css";
        var jsEnd = ".js";
        var imageEnd = [".gif", ".png", ".jpg", ".jpeg", ".png"];
        if(request.url === '/'){
            fs.readFile('./views/index.html', 'utf8', function (errors, contents){
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(contents);
                response.end();
            });
        }
        else if (request.url.includes(htmlEnd)){
            fs.readFile('./views'+request.url, 'utf8', function (errors, contents){
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(contents);
                response.end();
            });
        }
        else if(request.url.includes(cssEnd)){
            fs.readFile("."+request.url, 'utf8', function (errors, contents){
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.write(contents);
                response.end();
            });
        }
        else if(request.url.includes(jsEnd)){
            fs.readFile("."+request.url, 'utf8', function (errors, contents){
                response.writeHead(200, {'Content-Type': 'script/js'});
                response.write(contents);
                response.end();
            });
        }
        else if(request.url.includes("images")){
            for(var i=0; i<imageEnd.length; i++){
                if(request.url.includes(imageEnd[i])){
                    fs.readFile("."+request.url, function (errors, contents){
                        response.writeHead(200, {'Content-Type': 'image/'+imageEnd[i]});
                        response.write(contents);
                        response.end();
                    });
                }
            }
        }
        else{
                response.writeHead(404);
                response.end('File not found!!!');
            }
    }
}
