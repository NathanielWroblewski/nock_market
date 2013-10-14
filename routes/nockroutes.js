var nocklib = require('../lib/nocklib');

module.exports = {
  getIndex: function(req, res) {
    res.render('index');
  },

  login: function(req, res) {
    nocklib.authenticate(req.body.username
      , req.body.password, function(err, id) {
      if (id) {
        req.session._id = id;
        res.redirect('/portfolio');
      }
      else
        res.redirect('/');
    });
  },

  signup: function(req, res) {
    nocklib.createUser(req.body.username
      , req.body.email
      , req.body.password, function(err, user) {
      console.log(user);
      res.redirect('/portfolio');
    });
  },

  getUser: function(req, res) {
    nocklib.getUser(req.params.username, function(err, user) {
      if (user)
        res.send('1');
      else
        res.send('0');
    });
  }
}
