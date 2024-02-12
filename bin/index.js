#!/usr/bin/env node

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongodb_pass = process.env.MONGODB_PASS;

mongoose.Promise = global.Promise;

const db = mongoose.connect(
  `mongodb+srv://stbestichhh:${mongodb_pass}@cluster0.i1n9ohq.mongodb.net/`
);

module.exports = db;
