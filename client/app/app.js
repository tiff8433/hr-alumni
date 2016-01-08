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
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.html'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'app/views/profile.html'
    })
}])

.controller('homeCtrl', ['$scope', function ($scope) {
}])

.controller('profileCtrl', ['$scope', function ($scope) {


}])

.controller('profilesCtrl', ['$scope', '$http', 'HttpRequest', function ($scope, $http, HttpRequest) {
  // console.log(HttpRequest)
  // HttpRequest.getProfiles()
  //   .then(function (data) {
  //     $scope.profiles= data;
  //   })
  $http({
    method: 'GET',
    url: '/api/profiles'
  }).then(function (res) {
    console.log('response data looks like: ', res.data); 
      $scope.profiles = res.data;
  })
}])

.controller('createProfileCtrl', ['$scope', 'HttpRequest', function ($scope, HttpRequest){
  $scope.submitProfile = function (formData) {
    console.log(formData);

    HttpRequest.submitProfile(formData);
  }
}])

.factory('HttpRequest', ['$http', '$q', function ($http, $q){
  var deferred= $q.defer();
  var submitProfile = function (data) {
    console.log('data does it get here>=? ', data); 
    return $http({
      method: 'POST',
      url: '/api/profiles',
      data: data
    })
  };

  var getProfiles= function () {
    return $http({
      method: 'GET',
      url: '/api/profiles'
    }).success(function(result){
      deferred.resolve(result); 
    }).error(function (result){
      deferred.reject(result);
    })
  }

  // $http({
  //   method: 'GET',
  //   url: '/api/profiles'
  // }).then(function (res) {
  //     $scope.profiles = res.data;
  // })
  return {
    submitProfile: submitProfile,
    getProfiles: getProfiles
  }
}]);