const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

//handeler for new user information
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400) //invalid request
      .json({ message: "Username and password are required" });
  //check fop duplicate user names in the DB
  const duplicate = usersDB.users.find((person) => person.username === user);
  //in const duplicate we are chcking if in userDB "json file in this case/ in reall life it will be a db" .user (it will pull in the users) . find(now i this file if person.username === user) thenwe can see if we get a duplicate
  if (duplicate) return res.sendStatus(409); //409 conflic
  try {
    //   encrypt password
    // we use bcrypt inside of that we use the pwd we recive from the user inside we determn the  salt rounds. this helps protect the pswords in case if your DB is compremise. if hacker was able to figure out the hash. by adding the salts it makes alot more dificult we are goign to pass 10 salt rounds
    const hashedPWD = await bcrypt.hash(pwd, 10);
    ///sotre new users
    const newUser = { username: user, password: hashedPWD };
    //set our new data. here we will pass all the data that we have
    usersDB.setUsers([...usersDB.users, newUser]);
    //lets write to our Json file. this our data base
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created` }); // new user was created
  } catch (err) {
    res.status(500).json({ message: err.message }); //server Erro
  }
};

module.exports = { handleNewUser };
