const mongoose = require("mongoose");

// connect to mongo db database
const connectDb = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/blog-api2")
    .then(() => console.log("database connected"))
    .catch((error) => console.log(error));
};

module.exports = connectDb;
