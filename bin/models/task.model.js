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
    const q = queries.add;
    const values = [this.title, this.description, this.deadline, this.status];
    try {
      db.prepare(q).run(values);
      return console.log('Task has been added');
    } catch (err) {
      return console.error(err.message);
    }
  }

  static get(name) {
    return new Promise((resolve, reject) => {
      const q = queries.getOne;
      try {
        const row = db.prepare(q).get(name);
        resolve(row);
      } catch (err) {
        reject(err);
        return console.error(err.message);
      }
    });
  }

  static list() {
    return new Promise((resolve, reject) => {
      const q = queries.getAll;
      try {
        const rows = db.prepare(q).all();
        resolve(rows);
      } catch (err) {
        console.log(err.message);
        reject(err);
      }
    });
  }

  static update(name, props) {
    Task.get(name).then((task) => {
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
    });
  }

  static delete() {}
}

module.exports = {
  Task,
  db,
};
