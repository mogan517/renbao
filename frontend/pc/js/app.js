


var mogan = angular.module('zhang', ["ui.router","ngResource","zhang.services","zhang.handle","ngStorage"]);



mogan.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


     .state('permission', {
    url: '/permission',

    templateUrl: 'pc/templates/permission.html'
    
  })
//   .state('role', {
//       url: '/role',

//       templateUrl: 'pc/templates/role.html'
      
//     })
// .state('job', {
//       url: '/job',

//       templateUrl: 'pc/templates/job.html'
      
//     })
// .state('user', {
//       url: '/user',

//       templateUrl: 'pc/templates/user.html'
      
//     })
// .state('group', {
//       url: '/group',

//       templateUrl: 'pc/templates/group.html'
      
//     })



    .state('chatroom', {
    url: '/chat',
      views :{
             "view1": {
                templateUrl: 'pc/chat.html'
              },
               "view2": {
                templateUrl: 'pc/webaudio-input/index.html'
              }

               }//end views
    
  })//chatroom
    .state("track",{
   
    template:'<iframe width="70%" height="360px" name="{{frameName}}" ng-src="{{frameUrl}}"></iframe>'
    // template:'<iframe width="70%" height="360px" name="{{frameName}}" ng-src="{{frameUrl}}"></iframe>'
  })//track  
   .state("operation",{
      url: '/guanli',
      views:{ 
        view1:{templateUrl:"pc/guanlimenu.html"},
        viModal:{templateUrl:"pc/power-modal.html"},

        view2:{ templateUrl:' pc/guanli.html'}
      } 
   })//operation  
    .state("adduser",{
      url: '/adduser',
      views:{ 
        view1:{templateUrl:"pc/guanlimenu.html"},
        viModal:{templateUrl:"pc/adduser.html"},
        view2:{ templateUrl:' pc/guanli.html'}
      } 
   })//operation
        .state("role",{
      url: '/role',
      views:{ 
         view1:{templateUrl:"pc/rolemenu2.html"},
        viModal:{ templateUrl:' pc/role-modal.html'}
        // viModal:{ templateUrl:' pc/guanli.html'}
      }
   
  })//role
           .state("rolelist",{
      url: '/rolelist',
      views:{ 
         view1:{templateUrl:"pc/rolelist.html"},
        viModal:{ templateUrl:' pc/role-modal.html'}
        // viModal:{ templateUrl:' pc/guanli.html'}
      },
      controller:"appController",
      params: { password: null, }
  })//rolelist     
     .state("userlist",{
      url: '/userlist',
      views:{ 
         view1:{templateUrl:"pc/userlist.html"},
        viModal:{ templateUrl:' pc/adduser.html'}
        // viModal:{ templateUrl:' pc/guanli.html'}
      }//,
     // controller:"appController"
   
  })//userlist   
     .state("contact",{
      url: '/contact',
      views:{ 
        
         view1:{template:"<h1>GO~!!~~~!!!</h1>"}
        // ,        viModal:{ templateUrl:' pc/adduser.html'}
        // viModal:{ templateUrl:' pc/guanli.html'}
      },
      params: { hiddenOne: null, }
     // controller:"appController"
   
  })//contact  
     .state("login",{
      url: '/login',
      views:{ 
     //    view1:{templateUrl:"pc/userlist.html"},
       viModal:{ templateUrl:' pc/loginModal.html'}
        // viModal:{ templateUrl:' pc/guanli.html'}
      },
      params: { password: null, }
   
  })//userlist
   
  //$urlRouterProvider.otherwise('/login');
  });

