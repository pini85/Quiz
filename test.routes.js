// const express = require("express");
// const app = express();
module.exports = (app) => {
  //   app.get("/api/test", (req, res) => {
  //     res.send("Hello there from the dark side");

  //     console.log("Im inside");
  //   });
  app.post("/api/test", (req, res) => {
    console.log("req", req);

    res.send(req.body);
  });
};
