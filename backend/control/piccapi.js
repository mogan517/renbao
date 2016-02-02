var express = require('express');
var router = express.Router();
var http = require('http');
var request=require('request');
var equal = require('assert').equal;
var querystring = require('querystring');
var base_Path='http://101.200.122.114:8080/picc/api';

router.param(['body'], function (req, res, next, value) {
  console.log('CALLED ONLY ONCE with', value);
  next();
});

/* GET users listing. */
router.get('/', function(reqs, ress, next){
	
	var bo = JSON.parse(reqs.query.body);
	var action=bo.action;
	var parm=querystring.stringify(bo.body);
	console.log(reqs.query);
	console.log(parm);
	var url=action+'?'+parm;
	console.log(url);
	var options = {
			host: '101.200.122.114',
			port: 8080,
			path: '/picc/api'+url,
			method: 'GET',
			headers:{
				'accept': '*/*',
				'content-type': "application/atom+xml",
				'accept-encoding': 'gzip, deflate',
				'accept-language': 'en-US,en;q=0.9',
				'user-agent': 'nodejs rest client'
			}
		};
 
	var req = http.request(options, function (res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.on('data',function (chunk) {
			ress.send(JSON.parse(chunk));
		});
	});
	req.write(parm+'\n');
	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	req.end();
	  res.render('pc/home.html')
});

module.exports = router;