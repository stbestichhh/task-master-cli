const Database = require('better-sqlite3');
const db = new Database('taskmaster.db');

class Task {
  constructor({ title, description, deadline, status = 'pending' }) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }

  save() {
    const q = 'INSERT INTO tasks (title, description, deadline, status) VALUES (?, ?, ?, ?)';
    const values = [this.title, this.description, this.deadline, this.status];
    try {
      db.prepare(q).run(values);
      return console.log('Task has been added\n', this);
    } catch (err) {
      return console.error(err.message);
    }
  }

  static getProps(name) {
    return new Promise((resolve, reject) => {
      const q = 'SELECT * FROM tasks WHERE title = ?';
      db.serialize(() => {
        db.get(q, name, (err, row) => {
          if (err) {
            reject();
            return console.log(err.message);
          }
          resolve(row);
        });
      });
    });
  }

  static list() {
    const q = 'SELECT * FROM tasks';
    db.serialize(() => {
      db.all(q, (err, rows) => {
        if (err) {
          return console.log(err.message);
        }
        rows.forEach((row) => {
          console.log(row);
        });
        return;
      });
    });
    db.close();
  }
}

module.exports = {
  Task,
  db,
};
