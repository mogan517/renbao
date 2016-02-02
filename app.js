var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var session = require('express-session');
var ejs = require('ejs');
var io = require('socket.io'),
  connect = require('connect');


var routes = require('./backend/control/routes.js');
app = express(),
server = require('http').createServer(app);
var chat_room = require('socket.io')(server);
 // var SkyRTC = require('skyrtc').listen(server);
// io.on("conection",function(socket){
// 	　socket.on("chat",function(message){
// 		socket.broadcast.emit("message",message);
// 	});	
//  	   socket.emit("message","欢迎加入群组聊天")
// 	});
chat_room.sockets.on('connection', function (socket) {
  socket.emit('entrance', {message: '欢迎加入定损群组聊天!'});

  socket.on('disconnect', function  () {
    chat_room.sockets.emit('exit', {message: '有一位朋友离开了聊天.'});
  });

  socket.on('chat', function  (data) {
    chat_room.sockets.emit('chat', {message: '# ' + data.message});
  });

  chat_room.sockets.emit('entrance', {message: '有一位新朋友加入聊天室.'});
});

// SkyRTC.rtc.on('new_connect', function(socket) {
// 	console.log('创建新连接');
// });

// SkyRTC.rtc.on('remove_peer', function(socketId) {
// 	console.log(socketId + "用户离开");
// });

// SkyRTC.rtc.on('new_peer', function(socket, room) {
// 	console.log("新用户" + socket.id + "加入房间" + room);
// });

// SkyRTC.rtc.on('socket_message', function(socket, msg) {
// 	console.log("接收到来自" + socket.id + "的新消息：" + msg);
// });

// SkyRTC.rtc.on('ice_candidate', function(socket, ice_candidate) {
// 	console.log("接收到来自" + socket.id + "的ICE Candidate");
// });

// SkyRTC.rtc.on('offer', function(socket, offer) {
// 	console.log("接收到来自" + socket.id + "的Offer");
// });

// SkyRTC.rtc.on('answer', function(socket, answer) {
// 	console.log("接收到来自" + socket.id + "的Answer");
// });

// SkyRTC.rtc.on('error', function(error) {
// 	console.log("发生错误：" + error.message);
// });

var path = require('path');
var wsServer=require('./backend/control/wsServer.js').listen(server);

app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'frontend'));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'jiami',resave:true,saveUninitialized:true}));
app.use(function(req,res,next){
    next();
});
app.use(express.static(path.join(__dirname, 'frontend')));

app.use(routes);
server.listen(3000);
