angular.module('board.services', [])

.factory('Board', ['$http', '$state', 'Post', function($http, $state, Post) {
  var categoryIcons = {
    events: 'calendar'
  };

  var categoryIcons = {
    events: 'calendar'
  };

  var posts = [
    {
      id: 'abcdefg12345',
      title: 'Karaoke Night - Feb 20, Downtown SF',
      user: 'Robert Lin',
      posted: '2 days ago',
      category: 'events',
      replyCount: 2,
      categoryIcon: categoryIcons['events'],
      hearts: '37'
    },
    {
      id: 'abcdefg12346',
      title: 'Meetup: Algorithms Practice - Jan 12, Los Angeles',
      user: 'Robert Lin',
      posted: '2 days ago',
      category: 'events',
      replyCount: 2,
      categoryIcon: categoryIcons['events'],
      hearts: '37'
    },
    {
      id: 'abcdefg12347',
      title: 'Job Opening at Google',
      user: 'Robert Lin',
      posted: '1 days ago',
      category: 'jobs',
      replyCount: 2,
      categoryIcon: 'desktop',
      hearts: '8'
    }
  ];

  var getPosts = function() {
    return posts;
    /* return $http({
      method: 'GET',
      url: '/api/board/posts'
    }).then(function(resp) {
      return resp.data;
    }); */
  };

  var createPost = function(post) {
    posts.push(post);
    /* return $http({
      method: 'POST',
      url: '/api/board/post/create',
      data: post
    }).then(function(resp) {
      return resp.data;
    }); */
  };

  var getPostContent = function(postId) {
    var output;
    Post.posts.forEach(function(post) {
      if (postId === post.id) {
        output = post;
      }
    });
    return output;
    /* return $http({
      method: 'GET',
      url: '/api/board/post/read/' + postId
    }).then(function(resp) {
      return resp.data;
    }); */
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
    posts: posts,
    getPosts: getPosts,
    createPost: createPost,
    getPostContent: getPostContent,
    upvotePost: upvotePost
  };
}]);