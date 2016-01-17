angular.module('board.services', [])

.factory('Board', ['$http', '$state', 'Post', function($http, $state, Post) {

  var getPosts = function() {
    return $http({
      method: 'GET',
      url: '/api/board/posts'
    }).then(function(resp) {
      return resp.data;
    }); 
  };

  var createPost = function(post) {
    return $http({
      method: 'POST',
      url: '/api/board/post/create',
      data: post
    }).then(function(resp) {
      return resp.data;
    }); 
  };

  var getPostContent = function(postId) {
     return $http({
        method: 'GET',
        url: '/api/board/post/read/' + postId
      }).then(function(resp) {
        return resp.data;
    }); 
  };

  var upvotePost = function(postId) {
    return $http({
      method: 'PUT',
      url: '/api/board/post/read/upvote/' + postId
    }).then(function(resp) {
      return resp.data;
    });
  };

  var getHearts = function() {
    return $http({
      method: 'GET',
      url: '/api/board/posts/hearts'
    }).then(function(resp) {
      return resp.data;
    });
  };

  return {
    getPosts: getPosts,
    createPost: createPost,
    getPostContent: getPostContent,
    upvotePost: upvotePost,
    getHearts: getHearts
  };
}]);