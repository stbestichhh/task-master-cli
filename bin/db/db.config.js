const { Sequelize, DataTypes } = require('sequelize');
const sqlite3 = require('sqlite3').verbose();
const os = require('os');
const path = require('path');
const homeDir = os.homedir();
const dbPath = path.join(homeDir, 'taskmaster.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      deadline DATE NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
});

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

(async () => {
  await sequelize.authenticate();
});

const TaskModel = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
});

(async () => {
  await TaskModel.sync({ force: true });
});

module.exports = TaskModel;
