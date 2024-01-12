const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");

const handelRefreshToken = (req, res) => {
  const cookies = req.cookie;
  if (!cookies?.jwt) return res.sendStatus(401); //Unauthorize
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) return res.sendStatus(403); //User forbidden

  //if user found evaluate JWT

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
    if (err || foundUser.username !== decode.username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decode.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30S" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handelRefreshToken };
