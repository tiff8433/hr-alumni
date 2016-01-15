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
<<<<<<< e0d05cb300f66556568f634e92a3d634ca26e70d
      replyCount: 2,
      categoryIcon: categoryIcons['events'],
=======
      categoryIcon: categoryIcons[this.category],
      content: "Gochujang echo park post-ironic hoodie, iPhone tousled slow-carb pickled kombucha aesthetic ennui bushwick pour-over. Cliche shoreditch chartreuse, vice occupy butcher crucifix hashtag pop-up pour-over. Keytar you probably haven't heard of them artisan taxidermy, photo booth kickstarter tattooed. Williamsburg occupy biodiesel 3 wolf moon before they sold out organic salvia, meditation flexitarian whatever ethical flannel. Celiac mustache art party post-ironic PBR&B thundercats. Pug polaroid ugh pop-up vegan. Letterpress humblebrag you probably haven't heard of them, mlkshk tousled viral raw denim church-key heirloom iPhone lumbersexual hoodie blog.",
>>>>>>> Implements board, post, and reply services and controller
      hearts: '37'
    },
    {
      id: 'abcdefg12346',
      title: 'Karaoke Night - Feb 20, Downtown SF',
      user: 'Robert Lin',
      posted: '2 days ago',
      category: 'events',
      replyCount: 2,
      categoryIcon: categoryIcons['events'],
      hearts: '37'
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