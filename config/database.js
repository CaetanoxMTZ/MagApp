const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
require('dotenv').config()

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sequelize = new Sequelize(process.env.POSTGRES);

module.exports = { mongoose, sequelize };
