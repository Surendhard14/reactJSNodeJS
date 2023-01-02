const express = require("express");
const mongoose = require("mongoose");
const { mongoURI, cookieKey } = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/users");
require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(mongoURI).catch((err) => console.log("err", err));
mongoose.connection.on("error", (e) => {
  console.log("mongo connect error!");
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
authRoutes(app);
// require("./routes/authRoutes")(app);
// app.get("/", (req, res) => {
//   console.log("res", { hi: "there" });
//   res.send({ hi: "there" });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);
