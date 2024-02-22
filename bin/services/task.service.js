const validateName = require('../utils/validation.js');
const paint = require('../utils/paint.js');
const checkDeadline = require('../utils/check.js');
const { Task } = require('../models/task.model.js');

const addTask = (task_name, description, deadline) => {
  validateName(task_name);
  const task = new Task({ title: task_name, description, deadline });
  task.save()
    .then(() => console.log('Task has been added'))
    .catch(error => console.log(error.message));
};

const listTask = () => {
  Task.list().then(rows => {
    if(!rows.length) {
      return console.log('Your list is empty.');
    }
    console.log('Your tasks list:');
    rows.forEach(row => {
      pickTask(row.title);
    });
  }).catch(error => {
    return console.log(error.message);
  });
};

const pickTask = (task_name) => {
  Task.get(task_name)
    .then(props => {
      checkDeadline(props);
      return Task.get(task_name);
    })
    .then(props => {
      console.log(props);
    })
    .catch(error => {
      return console.log(error.message);
    });
};

const getTaskListStatus = () => {
  Task.list().then(rows => {
    rows.forEach(row => {
      let { title, status } = row;
      title = paint(title);
      status = paint(status);
      console.log(`${title} is ${status}`);
    });
  }).catch(error => {
    return console.log(error.message);
  });
};

const updateTask = (task_name, properties) => {
  Task.update(task_name, properties);
  return console.log('Task has been updated.');
};

const deleteTask = (task_name) => {
  Task.delete(task_name).catch(error => {
    return console.log(error.message);
  });
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
