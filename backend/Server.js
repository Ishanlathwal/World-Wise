const mongoose = require("mongoose");
const app = require("./App.js");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("uncaught exception shutting down ");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "backend/config.env" });

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});

const dbUrl = process.env.DB.replace("<PASS>", process.env.PASS);

mongoose.connect(dbUrl).then(() => {
  console.log("DB connection successful");
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection Shutting Down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
