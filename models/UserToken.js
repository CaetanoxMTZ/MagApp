const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema({
  uuid: String,
  jwt: String,
});

const UserToken = mongoose.model('UserToken', userTokenSchema);

module.exports = { UserToken };
