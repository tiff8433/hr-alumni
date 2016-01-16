angular.module('post.services', [])
.factory('Post', ['$http', '$state', 'Reply', function($http, $state, Reply) {

  var getReplies = function(postId) {
    return $http({
      method: 'GET',
      url: '/api/board/replies/' + postId
    }).then(function(resp) {
      return resp.data;
    })
  };

  return {
    getReplies: getReplies
  };
}]);