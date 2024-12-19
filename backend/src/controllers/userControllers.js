const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateOtp = require("../helpers/generateRandomToken");

// create new user function
const createNewUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({ error: "user with email already exist" });
    }

    // create a new user
    // generate a new otp || verification token
    const verificationToken = generateOtp();
    // hash the provided password of the user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // save the token and the hash password on the database
    let currentDate = new Date();

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresIn: currentDate.setHours(
        currentDate.getHours() + 1
      ),
    });

    await newUser.save();

    if (!newUser) {
      return res.status(400).json({ error: "user creation failed" });
    }

    console.log(newUser);
    // send a verification email to the user created user
    return res
      .status(201)
      .json({ message: "user created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// verify user controller function
const verifyUser = async (req, res) => {
  const { verificationToken } = req.body;

  try {
    const userExistForVerification = await User.findOne({ verificationToken });

    if (!userExistForVerification) {
      return res.status(404).json({ error: "Invalid verification token" });
    }

    if (
      new Date() - userExistForVerification?.verificationTokenExpiresIn >=
      60 * 60 * 1000
    ) {
      await User.findByIdAndDelete(userExistForVerification._id.toString());

      return res.status(403).json({ error: "expired verification token" });
    }

    userExistForVerification.verificationToken = undefined;
    userExistForVerification.verificationTokenExpiresIn = undefined;
    userExistForVerification.isVerified = true;

    await userExistForVerification.save();

    return res.status(200).json({ message: "user verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// get current user information
const getCurrentUser = async (req, res) => {
  const { userId } = req.user;

  try {
    const currentUser = await User.findById(userId).select("-password");

    if (!currentUser) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.status(200).json({ user: currentUser });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { createNewUser, verifyUser, getCurrentUser };
