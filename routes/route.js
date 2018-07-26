const express = require('express');
const router = express.Router();
const empController = require("../controllers/employee.controller.js");
// const employeeDetCont = require("../controllers/employeeDetails.controller");
const userController = require("../controllers/user.controller.js");
const empDetailsController = require("../controllers/employeeDetails.controller");

router.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Employee-Information-Management api."
  })
})

// router.post("/signup", authCheck, userController.signup);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

//Controllers for Employees CRUD Operations
router.post("/employees/addemployee", empController.addEmployee);
router.get("/employees", empController.getAllEmployees);
router.get("/employees/:id", empController.getEmployeeById);
router.put("/employees/:id", empController.updateEmployee);
//Remove Employee
router.put("/employees/:id/delete", empController.removeEmployee);

// "http://localhost:1122/employees/" + empCode + "/delete";
router.delete("/employee/:id/deleteDetails", empDetailsController.deleteEmpDetails)
router.post("/employee/:id/addDetails", empDetailsController.saveEmpDetails);

module.exports = router;