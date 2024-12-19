const mongoose = require("mongoose");
const { DB_URI } = require("../config/index");

// connect to mongo db database
const connectDb = async () => {
  await mongoose
    .connect(DB_URI)
    .then(() => console.log("database connected"))
    .catch((error) => console.log(error));
};

module.exports = connectDb;
