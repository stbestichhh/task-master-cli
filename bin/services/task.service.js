const Task = require('../models/task.model.js');
const validateName = require('../utils/validation.js');

const addTask = async (title, description, deadline) => {
  try {
    validateName(title);
    const task = new Task({ title, description, deadline });
    await task.save();
    console.log('Task has been added.');
  } catch (err) {
    return console.log(err.message);
  }
};

const listTask = async () => {
  try {
    const tasks = await Task.find();
    console.log('Yout tasks list:');
    tasks.forEach((task) => console.log(task.getInfo()));
  } catch (err) {
    return console.log(err.message);
  }
};

const updateTask = async (name, properties) => {
  try {
    validateName(name);
    const task = await Task.findOne({ title: name });
    if (!task) {
      return console.error('Task not found with name: ', name);
    }
    for (const key in properties) {
      if (key !== '_') {
        task[key] = properties[key];
      }
    }
    await task.save();
    console.log('Task has been updated successfuly.');
  } catch (err) {
    return console.log(err.message);
  }
};

const deleteTask = async (name) => {
  try {
    validateName(name);
    const task = await Task.findOne({ title: name });
    if (!task) {
      return console.error('Task not found with name: ', name);
    }
    await task.remove();
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
