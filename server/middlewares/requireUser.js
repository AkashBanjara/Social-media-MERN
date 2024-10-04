const jwt = require("jsonwebtoken");
const { error } = require("../utils/responseWrapper");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")

    // instade of this we can write only one line
    //* !req.headers?.authorization?.startsWith("Bearer")
  ){
    return res.send(error(401, "authorization header is required"))

  }

  const accessToken = req.headers.authorization.split(" ")[1];
  // console.log({accessToken}}
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
    );
    req._id = decoded._id;

    const user = await User.findById(req._id);
    if(!user){
      return res.send(error(404, "User not found")) 
    }
    next()
  } catch (err) {
    console.log(err)
    // return res.status(401).send("Invalid access key")
    return res.send(error(401, "Invalid access key"))
  }
};
