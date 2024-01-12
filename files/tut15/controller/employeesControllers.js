const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) return res.status(204).json({ Message: "No Employee" });
  res.json(employees);
};

const creatNewEmployees = async (req, res) => {
  if (!req?.body.firstname || !req.body.lastname) {
    return res
      .status(400)
      .json({ message: "First and Last names are require " });
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    //201 created
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
}; // new emploee

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    //if wwe do have the id
    return res.status(400).json({ message: "ID Parameter is required" });
  }
  // .exec() to execute
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};
const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  creatNewEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
