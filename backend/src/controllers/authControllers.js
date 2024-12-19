const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken, verifyToken } = require("../helpers/jwtHelpers");
const {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESh_TOKEN_EXPIRES_IN,
  JWT_SECRET,
} = require("../config/index");

// user login controller function
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userWithEmailExist = await User.findOne({ email });

    if (!userWithEmailExist) {
      return res.status(404).json({ error: "user with email does not exist" });
    }

    if (!userWithEmailExist.isVerified) {
      return res.status(403).json({ error: "user account is not verified" });
    }

    const passwordMatch = await bcrypt.compareSync(
      password,
      userWithEmailExist?.password
    );

    if (!passwordMatch) {
      return res.status(403).json({ error: "Invalid login credentials" });
    }

    const jwtPayload = {
      email: userWithEmailExist.email,
      userId: userWithEmailExist._id,
      firstName: userWithEmailExist.firstName,
      lastName: userWithEmailExist.lastName,
    };

    // generate refresh token
    const refreshToken = generateToken(
      jwtPayload,
      JWT_SECRET,
      REFRESh_TOKEN_EXPIRES_IN
    );

    // generate access token
    const accessToken = generateToken(
      jwtPayload,
      JWT_SECRET,
      ACCESS_TOKEN_EXPIRES_IN
    );

    // cookie options
    const cookieOptions = {
      expires: new Date(Date.now() + 3600),
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .json({ message: "user login successfully", refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// logout user controller function
const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "user logout successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// generate new access token controller function
const generateAccessToken = async (req, res) => {
  try {
    const refreshToken = req.headers["authorization"];

    if (!refreshToken) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (refreshToken.split(" ")[0] !== "Bearer") {
      return res.status(403).json({ error: "invalid token" });
    }

    const payload = verifyToken(refreshToken.split(" ")[1], JWT_SECRET);

    if (!payload) {
      return res.status(403).json({ error: "invalid token" });
    }

    // access token payload
    const jwtPayload = {
      userId: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };

    const accessToken = generateToken(
      jwtPayload,
      JWT_SECRET,
      ACCESS_TOKEN_EXPIRES_IN
    );

    // cookie options
    const cookieOptions = {
      expires: new Date(Date.now() + 3600),
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { loginUser, logoutUser, generateAccessToken };
