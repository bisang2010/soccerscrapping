    var cheerio = require('cheerio');
    var fs = require('fs');
    var request = require('request'); //https://github.com/request/request
    var iconv = require('iconv-lite');
    var express = require("express");
    var bodyParser = require("body-parser");
    var path = require('path');

    var app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static('public'));

    app.get('/',function(req,res){
        res.sendfile("SoccerLineMain.html");
    });

    app.get('/SoccerLineList',function(req,res){
        //console.log(req.param('msg'));
        res.sendfile("SoccerLineList.html");
    });

    app.get('/SoccerLineNewList', function(req, res){
        res.sendfile("SoccerLineNewList.html");
    });

    app.post('/RunWebScrapping',function(req,res){
        // var user_name=req.body.user;
        // var password=req.body.password;
        // console.log("web scrapping start");
        GetParsingData(req,res);
    });
    
    app.post('/RunNewListWebScrapping',function(req,res){
        // var user_name=req.body.user;
        // var password=req.body.password;
        // console.log("web scrapping start");
        GetParsingNewList(req,res);
    });

    //
    // best list WebScrapping
    //
    function WebScrapping(url, callback){
        var requestOptions = {encoding: null, uri: url};

        request(requestOptions, function(error, response, body) {

            var strRetData = "";
            var utf8String = iconv.decode(body, 'euc-kr');
            var res = /content1 = "<table.*<\/table>/ig;
            var parsing = res.exec(utf8String);

            while(parsing) {
                $ = cheerio.load(parsing[0]);
                $('table td a').each(function(i, elem) {
                    // console.log($(this).text());
                    // console.log($(this).attr('href'));
                    strRetData = strRetData + $(this).text() + "|";
                    strRetData = strRetData + $(this).attr('href') + "#";
                });
                strRetData = strRetData + "@";
                var parsing = res.exec(utf8String);
            }

            callback(strRetData);

        });
    }

    function GetParsingData(req,res){
        WebScrapping(req.body.url,function CallBack(data){
            res.send(data);
        });
    }

    //
    // new list WebScrapping
    //
    function NewListWebScrapping(url, callback){        

        var requestOptions = {encoding: null, uri: url};

        request(requestOptions, function(error, response, body) {

            var strRetData = "";
            var utf8String = iconv.decode(body, 'euc-kr');
            
            $ = cheerio.load(utf8String);
            $('table td a').each(function(i, elem) {
                 if($(this).attr('href').indexOf("view.php") != -1){
//                    console.log($(this).parent('td').text());
//                    console.log($(this).attr('href'));
                    strRetData = strRetData + $(this).parent('td').text() + "|";
                    strRetData = strRetData + $(this).attr('href') + "#";
                 }
            });           

            callback(strRetData);

        });    
    }
    
    function GetParsingNewList(req,res){
        NewListWebScrapping(req.body.url,function CallBack(data){
            res.send(data);
        });
    }

    //
    // server start
    //
    app.listen(7778,function(){
      console.log("Started on PORT 7778");
    })
