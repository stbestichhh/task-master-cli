const Database = require('better-sqlite3');
const db = new Database('taskmaster.db');

db.exec(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  deadline DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
)`);

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
      return console.log('Task has been added');
    } catch (err) {
      return console.error(err.message);
    }
  }

  static getProps(name) {
    return new Promise((resolve, reject) => {
      const q = 'SELECT * FROM tasks WHERE title = ?';
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
      const q = 'SELECT * FROM tasks';
      try {
        const rows = db.prepare(q).all();
        console.log('Your tasks list:');
        rows.forEach((row) => {
          console.log(row);
        });
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
