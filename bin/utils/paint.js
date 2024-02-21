const colors = require('colors');

const str_statuses = {
  done: 'done',
  pending: 'pending',
  overdue: 'deadline missed',  
};

const status_colors = new Map([
  [str_statuses.done, colors.green],
  [str_statuses.pending, colors.blue],
  [str_statuses.overdue, colors.red],
]);

const paint = (str) => {
  const color = status_colors.get(str);
  return color ? color(str) : colors.yellow(str);
};

module.exports = paint;
