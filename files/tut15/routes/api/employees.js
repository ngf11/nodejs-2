const express = require("express");
const router = express.Router();
const employeesControllers = require("../../controller/employeesControllers");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(employeesControllers.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesControllers.creatNewEmployees
  ) // new emploee
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesControllers.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesControllers.deleteEmployee);

//name paramiter directly out of the url
router.route("/:id").get(employeesControllers.getEmployee);
module.exports = router;
