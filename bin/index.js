#!/usr/bin/env node
const { db } = require('../bin/models/task.model');

process.on('exit', () => db.close());

require('./commands/cli');
