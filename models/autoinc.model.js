const mongoose = require('mongoose');

const autoIncSchema = mongoose.Schema({
    _id: String,
    lastId: Number
});

module.exports = mongoose.model('AutoInc', autoIncSchema, 'autoinc');