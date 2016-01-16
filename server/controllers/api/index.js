var express = require('express'),
    util = require('../../config/utils.js'),
    reply = require('./reply.controller');

var apiRouter = express.Router();

apiRouter.get('/posts', util.checkUser);
apiRouter.get('/post/read/:id', util.checkUser);
apiRouter.put('/post/read/:id/upvote', util.checkUser);
apiRouter.get('/post/replies/:id', reply.getReplies);
apiRouter.get('/category/:category', util.checkUser);
apiRouter.post('/post/create', util.checkUser);
apiRouter.post('/post/replies/:id', util.checkUser);
apiRouter.put('/post/replies/:id/thumb', util.checkUser);

module.exports = apiRouter;
