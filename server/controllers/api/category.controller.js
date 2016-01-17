var Category = require('../../models/').Category;
var Post = require('../../models/').Post;

module.exports = {

  getPostsByCategory: function(req, res) {

    var category = req.params.category;

    Post.forge({ category_id: category })

        .fetchAll()
        .then(function(posts){
          res.json(posts);
        })
        .catch(function(error){
          console.log(error);
          res.send('Error at Category.fetchAll');
        })

  },


  getAllCategories: function(req, res){


  }


}
