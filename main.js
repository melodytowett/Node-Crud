var database_gateway = require('./database');
var http_request = require('./http_request');
var product = require('./product');

const http = require('http');
const hostname = '127.0.0.1';
const port = '8080';

const server = http.createServer((req,res)=>{
    var dg = new database_gateway();
    var httpRequest = new http_request(req);
    var products = new product(dg);
    
    var payload="";
    req.on('end',function () {
        function callBack(err,result){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            var response = {}

            if (err) {
                response["error"] = err.message;
            }else{
                response["error"] = result;
            }
            res.write(JSON.stringify(response,null,4));
            res.end();
        }
        resourceId = httpRequest.resourceId;
        switch(req.method){
            case "POST":
            jsonData = JSON.parse(payload);
            products.insertRecord(jsonData,callBack);
            break;
            case "PUT":
                jsonData = JSON.parse(payload);
                products.updateRecord(resourceId,jsonData,callBack);
                break;
            case "DELETE":
                products.deleteRecord(resourceId,callBack);
                break;

            case "GET":
                products.getRecords(resourceId,callBack);
                break;
        }
    })
})
server.listen(port,hostname,()=>{
    console.log(`Server runnit at http://${hostname}:${port}/`)
})