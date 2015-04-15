var mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({}, {strict: false}));
