var Category = require('../../models/category');
var Post = require('../../models/post');

module.exports = {

  getPostsByCategory: function(req, res) {

    Post.forge({ category_id: CATEGORYINPUT })
        .fetchAll()
        .then(function(posts){
          res.send(posts.toJSON);
        })
        .catch(function(error){
          console.log(error);
          res.send('Error at Category.fetchAll');
        })

  }

}
