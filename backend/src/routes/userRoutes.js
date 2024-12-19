const express = require("express");
const {
  createNewUser,
  verifyUser,
  getCurrentUser,
} = require("../controllers/userControllers");
const requireSignin = require("../middleware/requireSignin");
const userRouter = express.Router();

userRouter.post("/", createNewUser);
userRouter.put("/verify", verifyUser);
userRouter.get("/me", requireSignin, getCurrentUser);

module.exports = userRouter;
