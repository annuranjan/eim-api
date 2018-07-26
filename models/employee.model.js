const mongoose = require('mongoose');
const EmployeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employeeCode: {
        type: Number,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String,
        required: true
    },
    domainname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    regDate: {
        type: String
    },
    currentEmp: {
        type: Boolean,
        required: true
    }

});

module.exports = mongoose.model('Employee', EmployeeSchema, 'employees');