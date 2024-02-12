#!/usr/bin/env node

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongodb_pass = process.env.MONGODB_PASS;

mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb+srv://stbestichhh:${mongodb_pass}@cluster0.i1n9ohq.mongodb.net/`)
  .then(() => console.log('Connection to mongodb has been established successfuly.'))
  .catch((err) => console.error('Mongodb connection failed.\n', err));

require('./models/task.model');
require('./commands/cli');
