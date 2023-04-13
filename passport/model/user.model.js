const { default: mongoose } = require('mongoose');
const User = new mongoose.Schema({
  fullName: {type: String, required: true},
  username: {type: String, required: true, unique: true },
  password: {type: String, required: true},
});

const userModel = mongoose.model('User', User);
module.exports  = {
  userModel
}