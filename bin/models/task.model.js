const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  deadline: { type: String },
  status: { type: String },
});

module.exports = mongoose.model('Task', taskSchema);
