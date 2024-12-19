const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const blogRouter = require("./routes/blogRoutes");
const app = express();

//global middleware configuration for cors
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

//global middleware configuration for json data
app.use(express.json());

//global middleware configuration for cookie-parser
app.use(cookieParser());

// global middleware for routes configuration
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/blogs", blogRouter);

//server health check
app.get("/", (req, res) => {
  res.json({ message: "server is live" });
});

module.exports = app;
