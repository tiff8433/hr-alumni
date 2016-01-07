angular.module('myApp', ['ui.router'])


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
    .state('createProfile', {
      url: '/createProfile', 
      templateUrl: 'app/views/createProfile.html'
    })
}])

.controller('homeCtrl', ['$scope', function ($scope) {

}])

.controller('profilesCtrl', ['$scope', function ($scope) {

}])

.factory('HttpRequest', ['$http', function ($http){
  //get profiles
  //post profile

}])