const { Task, db } = require('../models/task.model.js');
const validateName = require('../utils/validation.js');

const addTask = (task_name, description, deadline) => {
  validateName(task_name);
  const task = new Task({ title: task_name, description, deadline });
  task.save();
};

const listTask = () => {
  Task.list();
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
      db.serialize(() => {
        db.run(q, values, (err) => {
          if (err) {
            return console.log(err.message);
          }
          return console.log('Task has been updated.');
        });
      });
      db.close();
    });
};

const deleteTask = (task_name) => {
  const q = 'DELETE FROM tasks WHERE title = ?';
  db.serialize(() => {
    db.run(q, task_name, (err) => {
      if (err) {
        return console.log(err.message);
      }
      return console.log('Task has been deleted.');
    });
  });

  db.close();
};

module.exports = {
  addTask,
  listTask,
  updateTask,
  deleteTask,
};
