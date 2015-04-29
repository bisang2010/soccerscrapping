var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request'); //https://github.com/request/request
var iconv = require('iconv-lite');

var express   =     require("express");
var bodyParser  =    require("body-parser");
var app       =     express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
  res.sendfile("index.html");
});

app.post('/RunWebScrapping',function(req,res){
  // var user_name=req.body.user;
  // var password=req.body.password;
  // console.log("web scrapping start");
  GetParsingData(req,res);
});

//web srcrapping
function WebScrapping(url, callback){
  var requestOptions = {encoding: null, uri: url};

  request(requestOptions, function(error, response, body) {

    var strRetData = "";
    var utf8String = iconv.decode(body, 'euc-kr');
    var res = /content1 = "<table.*<\/table>/ig;
    var parsing = res.exec(utf8String);

    while(parsing) {
      // console.log("\n>>>>>>>>>>>>>결과<<<<<<<<<<<<<<<<<");
      $ = cheerio.load(parsing[0]);
      $('table td a').each(function(i, elem) {
        // console.log($(this).text());
        // console.log($(this).attr('href'));
        strRetData = strRetData + $(this).text() + "|";
        strRetData = strRetData + $(this).attr('href') + "#";
      });
      var parsing = res.exec(utf8String);
    }

    callback(strRetData);

  });
}

function GetParsingData(req,res){
  WebScrapping("http://www.soccerline.co.kr/slboard/list.php?code=locker",function CallBack(data){
    res.send(data);
  });
}

//server start
app.listen(3000,function(){
  console.log("Started on PORT 3000");
})
