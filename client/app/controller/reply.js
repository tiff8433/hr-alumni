angular.module('myApp.reply', [])

.controller('ReplyCtrl', ['$scope', '$state', 'Reply', 'Post', function($scope, $state, Reply) {
  $scope.reply = {};
  $scope.newReply = "";

  $scope.upvote = function() {
    Reply.upvoteReply()
      .then(function(res) {
        $scope.reply.thumbs++;
      })
      .catch(function(err){
        console.error(err);
      });
  }

  $scope.addReply = function() {
    Reply.postReply($scope.newReply)
      .then(function(res) {
        Post.getReplies();
        $state.go('reply');
      });
  }
  
}]);