const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  console.log("inside Auth Middleware");
  const token = req.headers.authorization;
  console.log(token);

  if (token) {
    const decoded = jwt.verify(token, "masai");
    console.log(decoded, "decoded");
   const { userID } = decoded;
    if (decoded) {
        req.body.userID = userID;
      next();
    } else {
      res.status(400).send({ msg: "Please Login First" });
    }
  } else {
    res.status(400).send({ msg: "token is Incorrect / Not available" });
  }
};

module.exports = {
  auth,
};