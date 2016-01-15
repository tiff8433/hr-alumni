angular.module('myApp.board', [])

.controller('BoardCtrl', ['$scope', '$state', 'Board', function($scope, $state, Board) {
  $scope.posts = [];
  $scope.newPost = '';
  $scope.searchText = '';
  $scope.activePost = {};

  $scope.getAllPosts = function() {
    $scope.posts = Board.getPosts();
    /* Board.getPosts()
      .then(function(res) {
        $scope.posts = res;
      })
      .catch(function(err) {
        console.error(err);
      }); */
  }();

  $scope.viewPost = function(post) {
    $scope.activePost.content = '';
    $scope.activePost.replies = [];
    angular.extend(post, Board.getPostContent(post.id));
    $scope.activePost = post;
    $scope.activePost.showReplies = false;
    /* $scope.activePost.content = '';
    Board.getPostContent(post.id)
      .then(function(res) {
        angular.extend(post, res);
        $scope.activePost = post;
      })
      .catch(function(err) {
        console.error(err);
      });
    */
  };

  $scope.addPost = function() {
    Board.createPost($scope.newPost)
      .then(function(res) {
        $state.go('board');
        $scope.getAllPosts();
      })
  }

}]);