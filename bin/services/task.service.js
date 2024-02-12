const Task = require('../models/task.model.js');

const addTask = async (title, description, deadline) => {
  try {
    const task = new Task({ title, description, deadline });
    await task.save();
    console.log('Task has been added.');
  } catch (err) {
    return console.log(err.message);
  }
};
