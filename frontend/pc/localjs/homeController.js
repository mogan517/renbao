estimate.controller('allUsers',function($scope,$http,wsServer) {
    {
        $http.get('/RestAllUser').success(function(users, status, headers, config) {
            $scope.users=users;
        }).error(function(data, status) {
            alert(data);
        });
        var map = new AMap.Map('container',{
                resizeEnable: true,
                zoom: 10,
                center: [121.480983, 31.2258]
        });
        var marker = new AMap.Marker({
                position: [121.480983, 31.2258]
        });
        marker.setMap(map);
    }
    $scope.estimate=function(user){
        var socket = new WebSocket(wsServer);
        socket.onopen = function() {
            socket.send(JSON.stringify({
                "event": "__join",
                "data": {
                    "user":user.id,
                }
            }));
        };
    }
})
