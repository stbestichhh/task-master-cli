const TaskModel = require('../db/index');
const validateName = require('../utils/validation');

class Task {
  constructor({ title, description, deadline, status = 'pending' }) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }

  static status = {
    done: 'done',
    pending: 'pending',
    overdue: 'deadline missed',
  };

  save() {
    return new Promise((resolve) => {
      const values = {
        title: this.title,
        description: this.description,
        deadline: this.deadline,
        status: this.status,
      };
      TaskModel.create(values);
      resolve();
    })
  }

  static get(name) {
    return new Promise((resolve) => {
      const row = TaskModel.findOne({
        where: {
          title: name,
        },
      });
      resolve(row);
    });
  }

  static list() {
    return new Promise((resolve) => {
      const rows = TaskModel.findAll();
      resolve(rows);
    });
  }

  static update(name, props) {
    Task.get(name).then(task => {
      const { newTitle, newDescription, newDeadline, newStatus } = props;
      validateName(newTitle ?? task.title);
      const values = {
        title: newTitle ?? task.title,
        description: newDescription ?? task.description,
        deadline: newDeadline ?? task.deadline,
        status: newStatus ?? task.status,
      };
      TaskModel.update(values, {
        where: {
          title: name,
        },
      });
    }).catch(error => {
      return console.log(error.message);
    });
  }

  static delete(name) {
    return new Promise((resolve) => {
      TaskModel.destroy({
        where: {
          title: name,
        },
      });
      resolve();
    })
  }

  static drop() {
    return new Promise((resolve) => {
      TaskModel.drop();
      resolve();
    })
  }
}

module.exports = {
  Task,
  TaskModel,
};
