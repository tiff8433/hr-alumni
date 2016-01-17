angular.module('post.services', [])
.factory('Post', ['$http', '$state', 'Reply', function($http, $state, Reply) {

  var getReplies = function(postId) {
    return $http({
      method: 'GET',
      url: '/api/board/post/replies/' + postId
    }).then(function(resp) {
      console.log(resp.data);
      return resp.data;
    })
  };

  return {
    getReplies: getReplies
  };
}]);