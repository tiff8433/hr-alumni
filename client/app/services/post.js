angular.module('post.services', [])

.factory('Post', ['$http', '$state', 'Reply', function($http, $state, Reply) {

  var posts = [
    {
      id: 'abcdefg12345',
      content: "Gochujang echo park post-ironic hoodie, iPhone tousled slow-carb pickled kombucha aesthetic ennui bushwick pour-over. Cliche shoreditch chartreuse, vice occupy butcher crucifix hashtag pop-up pour-over. Keytar you probably haven't heard of them artisan taxidermy, photo booth kickstarter tattooed. Williamsburg occupy biodiesel 3 wolf moon before they sold out organic salvia, meditation flexitarian whatever ethical flannel. Celiac mustache art party post-ironic PBR&B thundercats. Pug polaroid ugh pop-up vegan. Letterpress humblebrag you probably haven't heard of them, mlkshk tousled viral raw denim church-key heirloom iPhone lumbersexual hoodie blog."
    },
    {
      id: 'abcdefg12346',
      content: "Gochujang echo park post-ironic hoodie, iPhone tousled slow-carb pickled kombucha aesthetic ennui bushwick pour-over. Cliche shoreditch chartreuse, vice occupy butcher crucifix hashtag pop-up pour-over. Keytar you probably haven't heard of them artisan taxidermy, photo booth kickstarter tattooed. Williamsburg occupy biodiesel 3 wolf moon before they sold out organic salvia, meditation flexitarian whatever ethical flannel. Celiac mustache art party post-ironic PBR&B thundercats. Pug polaroid ugh pop-up vegan. Letterpress humblebrag you probably haven't heard of them, mlkshk tousled viral raw denim church-key heirloom iPhone lumbersexual hoodie blog."
    }
  ];

  var getReplies = function(postId) {
    var output;
    Reply.replies.forEach(function(post) {
      if (postId === post.id) {
        output = post.replies;
      }
    });
    return output;
    // return $http({
    //   method: 'GET',
    //   url: '/api/board/replies/' + postId
    // }).then(function(resp) {
    //   return resp.data;
    // })
  };

  return {
    getReplies: getReplies,
    posts: posts
  };
}]);