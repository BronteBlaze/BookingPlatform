const jwt = require("jsonwebtoken");

const verifyUserToken = (req, res, next) => {
  const tokenOfUser = req.get("Authorization");
  let token;
  if (tokenOfUser) {
    token = tokenOfUser.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (jwtError, userToken) => {
      if (jwtError) {
        next(jwtError);
        return;
      }
      req.user = userToken._id;
      req.userRole = userToken.role;
      next();
    });
  } else {
    return res.status(401).json({ error: "User is not authenticated" });
  }
};

module.exports = verifyUserToken;
