var mongoose = require('mongoose')
var passwordHash = require('password-hash');


// mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  isDelete: {
    type: Boolean,
    required: false,
    default: false
  }
});

module.exports = mongoose.model('User', UserSchema);