const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const handelLogout = async (req, res) => {
  //Handel on client, also delete the accessToken we can do that here we have to doint on the memmory of the cliant  aplication. zero it out or set it to blank
  const cookies = req.cookie;
  if (!cookies?.jwt) return res.sendStatus(204); //no content
  const refreshToken = cookies.jwt;
  // Is RefreshToken  in data base ?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    //this is how we clear the cookie first
    //if we didnt have a foundUser but we did have a cookie. we can earse it like it was sent
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }); //pass the same options it was sent with in obj
    return res.sendStatus(204); // succesful but no content
  }
  //Delete the refresh token  in the data base. we are using file system for that insted of mongol
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: " " }; // found users refeshtoken set to blank
  usersDB.setUsers([...otherUsers, currentUser]);
  //lets write this to the file
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "user.json"),
    JSON.stringify(usersDB.users)
  );
  //delete the cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  //in production when we send the cookie or when we delte the cookie we will alson want to add the flag // secure: true //this only servers on https.
  //here we are using a http conection in dev production. we wont addthis in develpment // secure: true // but in production
  //send our statust agian
  res.sendStatus(204);
};

module.exports = { handelLogout };
