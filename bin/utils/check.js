const { Task, TaskModel } = require('../models/task.model')

const changeStatus = (task_title) => {
  const status = { status: Task.status.overdue };
  TaskModel.update(status, {
    where: {
      title: task_title,
    },
  });
};

const checkDeadline = (task_props) => {
  const { title, deadline, status } = task_props;
  const date = deadline.split(' ');
  const [year, month, day] = date[0].split('-');

  const specifiedDate = new Date(year, month - 1, day);
  const current_date = new Date();

  if (specifiedDate < current_date && status !== Task.status.done) {
    changeStatus(title);
  }
};

module.exports = checkDeadline;
