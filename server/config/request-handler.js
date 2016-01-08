var User = require('./userModel.js');


exports.createProfile = function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var githubName = req.body.githubName;
  var email = req.body.email;
  var location = req.body.location;
  var summary = req.body.summary;
  var status = req.body.status;
  var companies = req.body.companies;
  var languages = req.body.languages;
  var blog = req.body.blog;
  var website = req.body.website;
  var linkedin = req.body.linkedin;
  var github = req.body.github;
  var urls = req.body.urls;

  User.findOne({
      contact: {
        email: email
      }
    })
    .exec(function(err, user) {
      if (!user) {
        var newUser = new User({
          contact: {
            firstName: firstName,
            lastName: lastName,
            githubName: githubName,
            email: email,
            location: location
          },
          about: {
            summary: summary,
            status: status
          },
          experience: {
            companies: companies,
            languages: languages
          },
          links: {
            blog: blog,
            website: website,
            linkedin: linkedin,
            github: github
          },
          projects: {
            urls: urls
          }
        });
        newUser.save(function(err, newUser) {
          if (err) {
            res.send(500, err);
          }
        });
      } else {
        console.log("Profile already exists");
        res.redirect('/createProfile');
      }
    });
};

exports.findAll = function(req, res) {
  User.find({}).exec(function(err, profiles) {
    res.json(profiles);
  });
};

exports.findOne = function(req, res) {
  User.find({
    contact: {
      email: email
    }
  }).exec(function(err, profile) {
    res.json(profile);
  });
};