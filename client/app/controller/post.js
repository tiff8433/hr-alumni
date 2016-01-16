angular.module('myApp.post', [])

.controller('PostCtrl', ['$scope', '$state','Post', function($scope, $state, Post) {
  //$scope.replies.visible = false;
  $scope.activeReplies = {};

  $scope.viewReplies = function(postId) {
    $scope.activePost.replies = []
    if (!$scope.activePost.showReplies) {
      $scope.activePost.replies.concat(Post.getReplies(postId));
      console.log($scope.activePost.replies);
      $scope.activePost.showReplies = true;
    } else {
      $scope.activePost.replies = [];
      $scope.activePost.showReplies = false;
    }

    //   .then(function(res) {
    //     $scope.replies = res;
    //     $state.go('post', res);
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //   });
  }
}]);