const express = require("express");
const app = express();
const port = process.env.PORT || "5000";
const db = require('./models');
const passport = require('./library/passport');
const session = require('express-session');
const flash = require('express-flash');

app.use(session({
  secret:'secret',
  resave: false,
  saveUnitialized: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const routes = require('./routes');

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.info(`running on port:${port}`);
  });
})
