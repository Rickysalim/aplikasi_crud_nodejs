const router = require("express").Router();
const user = require("../controllers/user");
const passport = require('passport')
const userController = new user();

router.get("/", userController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
  })
  , userController.loginAction
);
router.get("/form-register", userController.register);
router.post("/register", userController.registerAction);
router.get("/logout", userController.logout);

module.exports = router;
