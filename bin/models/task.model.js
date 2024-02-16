const db = require('../index.js');

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
    db.run(q, values, (err) => {
      if (err) {
        return console.log(err.message);
      }
      return console.log('Task has been added: ', this);
    });
  }

  static getAll() {
    const q = 'SELECT * FROM tasks';
    db.run(q, (err, rows) => {
      if (err) {
        return console.log(err.message);
      }
      rows.forEach((row) => {
        console.log(row);
      });
      return;
    });
  }
}
