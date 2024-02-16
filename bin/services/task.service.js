const Task = require('../models/task.model.js');
const db = require('../index.js');
const validateName = require('../utils/validation.js');

const addTask = (title, description, deadline) => {
  validateName(title);
  const task = new Task({ title, description, deadline });
  task.save();
};

const listTask = async () => {
  Task.list();
};

const updateTask = (title, properties) => {
  const q = 'UPDATE tasks SET title = ?, description = ?, deadline = ?, status = ? WHERE title = ?';
  const { newTitle, newDescription, newDeadline, newStatus } = properties;
  validateName(newTitle);
  const values = [newTitle, newDescription, newDeadline, newStatus, title];
  db.run(q, values, (err) => {
    if (err) {
      return console.log(err.message);
    }
    return console.log('Task has been updated.');
  });
};

const deleteTask = (title) => {
  const q = 'DELETE FROM tasks WHERE title = ?';
  db.run(q, title, (err) => {
    if (err) {
      return console.log(err.message);
    }
    return console.log('Task has been deleted.');
  });
};

module.exports = {
  addTask,
  listTask,
  updateTask,
  deleteTask,
};
