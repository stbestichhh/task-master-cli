const colors = require('colors');

const statuses = {
  done: 'done',
  pending: 'pending',
  overdue: 'deadline missed',
};

const status_colors = new Map([
  [statuses.done, colors.green],
  [statuses.pending, colors.blue],
  [statuses.overdue, colors.red],
]);

const paintStatus = (task_status) => {
  const color = status_colors.get(task_status);
  return color ? color(task_status) : task_status;
};

module.exports = paintStatus;
