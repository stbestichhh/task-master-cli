const queries = {
  getAll: 'SELECT * FROM tasks',
  getOne: 'SELECT * FROM tasks WHERE title = ?',
  add: 'INSERT INTO tasks (title, description, deadline, status) VALUES (?, ?, ?, ?)',
  update: 'UPDATE tasks SET title = ?, description = ?, deadline = ?, status = ? WHERE title = ?',
  updateStatus: 'UPDATE tasks SET status = ? WHERE title = ?',
  delete: 'DELETE FROM tasks WHERE title = ?'
};

module.exports = queries;
