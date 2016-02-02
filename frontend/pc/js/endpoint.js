

angular.module('plunker')
    .factory('Thing', function ($resource) {
        return $resource('http://localhost:3000/api/things/:id', {
            id: '@_id'
        }, { //parameters default
            update: {
                method: 'PUT'
            }
        });
    });

//  var mogan = angular.module('zhang', ["ui.router","ngResource"]);

// mogan.factory('UserService', function ($resource) {
//     return $resource('http://jsonplaceholder.typicode.com/users/:user',{user: "@user"});
// });

// mogan.factory('logining',function($resource){
//   return $resource('url',{},{
//     get:{
//       method:'get',
//       params:{
//         username:user.username,
//         password:user.password
//       }
//     },
//     'getFromClick':{
//       method:'get',
//       params:{
//      username:user.username,
//         password:user.password     
//       },    
//         url: host + "/mogan",
//         isArray:true
//     }
//   })
// });
