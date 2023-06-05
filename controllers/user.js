const passport = require("passport");
const { users } = require("../models");

class userController {

  logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
  }

  login = (req, res) => {
    res.render("login");
  };

  register = (req, res) => {
    res.render("register");
  }

  registerAction = function (req, res) {
    users
      .register(req.body)
      .then(() => res.redirect("/"))
      .catch((err) => {
        console.info(err)
        res.redirect('/form-register')
      });
  };

  loginAction = function(req, res) {
    res.redirect('/product')
  }
}

module.exports = userController;
