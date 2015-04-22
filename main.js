


var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request'); //https://github.com/request/request
var iconv = require('iconv-lite');


//
var testHtml = fs.readFileSync('TargetList.html','utf8');

//console.log(testHtml);

var url = 'http://www.soccerline.co.kr/slboard/list.php?code=soccerboard'


var requestOptions  = { encoding: null, uri: url};

request(requestOptions, function(error, response, body) {
    var utf8String = iconv.decode(body, 'euc-kr');
    //console.log(utf8String);


$ = cheerio.load(utf8String);
//console.log($.html());
//console.log($('.te1').html());
//console.log($('#main_soccer').find('a');
//console.log($('#main_soccer').find('a').attr('href'));

//
$('#main_soccer td a').each(function(i, elem) {
  console.log($(this).text());
  console.log($(this).attr('href'));
});


});



//   request(url, function(err, resp, body) {
//      if (err)   throw err;
//     //var bodyWithCorrectEncoding = iconv.decode(body, 'utf-8');
//  // console.log(bodyWithCorrectEncoding);

// $ = cheerio.load(body);
// $ = cheerio.load(body.toString('utf8'));
// //console.log($.html());
// //console.log($('.te1').html());
// //console.log($('#main_soccer').find('a');
// //console.log($('#main_soccer').find('a').attr('href'));

// //
// $('#main_soccer td a').each(function(i, elem) {
//   console.log($(this).text());
//   console.log($(this).attr('href'));
// });

//  });
