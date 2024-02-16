#!/usr/bin/env node

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./taskmaster.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXIST tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    deadline DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
  )`);
});

require('./models/task.model');
require('./commands/cli');

module.exports = db;