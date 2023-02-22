const express = require("express");
const app = express();
const port = process.env.PORT || "5000";
const routes = require('./routes');
const db = require('./models');

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
