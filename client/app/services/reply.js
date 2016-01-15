angular.module('reply.services', [])

.factory('Reply', ['$http', '$state', function($http, $state) {

<<<<<<< 9ba1323aa2f0bfe97ef20f5724982c5dd6feb863
  var replies = [
    {
      id: 'abcdefg12345',
      replies: [
        {
          id: '987654321',
          user: 'Tiffany Huang',
          image: '/u/11264591?v=3&s=460',
          //https://avatars0.githubusercontent.com
          content: "Wayfarers food truck small batch cronut pour-over. 3 wolf moon pour-over cronut brooklyn, migas viral aesthetic try-hard readymade intelligentsia kombucha cred shabby chic.",
          posted: '8 min ago',
          thumbs: 8
        },
        {
          id: '987654322',
          user: 'Tiffany Huang',
          image: '/u/11264591?v=3&s=460',
          //https://avatars0.githubusercontent.com
          content: "Wayfarers food truck small batch cronut pour-over. 3 wolf moon pour-over cronut brooklyn, migas viral aesthetic try-hard readymade intelligentsia kombucha cred shabby chic.",
          posted: '8 min ago',
          thumbs: 8
        }
      ]
    },
    {
      id: 'abcdefg12346',
      replies: [
        {
          id: '987654327',
          user: 'Tiffany Huang',
          image: '/u/11264591?v=3&s=460',
          //https://avatars0.githubusercontent.com
          content: "Wayfarers food truck small batch cronut pour-over. 3 wolf moon pour-over cronut brooklyn, migas viral aesthetic try-hard readymade intelligentsia kombucha cred shabby chic.",
          posted: '8 min ago',
          thumbs: 8
        },
        {
          id: '987654328',
          user: 'Tiffany Huang',
          image: '/u/11264591?v=3&s=460',
          //https://avatars0.githubusercontent.com
          content: "Wayfarers food truck small batch cronut pour-over. 3 wolf moon pour-over cronut brooklyn, migas viral aesthetic try-hard readymade intelligentsia kombucha cred shabby chic.",
          posted: '8 min ago',
          thumbs: 8
        }
      ]
    }
  ];

  var upvoteReply = function(replyId) {
    return $http({
      method: 'PUT',
      url: '/api/board/replies/' + replyId + '/thumb'
    }).then(function(resp) {
      return resp.data;
    });
  };

  var postReply = function(reply) {
    return $http({
      method: 'POST',
      url: '/api/board/replies/' + reply.postId,
      data: reply
    }).then(function(resp) {
      return resp.data;
    });
  };

  return {
    replies: replies,
    postReply: postReply
  };
}]);