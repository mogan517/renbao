var wsServer="ws://levonshark.cn:3000";
var iceServer = {
    "iceServers": [{
        "url": "turn:levonshark.cn",
        "username": "ling",
        "credential": "ling1234"
    }]
};
var httpServer={
    ip:"levonshark.cn:3000",
    url:"http://levonshark.cn:3000/",
};


var wsServer1="ws://172.13.1.31:3000";
var iceServer1 = {
};
var httpServer1={
    ip:"172.13.1.31:3000",
    url:"http://172.13.1.31:3000/",
};

estimate.constant('iceServer',iceServer1);
estimate.constant('wsServer',wsServer1);
estimate.constant('httpServer',httpServer1);
