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

const listTask = async () => {
  try {
    const tasks = await Task.find();
    console.log('Yout tasks list:');
    tasks.forEach((task) => console.log(task.getInfo()));
  } catch (err) {
    return console.log(err.message);
  }
};
