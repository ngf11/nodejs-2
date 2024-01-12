//User Model
const User = require("../model/User");

const bcrypt = require("bcrypt");

//handeler for new user information
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400) //invalid request
      .json({ message: "Username and password are required" });
  //check fop duplicate user names in the DB
  //Notice we have handel the user as ansyc function. her we use our User model .findOne() inside we pass an username that matches user that. Then we pass exec(). Not every model needs a findOne(). But .exec() does.
  // this await is going to return any user that matches; I there is a duplicate
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //409 conflic
  try {
    //   encrypt password
    // we use bcrypt inside of that we use the pwd we recive from the user inside we determn the  salt rounds. this helps protect the pswords in case if your DB is compremise. if hacker was able to figure out the hash. by adding the salts it makes alot more dificult we are goign to pass 10 salt rounds
    const hashedPWD = await bcrypt.hash(pwd, 10);
    ///With mongoese we can creat and store new users
    const result = await User.create({
      username: user,
      password: hashedPWD,
    });
    console.log(result);
    res.status(201).json({ success: `New user ${user} created` }); // new user was created
  } catch (err) {
    res.status(500).json({ message: err.message }); //server Erro
  }
};

module.exports = { handleNewUser };
