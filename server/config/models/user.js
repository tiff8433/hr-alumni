var db = require('../config.js');

var User = db.Model.extend({
  tableName: 'users'
});

module.exports = User;
