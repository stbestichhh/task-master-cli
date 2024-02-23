const { queries, db } = require('../db/index');
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
      const values = [this.title, this.description, this.deadline, this.status];
      db.prepare(queries.add).run(values);
      resolve();
    })
  }

  static get(name) {
    return new Promise((resolve) => {
      const row = db.prepare(queries.getOne).get(name);
      resolve(row);
    });
  }

  static list() {
    return new Promise((resolve) => {
        const rows = db.prepare(queries.getAll).all();
        resolve(rows);
    });
  }

  static update(name, props) {
    Task.get(name).then(task => {
      const { newTitle, newDescription, newDeadline, newStatus } = props;
      validateName(newTitle ?? task.title);
      const values = [
        newTitle ?? task.title,
        newDescription ?? task.description,
        newDeadline ?? task.deadline,
        newStatus ?? task.status,
        name
      ];
      db.prepare(queries.update).run(values);
    }).catch(error => {
      return console.log(error.message);
    });
  }

  static delete(name) {
    return new Promise((resolve) => {
      db.prepare(queries.delete).run(name);
      resolve();
    })
  }

  static drop() {
    return new Promise((resolve) => {
      db.prepare(queries.drop).run();
      resolve();
    })
  }
}

module.exports = {
  Task,
  db,
};
