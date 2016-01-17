angular.module('myApp.reply', [])

.controller('ReplyCtrl', ['$scope', '$state', 'Reply', 'Post', function($scope, $state, Reply, Post) {
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
    var id = $scope.activePost.id;
    Reply.postReply($scope.newReply, id)
      .then(function(res) {
        $scope.activePost.replies.push(res);
        $scope.newReply = '';
      });
  }
}]);