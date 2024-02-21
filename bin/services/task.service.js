const { Task, db } = require('../models/task.model.js');
const validateName = require('../utils/validation.js');

const addTask = (task_name, description, deadline) => {
  validateName(task_name);
  const task = new Task({ title: task_name, description, deadline });
  task.save();
};

const listTask = () => {
  Task.list().then((rows) => {
    console.log('Your tasks list:');
    rows.forEach((row) => {
      console.log(row);
    });
  });
  return;
};

const pickTask = (task_name) => {
  Task.getProps(task_name).then((props) => {
    return console.log(props);
  });
};

const getTaskListStatus = () => {
  const task_status = new Map();
  Task.list().then((rows) => {
    rows.forEach((row) => {
      const { title, status } = row;      
      task_status.set(title, status);
    });
    return console.log(Object.fromEntries(task_status));
  });
};

const updateTask = (task_name, properties) => {
  const q = 'UPDATE tasks SET title = ?, description = ?, deadline = ?, status = ? WHERE title = ?';
  let title, description, deadline, status;
  Task.getProps(task_name)
    .then((props) => {
      title = props.title;
      description = props.description;
      deadline = props.deadline;
      status = props.status;
    })
    .then(() => {
      const { newTitle, newDescription, newDeadline, newStatus } = properties;
      validateName(newTitle ?? title);
      const values = [
        newTitle ?? title,
        newDescription ?? description,
        newDeadline ?? deadline,
        newStatus ?? status,
        task_name,
      ];
      db.prepare(q).run(values);
      return console.log('Task has been updated.');
    });
};

const deleteTask = (task_name) => {
  const q = 'DELETE FROM tasks WHERE title = ?';
  try {
    db.prepare(q).run(task_name);
    console.log('Task has been deleted.');
  } catch (err) {
    return console.log(err.message);
  }
};

module.exports = {
  addTask,
  listTask,
  pickTask,
  getTaskListStatus,
  updateTask,
  deleteTask,
};