mogan.controller('appController', [ '$rootScope','$scope',  '$http',  '$state','$localStorage','$sessionStorage','Chats','Search','RoleList','$location',
    function ($rootScope, $scope,$http,$state,$localStorage,$sessionStorage,Chats,Search,RoleList,$location) {  
    
 // $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
 //    if(toState !== login ){
 //       if($scope.$storage.parms.Token == "42"){
 //        $state.go("login");
 //       }
 //    }
 //  });
 //  
  $scope.$storage = $localStorage.$default({
          parms:{Token: 42}
        });
 var stateChangeStartHandler = function(e, toState, toParams, fromState, fromParams) {
  if(toState.name !== 'login' || $scope.$storage.parms.Token == 42){
    console.log("wanwanwanle");
    e.preventDefault();
    $state.go("login");
  }
    //  if (toState.includes('internal') && !$cookies.MySession) {
    //     e.preventDefault();
    //     // Some login stuff.
    // }
};

$rootScope.$on('$stateChangeStart', stateChangeStartHandler);



        
$scope.tijiao=function(data){
    $scope.data=data;
    Chats.login(data,function(data){
       if(data.status==200){
        //$cookies.put("token",data.data.token);
        $scope.$storage.parms.Token=data.token;
        $scope.getUserList(data.token);
        $scope.getRoleList(data.token);
        console.log(data.token);
        $state.go("rolelist");
          $location.url($location.path());

      }else{
        console("失败");
      }
    });
  };
  $scope.getUserList=function(token){
    Search.search({},token,function(data){

 
       $scope.PerList=data;
     // $scope.roleschild = $scope.roleslist[0].child[0];
       console.log("就就就" + $scope.roleslist);
     // console.log("就就就" + $scope.roleschild);
    });


      //  $scope.rolessd = data.children;
         console.log("sjsssd" + $scope.rolessd);
  /////hhhhhhhhhh
     // var b = [];
     //  angular.forEach(arr, function (value, key) {
     //    b.push(value.pic);
     //  });
  ///    
       

   // })
  }; 
   $scope.getRoleList=function(token){

    RoleList.rolesearch({},token,function(data){
         $scope.roleslist =[];    
         $scope.roleslist = data;
         console.log("sjsssd" + $scope.roleslist);
         console.log("here we go " + data);
    })
  };
 


 //   $scope.tijiao = function (user) {


 //    console.log(user);
 // $http.post("http://101.200.122.114:8080/picc/api/user/login",{params:user})
 //    .success(function(rsesponse) {
 //    $state.go('rolelist');   
 //     }).error(function(data,status,headers,config){
 //      alert(data);
 //    });
 //    };

         $scope.message = "sdfsdfsdf";
         $scope.frameName = '定损系统轨迹追踪';
         $scope.frameUrl = 'pc/home-map.html';  
         $scope.frameName1 = '定损系统轨迹追踪';
         $scope.frameUrl1 = 'pc/video.html';
         $scope.sideBar = false;
         $scope.person = false;
         $scope.showMap = true;
         $scope.showChat = false;
         $scope.temporary = false;
         $scope.company = false;
         $scope.chat = function(){
            $scope.showMap = true;          
         }; 
              $scope.gotj = function(){         
         };
       $scope.tab1 = function(){

         $scope.person = true;
         $scope.showMap = false;
         $scope.showChat = false;
         $scope.temporary = false;
         $scope.company = false;            
       }   
       $scope.tab2 = function(){
         $scope.person = false;
         $scope.showMap = false;
         $scope.temporary = true;
         $scope.company = false;            
       }     
             $scope.tab3 = function(){
         $scope.showMap = true;
         $scope.person = false;
         $scope.temporary = false;
         $scope.company = true;            
       }


    }
    ]);
mogan.controller('HomeController', [ '$scope',  '$http',  
    function ( $scope,$http) {
 $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    console.log("foo");alert("bitch");
  });
    	$scope.list = {
    		id:$scope.id,
    		name:$scope.name,
    		passwd:$scope.passwd

    	};
    	$scope.message ="dsf";
        $scope.submit = function(desc) {
	        console.log(desc);
	        $http.post('/RestAllUser', $scope.list ).
		        success(function(data) {
		            console.log("posted successfully");
		        }).error(function(data) {
		            console.error("error in posting");
		        })
   	 }
    }]);