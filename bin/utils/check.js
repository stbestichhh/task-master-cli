const { db } = require('../models/task.model');

const changeStatus = (task_title) => {
  const q = 'UPDATE tasks SET status = ? WHERE title = ?';
  const status = 'deadline missed';
  const values = [status, task_title];
  db.prepare(q).run(values);
};

const checkDeadline = (task_props) => {
  const { title, deadline } = task_props;
  const [day, month, year] = deadline.split('-');

  const specifiedDate = new Date(year, month - 1, day);
  const current_date = new Date();

  if (specifiedDate < current_date) {
    changeStatus(title);
  }  
};

module.exports = checkDeadline;
