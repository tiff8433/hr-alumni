angular.module('myApp.post', [])

.controller('PostCtrl', ['$scope', '$state','Post', function($scope, $state, Post) {
  //$scope.replies.visible = false;
  $scope.activeReplies = {};

  $scope.viewReplies = function(postId) {
    $scope.activePost.replies = [];
    angular.extend($scope.activePost.replies, Post.getReplies(postId));
    $scope.activePost.showReplies = true;
    //   .then(function(res) {
    //     $scope.replies = res;
    //     $state.go('post', res);
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //   });
  }

  $scope.hideReplies = function() {
    //$scope.replies.visible = true;
  }
}]);