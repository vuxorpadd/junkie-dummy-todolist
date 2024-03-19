const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");

const app = express();

app.use(bodyParser.json());

app.use("/api", router);

// Error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
