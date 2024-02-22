const { queries, db } = require('../db/index');

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

  static getProps(name) {
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
}

module.exports = {
  Task,
  db,
};
