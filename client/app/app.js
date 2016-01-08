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

.controller('profilesCtrl', ['$scope', '$http', function ($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/profiles'
  }).then(function (res) {
      $scope.profiles = res.data;
  })
}])

.controller('createProfileCtrl', ['$scope', 'HttpRequest', function ($scope, HttpRequest){
  $scope.submitProfile = function (formData) {
    console.log(formData);

    HttpRequest.submitProfile(formData);
  }
}])

.factory('HttpRequest', ['$http', function ($http){
  //get profiles
  //post profile
  var submitProfile = function (data) {
    $http({
      method: 'POST',
      url: '/api/profiles',
      data: data
    })
  };
  return {
    submitProfile: submitProfile
  }
}]);