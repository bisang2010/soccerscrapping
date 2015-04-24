


var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request'); //https://github.com/request/request
var iconv = require('iconv-lite');


//var testHtml = fs.readFileSync('TargetList.html','utf8');

//console.log(testHtml);

var url = 'http://www.soccerline.co.kr/slboard/list.php?code=locker'
var requestOptions  = { encoding: null, uri: url};

request(requestOptions, function(error, response, body) {

  var utf8String = iconv.decode(body, 'euc-kr');
  var res = /content1 = "<table.*<\/table>/ig;
  var parsing = res.exec(utf8String);

  while(parsing) {
    // console.log(parsing[0]);

    console.log("\n>>>>>>>>>>>>>결과<<<<<<<<<<<<<<<<<");
    $ = cheerio.load(parsing[0]);
    $('table td a').each(function(i, elem) {
      console.log($(this).text());
      console.log($(this).attr('href'));
    });

    var parsing = res.exec(utf8String);
  }

// $ = cheerio.load(utf8String);
// //console.log($.html());
// //console.log($('.te1').html());
// //console.log($('#main_soccer').find('a');
// //console.log($('#main_soccer').find('a').attr('href'));
//
// //
// $('#main_soccer td a').each(function(i, elem) {
//   console.log($(this).text());
//   console.log($(this).attr('href'));
// });


});
