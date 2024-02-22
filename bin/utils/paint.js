const colors = require("colors");

const task_statuses = {
  done: "done",
  pending: "pending",
  overdue: "deadline missed",
};

const status_colors = new Map([
  [task_statuses.done, colors.green],
  [task_statuses.pending, colors.blue],
  [task_statuses.overdue, colors.red],
]);

const paint = (str) => {
  const color = status_colors.get(str);
  return color ? color(str) : colors.yellow(str);
};

module.exports = paint;
