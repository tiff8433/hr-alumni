angular.module('myApp.post', [])

.controller('PostCtrl', ['$scope', '$state','Post', function($scope, $state, Post) {
  $scope.activeReplies = {};

  $scope.viewReplies = function(postId) {
    $scope.activePost.replies = [];
    if (!$scope.activePost.showReplies) {
      Post.getReplies(postId).then(function(resp){
        $scope.activePost.replies = $scope.activePost.replies.concat(resp);
      });
      $scope.activePost.showReplies = true;
    } else {
      $scope.activePost.replies = [];
      $scope.activePost.showReplies = false;
    }
  }
}]);