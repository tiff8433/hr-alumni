var Post = require('../../models').Post,
    User = require('../../models').User,
    Heart = require('../../models').Heart;

function getHearts(req, res) {
  var userId = req.user.user_id;

  Heart.where({ user_id: userId }).fetchAll({
    withRelated: ['post', 'category', 'user']
  }).then(function(hearts) {
    if (!hearts) {
      res.sendStatus(404);
    } else {
      var responsePosts = hearts.map(function(heart) {
        return {
          id: heart.get('id'),
          title: heart.related('post').get('title'),
          replies: heart.related('post').get('replies'),
          hearts: heart.related('post').get('hearts'),
          category: heart.related('category').get('category'),
          userId: heart.get('user_id'),
          user: heart.related('user').get('full_name'),
          posted: heart.related('post').get('created_at')
        };
      });
      res.json(responsePosts);
    }
  })
}

module.exports = {
  getHearts: getHearts
};