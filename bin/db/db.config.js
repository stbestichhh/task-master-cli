const Database = require('better-sqlite3');
const db = new Database('taskmaster.db');
const queries = require('./queries');

db.exec(queries.execute);

module.exports = db;
