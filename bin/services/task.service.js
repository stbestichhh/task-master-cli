const Task = require('../models/task.model.js');
const db = require('../index.js');
const validateName = require('../utils/validation.js');

const addTask = (title, description, deadline) => {
  const task = new Task({ title, description, deadline });
  task.save();
};

const listTask = async () => {
  Task.list();
};

const updateTask = (title, properties) => {
  const q = 'UPDATE tasks SET title = ?, description = ?, deadline = ?, status = ?';
  const { description, deadline, status } = properties;
  const values = [title, description, deadline, status];
  db.run(q, values, (err) => {
    if (err) {
      return console.log(err.message);
    }
    return console.log('Task has been updated.');
  });
};

const deleteTask = async (name) => {
  try {
    validateName(name);
    const task = await Task.findOne({ title: name });
    if (!task) {
      return console.error('Task not found with name: ', name);
    }
    await task.remove();
    return;
  } catch (err) {
    return console.log(err.message);
  }
};

module.exports = {
  addTask,
  listTask,
  updateTask,
  deleteTask,
};
