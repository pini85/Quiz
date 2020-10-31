const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = async (req, res, next) => {
  // console.log("im here");
  console.log("body", req.body);
  console.log("headers", req.headers);
  const authorizationHeader =
    (req.body.headers && req.body.headers.Authorization) ||
    req.headers.authorization;

  try {
    const token = authorizationHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, "gjj54jgjrlij34lit3");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send({ error: "Please authenticate" });
  }
};
module.exports = auth;
