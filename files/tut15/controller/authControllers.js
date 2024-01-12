const User = require("../model/User");
const bcrypt = require("bcrypt");
const { NONAME } = require("dns");
const jwt = require("jsonwebtoken");

const handelLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400) //invalid request
      .json({ message: "Username and password are required" });
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //User Unauthorized

  //if user found evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //once we have a match we wan to look at our roles
    const roles = Object.values(foundUser.roles); // here we can ge those values inside of roles
    //create JWTs
    //access token. the first need to pass is a payload. What are we going to use is our user object. You dont need want to pass in anything like a password anything that other wise will hurt your security because this is availableto all if they get a hold of your tokens. So what we want to pass in is your username
    //token payloads
    const accessToken = jwt.sign(
      {
        //private JWT claim
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" } //15 to 5 mins
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" } //15 to 5 mins
    );
    //sevinfg refershtoken with current user
    foundUser.refreshToken = refreshToken;

    const result = await foundUser.save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // this is in milseconds  equation eualas  day
    res.json({ accessToken });
    // as a fornt end developer or fullstack developer you want to store that access token in memory. if we save it as json is vonurable. we are going to save as a cookie. I know we said this a bad practies. BUt if we set the cookie as http only it is not avelible to javascript
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handelLogin };
