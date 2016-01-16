angular.module('myApp.board', [])

.controller('BoardCtrl', ['$scope', '$state', 'Board', function($scope, $state, Board) {
  $scope.posts = [];
  $scope.newPost = '';
  $scope.searchText = '';
  $scope.activePost = {};

  $scope.getAllPosts = function() {
    Board.getPosts()
      .then(function(res) {
        $scope.posts = res;
      })
      .catch(function(err) {
        console.error(err);
      }); 
  }();

  $scope.viewPost = function(post) {
    $scope.activePost.content = '';
    $scope.activePost.replies = [];

    Board.getPostContent(post.id)
      .then(function(res) {
        if (post.id !== $scope.activePost.id) {
          angular.extend(post, Board.getPostContent(post.id));
          $scope.activePost = post;
        } else {
          $scope.activePost = {};
        }

        $scope.activePost.showReplies = false;
        $scope.activePost.content = '';
      })
      .catch(function(err) {
        console.error(err);
      });
    
  };

  $scope.addPost = function() {
    Board.createPost($scope.newPost)
      .then(function(res) {
        $state.go('board');
        $scope.getAllPosts();
      })
  }
}]);