const mongoose = require('mongoose');

const EmployeeDetails = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pd_employeeCode: {
        type: Number,
        unique: true
    },
    pd_dob: {
        type: Date
    },
    pd_gender: {
        type: String
    },
    pd_nationality: {
        type: String
    },
    pd_bloodgroup: {
        type: String
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
    jd_salary: {
        type: Number
    },
    rd_empCode: {
        type: Number
    }
});

module.export = mongoose.model('EmployeeDetails', EmployeeDetails, 'employee-details');