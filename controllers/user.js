const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const register = async (req, res, next) => {
  const user = req.body;
  const takenUsername = await User.findOne({ username: user.username });
  const takenEmail = await User.findOne({ email: user.email });

  if (takenUsername) {
    res.json({ message: "username taken" });
    return null;
  }
  if (takenEmail) {
    res.json({ message: "email taken" });
    return null;
  }

  user.password = await bcrypt.hash(req.body.password, 10);

  const dbUser = new User({
    username: user.username.toLowerCase(),
    email: user.email.toLowerCase(),
    password: user.password,
  });

  dbUser.save();

  res.json({ message: "user successfully created!", body: req.body });
};

const login = (req, res, next) => {
  const userLoggingIn = req.body;

  User.findOne({ username: userLoggingIn.username }).then((dbUser) => {
    if (!dbUser) {
      return res.json({
        message: "Invalid username or password",
      });
    }
    bcrypt
      .compare(userLoggingIn.password, dbUser.password)
      .then((isCorrect) => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            username: dbUser.username,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400 },
            (err, token) => {
              console.log(err);
              if (err) return res.json({ message: err });

              return res.json({
                message: "Success",
                token: "Bearer " +token,
              });
            }
          );
        } else {
          return res.json({
            message: "Invalid Username or Password",
          });
        }
      });
  });
};

const verifyJWT = async (req, res, next) => {
  const token = req.headers["x-access-token"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate",
        });
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
  
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
};

module.exports = { register, login, verifyJWT };
