var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hralumni');

app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000, function() {
  console.log('Server started on port: ' + port);
});