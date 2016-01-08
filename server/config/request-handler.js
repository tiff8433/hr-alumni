var User = require('../users/userModel.js');


exports.createProfile = function(req, res) {
  console.log('request looks like: ', req.body); 
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var githubName = req.body.github;
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
  var project1  = req.body.project1;
  var project2  = req.body.project2;
  var project3  = req.body.project3;

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
          // about: {
          //   summary: summary,
          //   status: status
          // },
          // experience: {
          //   companies: [
          //     {companies: companies}
          //   ],
          //   languages: [
          //     {languages: languages}
          //   ]
          // },
          links: {
            blog: blog,
            // website: website,
            linkedin: linkedin,
            // github: github
          }
          // ,
          // projects: {
          //   urls: [
          //   {project1: project1},
          //   {project2: project2},
          //   {project3: project3}
          // ]
          // }
        });
        console.log('new user on line 64: ', newUser); 
        newUser.save(function(err, newUser) {
          if (err) {
            res.status(500).send(err); 
            // res.redirect('/profile');
          }
          console.log('new user gets saved? ', newUser); 
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