const validateName = require('../utils/validation.js');
const paint = require('../utils/paint.js');
const checkDeadline = require('../utils/check.js');

const addTask = (task_name, description, deadline) => {
  validateName(task_name);
  const task = new Task({ title: task_name, description, deadline });
  task.save();
};

const listTask = () => {
  Task.list().then((rows) => {
    console.log('Your tasks list:');
    rows.forEach((row) => {
      pickTask(row.title);
    });
  });
};

const pickTask = (task_name) => {
  Task.get(task_name)
    .then((props) => {
      checkDeadline(props);
      return Task.get(task_name);
    })
    .then((props) => {
      console.log(props);
    });
};

const getTaskListStatus = () => {
  Task.list().then((rows) => {
    rows.forEach((row) => {
      let { title, status } = row;
      title = paint(title);
      status = paint(status);
      console.log(`${title} is ${status}`);
    });
    return;
  });
  return;
};

const updateTask = (task_name, properties) => {
  Task.update(task_name, properties);
  return console.log('Task has been updated.');
};

const deleteTask = (task_name) => {
  Task.delete(task_name);
  console.log('Task has been deleted.');
};

module.exports = {
  addTask,
  listTask,
  pickTask,
  getTaskListStatus,
  updateTask,
  deleteTask,
};
