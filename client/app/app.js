angular.module('myApp', ['ui.router'])

//route handling
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url:'/home',
      templateUrl: 'app/views/home.html'
    })
    .state('profiles', {
      url: '/profiles',
      templateUrl: 'app/views/profiles.html'
    })
}])

.controller('homeCtrl', ['$scope', function ($scope) {

}])

.controller('profilesCtrl', ['$scope', function ($scope) {

}])

.factory('HttpRequest', ['$http', function ($http){


}])