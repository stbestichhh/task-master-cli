const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./taskmaster.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    deadline DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
  )`);
});

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
    db.serialize(() => {
      db.run(q, values, (err) => {
        if (err) {
          return console.log(err.message);
        }
        return console.log('Task has been added: ', this);
      });
    });
    db.close();
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

      db.close();
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
