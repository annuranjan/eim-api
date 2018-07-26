const empDetails = require('../models/employeeDetails.model');
const mongoose = require('mongoose');

/*
app.get('/employees/:empId/details', employeeDetCont.getEmployeeDetails);
app.post('/employees/:empId/details', employeeDetCont.addEmployeeDetails);
app.put('/employees/:empId/details', employeeDetCont.updateEmployeeDetails);

/*
    employeeCode: Number,
    dob: Date,
    gender: String,
    nationality: String,
    bloodgroup: String,
    maritalStatus: String,
    category: String,
    religion: String,
    address: String,
    phone: Number,
        pd_employeeCode: {
        type: Number,
        required: true,
        unique: true
    },
    pd_dob: {
        type: Date,
        required: true
    },
    pd_gender: {
        type: String,
        required: true
    },
    pd_nationality: {
        type: String,
        required: true
    },
    pd_bloodgroup: {
        type: String,
        required: true,
        trim: true
    },
    pd_maritalStatus: {
        type: String
    },
    pd_category: {
        type: String
    },
    pd_religion: {
        type: String
    },
    cd_address: {
        type: String
    },
    cd_city: {
        type: String
    },
    cd_state: {
        type: String
    },
    cd_pincode: {
        type: String
    },
    cd_phone: {
        type: String
    },
    cd_oemail: {
        type: String
    },
    ed_relation: {
        type: String
    },
    ed_address: {
        type: String
    },
    ed_city: {
        type: String
    },
    ed_state: {
        type: String
    },
    ed_phone: {
        type: Number
    },
    id_passnum: {
        type: String
    },
    id_yoi: {
        type: String
    },
    id_yoe: {
        type: String
    },
    jd_empstatus: {
        type: String
    },
    jd_doj: {
        type: Date
    },
    jd_dol: {
        type: Date
    },
    jd_functions: {
        type: String
    },
    jd_dept: {
        type: String
    },
    jd_designation: {
        type: String
    },
    rd_empCode: {
        type: Number
    }
});
*/

exports.saveEmpDetails = (req, res) => {
    console.log("param: " + req.params.id);
    empDetails = new EmployeeDetails({
        _id: mongoose.Types.ObjectId(),
        employeeCode: req.params.id,
        pd_dob: req.body.pd_dob,
        pd_gender: req.body.pd_gender,
        pd_nationality: req.body.pd_nationality,
        pd_bloodgroup: req.body.pd_bloodgroup,
        pd_maritalStatus: req.body.pd_maritalStatus,
        pd_category: req.body.pd_category,
        pd_religion: req.body.pd_religion,
        cd_address: req.body.cd_address,
        cd_city: req.body.cd_city,
        cd_state: req.body.cd_state,
        cd_pincode: req.body.cd_pincode,
        cd_phone: req.body.cd_phone,
        cd_oemail: req.body.cd_oemail,
        ed_relation: req.body.ed_relation,
        ed_address: req.body.ed_address,
        ed_city: req.body.ed_city,
        ed_state: req.body.ed_state,
        ed_phone: req.body.ed_phone,
        id_passnum: req.body.id_passnum,
        id_yoi: req.body.id_yoi,
        id_yoe: req.body.id_yoe,
        jd_empstatus: req.body.jd_empstatus,
        jd_doj: req.body.jd_doj,
        jd_dol: req.body.jd_dol,
        jd_functions: req.body.jd_functions,
        jd_dept: req.body.jd_dept,
        jd_designation: req.body.jd_designation,
        rd_empCode: req.body.rd_empCode
    });
    console.log(empDetails);
    empDetails.save().then(() => {
        console.log("Employee details saved successfully!");
        return res.status(200).send(data);
    }).catch(error => {
        console.log(error);
        res.status(500).json(error)
    });
}
exports.deleteEmpDetails = (req, res) => {
    employeeDet.findByIdAndRemove({
        employeeCode: req.body.employeeCode
    }).then(empDet => {
        if (!empDet) {
            return res.status(404).send({
                message: "Details of employee with empCode: " + req.body.employeeCode
            })
        }
        res.status(200).send({
            message: "Employee details doesn't exist for employee with empCode: " + req.body.employeeCode
        });
    }).catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Employee details doesn't exist for employee with empCode: " + req.body.employeeCode
            });
        }
        return res.status(500).send({
            message: "There was some error while deleting the employee details of employee with empCode " + req.body.employeeCode
        });
    });
}

exports.getEmployeeDetails = (req, res) => {
    console.log("fetching all the emp details...");
}

exports.addEmployeeDetails = (req, res) => {

}

exports.updateEmployeeDetails = (req, res) => {

}