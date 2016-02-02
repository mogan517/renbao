var express = require('express');
var cors = require('cors');
var router = express.Router();
var user = require('../dao/UserDao.js');
router.use(cors());
/* GET home page. */
router.get('/', cors(),function(req, res, next) {

    res.render('pc/home.html')
});
router.route('/login')
.get(function(req,res,next){
    res.render('pc/login')
})
.post(function(reqs,ress){
    console.log(req.parm);
    var id="levon";
    var bo = JSON.parse(reqs.query.body);
    var parm=querystring.stringify(bo.body);
       
            var options = {
            host: '101.200.122.114',
            port: 8080,
            path: '/picc/api/user/login?'+parm,
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
            var r=JSON.parse(chunk);
            reqs.cookie('Token',r.token);
            ress.redirect('/');
        });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
        
    
    res.redirect('/login');
})
router.get('/estimate', function(req, res, next) {
    res.render('pc/damageEstimate');
});
router.route('/regist')
.get(function(req,res,next){
    res.render('pc/register');
})
.post(function(req,res){
    console.log(req.body);
    var id="levon";
    var pass="levon";
    if(req.body.Name==id&& req.body.Password==pass){
        res.redirect('/')
        return;
    }
    res.redirect('/login')
})

router.get('*', function(req, res) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("Content-Type", "application/json;charset=utf-8");
       
    });

router.get('/logout', function(req, res, next) {
    req.session.user=null;
    res.redirect('/login')
});
router.get('/api',function(reqs,ress,next){
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
})
function islogin(req,res){
    if(!req.session.user){
        return res.redirect('/login');
    }
}
module.exports = router;