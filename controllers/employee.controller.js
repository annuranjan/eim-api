const Employee = require("../models/employee.model.js");
const empDetCont = require("../controllers/employeeDetails.controller.js");
const mongoose = require('mongoose');

//app.delete('/employees/:empId', employeeCont.deleteEmployee); //Internally call a function to delete employees details.

exports.addEmployee = (req, res) => {
  // Validating request
  // if (!req.body.firstname ||
  //   !req.body.lastname ||
  //   !req.body.email ||
  //   !req.body.domainName
  // ) {
  //   return res.status(400).send({
  //     message: "Please fill all the required fields before saving the employee!"
  //   });
  // }

  const d = new Date();
  const date_now = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  let newEmpCode = '';
  let emp = new Employee({
    _id: new mongoose.Types.ObjectId(),
    employeeCode: '',
    firstname: req.body.firstname,
    middlename: req.body.middlename || '',
    lastname: req.body.lastname,
    domainname: req.body.domainname,
    email: req.body.email,
    currentEmp: true,
    regDate: date_now
  });
  Employee.find({}).sort({
    _id: -1
  }).limit(1).then(result => {
    console.log(result);
    //A P P -- N O T -- R U N N I N G -- W H E N -- D A T A B A S E -- I S -- E M P T Y
    if (result[0]) {
      newEmpCode = +(result[0].employeeCode) + 1;
    } else {
      newEmpCode = 1;
    }
    // newEmpCode = +(result[0].employeeCode) + 1;

    console.log("New EmployeeCode: " + newEmpCode);
    emp.employeeCode = newEmpCode;
    console.log(emp);
    console.log("****************************************");
    emp
      .save()
      .then(data => {
        console.log("emp obj saved successfully!");
        return res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occured while saving the employee!"
        });
      });
  }).catch(error => {
    console.log(error);
    res.status(error.status || 500).json(error);
  });
};


exports.getAllEmployees = (req, res) => {
  console.log("request recieve to fetch all the employees.");
  Employee.find({
      "currentEmp": true
    })
    .then(emps => {
      console.log("the list of all the employees fetched are: " + emps);
      res.status(200).send(emps);
    })
    .catch(err => {
      return res.status(500).send({
        message:
          /*err.message || */
          "Some error occured while retrieving the employees!"
      });
    });
};

exports.getEmployeeById = (req, res) => {
  Employee.findOne({
      employeeCode: req.params.id
    })
    .then(emp => {
      console.log("the employee found is: " + emp);
      res.status(200).send(emp);
    })
    .catch(err => {
      console.log("some error occurred");
    });
};


// exports.getEmployeeById = (req, res) => {
//   Employee.find({
//       employeeCode: req.params.id
//     })
//     .then(emp => {
//       console.log("the employee found is: " + emp);
//       if (!emp) {
//         return res.status(404).send({
//           message: "Emp with id: " + req.params.employeeCode + " ..not found!"
//         });
//       }
//       req.status(200).send(emp);
//     })
//     .catch(err => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "Emp with id: " + req.params.employeeCode + "--not found!"
//         });
//       }
//       return res.status(500).send({
//         message: "Error while retrieving the employee with id: " +
//           req.params.employeeCode
//       });
//     });
// };


// exports.getEmployeeBySearch = (req, res) => {
//   Employee.find({
//       employeeCode: req.params.employeeCode
//     })
//     .then(emps => {
//       console.log("the list of all the employees fetched are: " + emps);
//       res.status(200).send(emps);
//     })
//     .catch(err => {
//       return res.status(500).send({
//         message:
//           /*err.message || */
//           "Some error occured while retrieving the employees!"
//       });
//     });
// };


// try {
//   db.restaurant.updateOne(
//      { "name" : "Central Perk Cafe" },
//      { $set: { "violations" : 3 } }
//   );
// } catch (e) {
//   print(e);
// }



exports.updateEmployee = (req, res) => {
  // const emp = {
  //   employeeCode: req.body.employeeCode,
  //   firstname: req.body.firstname,
  //   middlename: req.body.middlename,
  //   lastname: req.body.lastname,
  //   domainName: req.body.domainName,
  //   email: req.body.email,
  //   regDate: req.body.regDate
  // };
  console.log("Employee Code: " + req.params.id);
  Employee.updateOne({
      "employeeCode": req.params.id
    }, {
      $set: {
        "firstname": req.body.firstname,
        "middlename": req.body.middlename,
        "lastname": req.body.lastname,
        "domainName": req.body.domainName,
        "email": req.body.email
      }
    })
    .then(emp => {
      res.send(emp);
    })
    .catch(err => {
      console.log(err);
    });
}


//Only sets "currentEmp" status to false.
exports.removeEmployee = (req, res) => {
  Employee.updateOne({
    employeeCode: req.params.id
  }, {
    $set: {
      "currentEmp": false
    }
  }).then(emp => res.send(emp)).catch(err => {
    console.log(err)
  });
}



// exports.updateEmployee = (req, res) => {
//   const emp = {
//     employeeCode: req.body.employeeCode,
//     firstname: req.body.firstname,
//     middlename: req.body.middlename,
//     lastname: req.body.lastname,
//     domainName: req.body.domainName,
//     email: req.body.email,
//     regDate: req.body.regDate
//   };
//   Employee.findByIdAndUpdate(req.bo, emp)
//     .then(emp => {
//       res.send(emp);
//     })
//     .catch(err => {
//       if (err.king === "ObjectId") {
//         return res.status(404).send({
//           message: "Note not found with id " + req.params.empId
//         });
//       }
//       return res.status(500).send({
//         message: err.message || "Error occured while updating the employee."
//       });
//     });
// };

exports.deleteEmployee = (req, res) => {
  Employee.findByIdAndRemove(req.params.empId)
    .then(emp => {
      if (!emp) {
        return res.status(404).send({
          message: "Emp with id " + req.params.empId + " not found."
        });
      }
      const delEmpDet = empDetCont.deleteEmpDet();
      console.log("Response of request to delete emp details: " + delEmpDet);
      //Also call employee details controller to delete the details of the employee.
      res.status(200).send({
        message: "Employee deleted successfully"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res
          .status(404)
          .send({
            message: "Emp with id " + req.params.empId + " not found."
          });
      }
      return res.status(500).send({
        message: "Error while deleting employee with id: " + req.params.empId
      });
    });
};