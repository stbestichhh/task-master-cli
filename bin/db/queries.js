const queries = {
  execute: `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    deadline DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
  )`,
  getAll: 'SELECT * FROM tasks',
  getOne: 'SELECT * FROM tasks WHERE title = ?',
  add: 'INSERT INTO tasks (title, description, deadline, status) VALUES (?, ?, ?, ?)',
  update: 'UPDATE tasks SET title = ?, description = ?, deadline = ?, status = ? WHERE title = ?',
  updateStatus: 'UPDATE tasks SET status = ? WHERE title = ?',
  delete: 'DELETE FROM tasks WHERE title = ?'
};

module.exports = queries;
