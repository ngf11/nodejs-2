const data = {};
data.employees = require("../model/employees.json");

const getAllEmployees = (request, response) => {
  response.json(data.employees);
};

const creatNewEmployees = (request, response) => {
  response.json({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
  });
}; // new emploee

const updateEmployee = (request, response) => {
  response.json({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
  });
};

const deleteEmployee = (request, response) => {
  response.json({ id: request.body.id });
};
const getEmployee = (request, response) => {
  response.json({ id: request.params.id });
};

module.exports = {
  getAllEmployees,
  creatNewEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
