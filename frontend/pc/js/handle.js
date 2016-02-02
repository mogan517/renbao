angular.module('zhang.handle', [])

.factory('Handle', function() {
	var base={
			//url:"http://192.168.1.110:8080/P2P/api/",
			url:"http://101.200.122.114:8080/picc/api/",
			//url:"http://192.168.0.100:8080/P2P/api/",
			//url:"http://121.41.55.197:8080/P2P/api/",
			pagesize:20,
			pageno:1
	};
	return {ajax:function(action,token,parms,back,http){
		parms.Token=token;
		//+'?username='+parms.username+'&password='+parms.password
		//http.post(base.url+action,{"username":"skywolf114","password":"111111"},parms)
	    http({
		method:'POST',
		url:base.url+action,
		params:parms
		}).success(function(response){
	    	back(response);
	    });
	}};
});