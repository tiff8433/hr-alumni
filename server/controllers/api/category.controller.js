var Category = require('../../models/category');
var Post = require('../../models/post');

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
