const colors = require("colors");
const { Task } = require('../models/task.model');

const status_colors = new Map([
  [Task.status.done, colors.green],
  [Task.status.pending, colors.blue],
  [Task.status.overdue, colors.red],
]);

const paint = (str) => {
  const color = status_colors.get(str);
  return color ? color(str) : colors.yellow(str);
};

module.exports = paint;
