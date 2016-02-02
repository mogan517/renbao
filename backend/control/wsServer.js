var WebSocketServer = require('ws').Server;
wsUserMap={};
module.exports.listen = function(server) {
    wss = new WebSocketServer({server:server});
    
    // 有socket连入
    wss.on('connection', function(ws) {
        console.log('connection');
    
        // 转发收到的消息
        ws.on('message', function(message) {
            var json = JSON.parse(message);
            console.log(json.event);
            if(json.event =="__join"){
                wsUserMap[json.data.user]=ws;
                console.log(json.data.user);
            }
            if(json.event =="__estimate"){
                wsUserMap[json.user].send(json.data,function(error){
                    console.log('send message error',error);
                });
            }
        });
    });
	return wss;
};
