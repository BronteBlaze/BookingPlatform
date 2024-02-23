const User = require("../model/User");
const { signupValidation } = require("../validator");

exports.putUserUpdateData = async (req, res, next) => {
  const { email, password, firstName, lastName, phoneNumber, userName } =
    req.body.userData;

  try {
    const { error } = signupValidation.validate(req.body.userData);

    if (error) {
      let responseMessage = "Please input valid data ";
      return res.status(400).json({ error: responseMessage });
    }

    const user = await User.findById(req.user);

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.userName = userName;
      user.email = email;
      user.password = password;
      user.phoneNumber = phoneNumber;
    } else {
      return;
    }

    const success = await user.save();

    if (success) {
      return res.status(201).json({ message: "Updated Successfully" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllUser = async (req, res, next) => {
  const { user, userRole } = req;
  const { currentPage: pageNumber } = req.query;
  let totalPages;
  try {
    if (user && userRole === "superadmin") {
      const totalUsers = await User.find({}).countDocuments();
      totalPages = Math.ceil(totalUsers / 6);

      let allUsers;

      if (pageNumber) {
        allUsers = await User.find({})
          .skip((pageNumber - 1) * 6)
          .limit(6);
      } else {
        allUsers = await User.find({});
      }

      let normalUsers = [];

      normalUsers = allUsers?.filter((eachUser) => {
        return eachUser.role !== "superadmin";
      });

      return res
        .status(200)
        .json({ message: "Fetched Successfully", normalUsers, totalPages });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
