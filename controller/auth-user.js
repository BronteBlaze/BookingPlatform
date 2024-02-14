const User = require("../model/User");

const jwt = require("jsonwebtoken");
const _ = require("lodash");
const crypto = require("crypto");

const { signupValidation, signinValidation } = require("../validator");

exports.signup = async (req, res) => {
  try {
    const { error } = signupValidation.validate(req.body.userData);
    if (error) {
      let responseMessage = "";

      if (error.details[0].message.includes("firstName")) {
        responseMessage = "Please submit a firstname. ";
      }

      if (error.details[0].path.includes("lastName")) {
        responseMessage = "Please submit a lastname. ";
      }

      if (error.details[0].path.includes("phoneNumber")) {
        responseMessage = "Please submit a valid phone number. ";
      }

      if (error.details[0].path.includes("userName")) {
        responseMessage = "Please submit a valid username. ";
      }

      if (error.details[0].path.includes("email")) {
        responseMessage = "Please submit a valid email. ";
      }

      if (error.details[0].path.includes("password")) {
        responseMessage = "Please submit a  6 digits password. ";
      }

      return res.status(400).json({ error: responseMessage });
    }

    const userExists = await User.findOne({ email: req.body.userData.email });

    if (userExists) {
      return res.status(403).json({ error: "Email is taken!" });
    }

    // Create a new user
    const newUser = new User(req.body.userData);
    const user = await newUser.save();

    // Removing sensitive information
    user.salt = undefined;
    user.hashed_password = undefined;

    // res.json(user);
    res.json({
      message: "User registration successful",
      userName: user.userName,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    // Validate the request body against the signin validation schema
    const { error } = signinValidation.validate(req.body);

    // If there's an error in validation, return a validation error response
    if (error) {
      let responseMessage = "";

      if (error.details[0].message.includes("email")) {
        responseMessage = "Please submit a valid email. ";
      }

      if (error.details[0].message.includes("password")) {
        responseMessage = "Please submit a valid password. ";
      }
      return res.status(400).json({ error: responseMessage });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "User with that email does not exist.",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    const payload = {
      _id: user.id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      plainPassword: password,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({ message: "Sign In Successfull", _id: user.id, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.checkUserSignin = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (token) {
//     const user = parseToken(token);

//     const founduser = await User.findById(user._id).select("firstName");

//     if (founduser) {
//       req.userauth = founduser;
//     }
//   }
//   next();
// };

// exports.requireSuperadminSignin = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (token) {
//     const user = parseToken(token);

//     const foundadmin = await User.findById(user._id).select("firstName role");

//     if (foundadmin && foundadmin.role === "superadmin") {
//       req.adminauth = foundadmin;
//       next();
//     } else res.status(401).json({ error: "Not authorized!" });
//   } else {
//     res.status(401).json({ error: "Not authorized" });
//   }
// };

// exports.requireUserSignin = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (token) {
//     const user = parseToken(token);

//     const founduser = await User.findById(user._id).select("firstName role ");

//     if (founduser && founduser.role === "user") {
//       req.userauth = founduser;
//       // console.log(foundowner);
//       next();
//     } else res.status(401).json({ error: "Not authorized!" });
//   } else {
//     res.status(401).json({ error: "Not authorized" });
//   }
// };

// function parseToken(token) {
//   try {
//     return jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// }
