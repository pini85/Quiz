const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./keys/dev");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(keys.mongoURI);

require("./routes/user.routes")(app);
require("./routes/quiz.routes")(app);
require("./test.routes")(app);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`node port at ${PORT}`);
});
