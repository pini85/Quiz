const User = require("../models/User");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.post("/api/users", async (req, res) => {
    const { name, email, password } = req.body.formValues;

    const user = new User({
      name,
      email,
      password,
    });

    try {
      const token = await user.generateAuthToken();
      await user.save();
      //
      // req.session.token = token ;

      // res.setHeader("Authorization", "Bearer " + token);
      // res.header("Authorization", "Bearer " + token);
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }

    res.send();
  });
  app.post("/api/users/login", async (req, res) => {
    try {
      const user = await User.findUserByCredentials(
        req.body.formValues.email,
        req.body.formValues.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });

  app.post("/api/users/logout", auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token == !req.token;
      });
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  });
};
