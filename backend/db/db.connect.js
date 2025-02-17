const mongoose = require("mongoose");
require("dotenv").config();

const MongoUri = process.env.MONGODB;

const inititalizeDb = async () => {
  await mongoose
    .connect(MongoUri)
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch(() => {
      console.log("Error while connecting to database");
    });
};

module.exports = { inititalizeDb };
