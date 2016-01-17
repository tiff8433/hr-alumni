angular.module('myApp.board', [])

.controller('BoardCtrl', ['$scope', '$state', 'Board', function($scope, $state, Board) {
  $scope.posts = [];
  $scope.newPost = {
    title: '',
    content: ''
  };
  $scope.searchText = '';
  $scope.activePost = {};
  $scope.showNewPostForm = false;
  $scope.catIcons = {
    events: 'calendar',
    jobs: 'briefcase',
    miscellaneous: 'info'
  };

  $scope.getAllPosts = function() {
    Board.getPosts()
      .then(function(res) {
        $scope.posts = res;
      })
      .catch(function(err) {
        console.error(err);
      }); 
  };

  $scope.heartUp = function(post) {
    Board.upvotePost(post.id).then(function(resp) {
      post.hearts += 1;
    });
  };

  $scope.viewPost = function(post) {
    $scope.activePost.content = '';
    $scope.activePost.replies = [];

    if (post.id !== $scope.activePost.id) {
      Board.getPostContent(post.id).then(function(resp) {
        angular.extend(post, resp);
        $scope.activePost = post;  
      });
    } else {
      $scope.activePost = {};
    }
    
    $scope.activePost.showReplies = false;
    $scope.activePost.content = '';
  };

  $scope.viewNewPostForm = function(){
    $scope.showNewPostForm = !$scope.showNewPostForm;
  }

  $scope.addPost = function() {
    Board.createPost($scope.newPost)
      .then(function(res) {
        $scope.getAllPosts();
        $scope.newPost = {
          title: '',
          content: ''
        };
        $scope.showNewPostForm = false;
      })
  };

  $scope.getAllPosts();
}]);