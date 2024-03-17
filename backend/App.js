const express = require("express");
const app = express();
const cityRoutes = require("./Routes/cityRoutes");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());

app.use("/cities", cityRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

module.exports = app;
