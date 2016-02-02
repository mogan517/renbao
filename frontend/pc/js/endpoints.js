var app = angular.module('plunker', ['ngResource']);

angular.module('plunker')
    .factory('Thing', function ($resource) {
        return $resource('http://localhost:9000/api/things/:id', {
            id: '@_id'
        }, { //parameters default
            update: {
                method: 'PUT'
            }
        });
    });

//new thing example    
app.controller('ThingCtrl', function($scope, Thing) {
  $scope.newThing = new Thing;
  
  $scope.save = function(form){
    if ( form.$valid ) {
      $scope.newThing.$save()
        .then(function(job){
          //do something here
        });
    }
  }
});

//edit thing example
'use strict';

angular.module('ThingApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.markdown',
    'ngRoute'
])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/things', {
              templateUrl: 'partials/things/index',
              controller: 'ThingsCtrl'
            })
            .when('/things/new', {
              templateUrl: 'partials/things/new',
                controller: 'ThingCtrl',
                authenticate: true
            })
            .when('/things/edit/:id', {
              templateUrl: 'partials/things/edit',
              controller: 'ThingEditCtrl',
              authenticate: true,
              resolve: {
                //this gets passed as 'thing' to edit controller
                //we can now use full promise interface and as the model
                thing: ['$route', 'Thing', function($route, Thing){
                  return Thing.get({ id: $route.current.params.id});
                }]
              }
            })
            .otherwise({
                redirectTo: '/'
            });

    });

//resolver passes 'thing' resource
app.controller('ThingEditCtrl', function($scope, thing) {
  $scope.newThing = thing; //assign to model for form
  
  $scope.save = function(form){
    if ( form.$valid ) {
      $scope.newThing.$update()
        .then(function(job){
          //do something here with updated job
        });
    }
  }
});