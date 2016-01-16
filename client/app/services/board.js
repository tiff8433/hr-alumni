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
    console.log(post);
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
        console.log(resp.data);
        return resp.data;
    }); 
  };

  var upvotePost = function(postId) {
    return $http({
      method: 'PUT',
      url: '/api/board/post/read/' + postId + '/upvote'
    }).then(function(resp) {
      return resp.data;
    });
  };

  return {
    getPosts: getPosts,
    createPost: createPost,
    getPostContent: getPostContent,
    upvotePost: upvotePost
  };
}]);