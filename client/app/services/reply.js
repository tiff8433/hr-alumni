angular.module('reply.services', [])

.factory('Reply', ['$http', '$state', function($http, $state) {

  var upvoteReply = function(replyId) {
    return $http({
      method: 'PUT',
      url: '/api/board/replies/' + replyId + '/thumb'
    }).then(function(resp) {
      return resp.data;
    });
  };

  var postReply = function(reply, id) {
    return $http({
      method: 'POST',
      url: '/api/board/post/replies/' + id,
      data: reply
    }).then(function(resp) {
      return resp.data;
    });
  };

  return {
    upvoteReply: upvoteReply,
    postReply: postReply
  };
}]);