// veryfi roles can ta ke alot of paramiter. it all depends in howmany roles we wan to pass in. the way we do is wih the "..." the rest operator. it just likle the spread operator it allowes us to send in as many paramiuter as we want.we are going to call it "...AllowedRoles"
const verifyRoles = (...allowedRoles) => {
  //middleware ƒ
  return (req, res, next) => {
    //if we do not have a request witch we should because our JWT should come before this. if we dont we should have roles at least if not valid return
    if (!req?.roles) return res.sendStatus(401); //unorthories
    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.roles);
    //This return ture or false it has a role that alled it's premissions. i.e adimn or editor or user. We are maping the role s coming form the JWT"req.roles" comparing them to get ture or false. Then using find the firs true
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((value) => value === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
