var express = require('express'),
    util = require('../../config/utils.js'),
    category = require('./category.controller'),
    reply = require('./reply.controller');

var apiRouter = express.Router();

apiRouter.get('/posts', util.checkUser);
apiRouter.get('/post/read/:id', util.checkUser);
apiRouter.put('/post/read/:id/upvote', util.checkUser);
apiRouter.get('/post/replies/:id', reply.getReplies);
apiRouter.get('/category/:category', category.getPostsByCategory);
apiRouter.post('/post/create', util.checkUser);
apiRouter.post('/post/replies/:id', reply.postReply);
apiRouter.put('/post/replies/:id/thumb', reply.thumbUpReply);

module.exports = apiRouter;
