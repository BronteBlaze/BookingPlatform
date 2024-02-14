const mongoose = require("mongoose");
const { v1 } = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      maxlength: 32,
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: 32,
    },

    phoneNumber: {
      type: Number,
      max: 9999999999,
    },

    userName: {
      type: String,
      trim: true,
      maxlength: 32,
    },

    email: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "superadmin"],
      default: "user",
    },

    hashed_password: {
      type: String,
    },

    salt: String,
  },
  { timestamps: true }
);

// virtual field
userSchema
  .virtual("password")
  .set(function (password) {
    // create temporary variable called _password
    this._password = password;
    // generate a timestamp
    this.salt = v1();
    // encryptPassword()
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
