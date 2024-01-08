const express = require("express");
const router = express.Router();
const employeesControllers = require("../../controller/employeesControllers");

router
  .route("/")
  .get(employeesControllers.getAllEmployees)
  .post(employeesControllers.creatNewEmployees) // new emploee
  .put(employeesControllers.updateEmployee)
  .delete(employeesControllers.deleteEmployee);

//name paramiter directly out of the url
router.route("/:id").get(employeesControllers.getEmployee);
module.exports = router;
