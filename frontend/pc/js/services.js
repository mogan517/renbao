angular.module('zhang.services', [])

.factory('Chats', function(Handle,$http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    login:function(parms,back){
    	Handle.ajax("user/login","",parms,back,$http);
    },
    user:function(token,back){
    	Handle.ajax("user/get",token,{id:''},back,$http);
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
	updatePwd:function(parms,back){
		Handle.ajax("user/resetPasswordByCardId","",parms,back,$http);
	},
	getUser:function(token,back){
    	Handle.ajax("usermanage/getuserinfo",token,{id:''},back,$http);
    }
  };
})
.factory('Register', function(Handle,$http){
	return {
		register:function(parms,back){
			Handle.ajax("userRegister/addUser","",parms,back,$http)
		}
	}
})
.factory('RoleList',function(Handle,$http){
  return {
    rolesearch:function(parms,token,back){
      Handle.ajax("user/Role/GetRoleList",token,parms,back,$http)
    }
    
  }
})
.factory('Search',function(Handle,$http){
	return {
		search:function(parms,token,back){
			Handle.ajax("user/GetUserPermission",token,parms,back,$http)
		}
		
	}
})
.factory('Project',function(Handle,$http){
	return {
		get:function(parms,token,back){
			Handle.ajax("project/get",token,parms,back,$http)
		}
	}
})
.factory('Billing',function(Handle,$http){
	return {
		getRechange:function(parms,token,back){
			Handle.ajax("bank/getnetsave",token,parms,back,$http);
		},
		getBillingInfo:function(parms,token,back){
			Handle.ajax("bank/getbindinginfo",token,parms,back,$http);
		}
	}
});

