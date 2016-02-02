    var rtc =  function(){
        // 与信令服务器的WebSocket连接
        var socket = new WebSocket("ws://levonshark.cn:3000");

        // stun和turn服务器
        var iceServer = {
            "iceServers": [{
                "url": "turn:levonshark.cn",
                "username": "ling",
                "credential": "ling1234"
            }]
        };

    var PeerConnection = (window.PeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection || window.mozRTCPeerConnection);
    var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    var nativeRTCIceCandidate = (window.mozRTCIceCandidate || window.RTCIceCandidate);
    var nativeRTCSessionDescription = (window.mozRTCSessionDescription || window.RTCSessionDescription); // order is very important: "RTCSessionDescription" defined in Nighly but useless
        // 创建PeerConnection实例 (参数为null则没有iceserver，即使没有stunserver和turnserver，仍可在局域网下通讯)
        var pc = new PeerConnection(iceServer);

        // 发送ICE候选到其他客户端
        pc.onicecandidate = function(event){
            if (event.candidate !== null) {
                socket.send(JSON.stringify({
                    "event": "_ice_candidate",
                    "data": {
                        "candidate": event.candidate
                    }
                }));
            }
        };

        // 如果检测到媒体流连接到本地，将其绑定到一个video标签上输出
        pc.onaddstream = function(event){
            document.getElementById('remoteVideo').src = URL.createObjectURL(event.stream);
        };

        // 获取本地音频和视频流
        getUserMedia.call(navigator,{
            "audio": true,
            "video": false 
        }, function(stream){
              pc.addStream(stream);
           }, function(error){
              //处理媒体流创建失败错误
              console.log('getUserMedia error: ' + error);
        });

        socket.onopen = function() {
            socket.send(JSON.stringify({
                "eventName": "__join",
                "data": {
                    "id":"ss",
                }
            }));
        };
        //处理到来的信令
        socket.onmessage = function(event){
            var json = JSON.parse(event.data);
            console.log('onmessage: ', json);
            //如果是一个ICE的候选，则将其加入到PeerConnection中，否则设定对方的session描述为传递过来的描述
            if( json.event === "_ice_candidate" ){
                pc.addIceCandidate(new nativeRTCIceCandidate(json.data.candidate));
            } else {
                pc.setRemoteDescription(new nativeRTCSessionDescription(json.data.sdp));
                // 如果是一个offer，那么需要回复一个answer
                if(json.event === "_offer") {
                    pc.createAnswer(
                        function(desc){
                           pc.setLocalDescription(desc);
                           socket.send(JSON.stringify({ 
                               "event": "_answer",
                               "data": {
                                   "sdp": desc
                               }
                           }));
                        },function (error) {
                            console.log('Failure callback: ' + error);
                        });
                }
            }
        };
    };
