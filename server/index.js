const express = require("express");
const app = express();

app.get("https://api-services1.onrender.com/", (req, res) => {
  console.log("res", res);
  res.send({ hi: "there" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT);
