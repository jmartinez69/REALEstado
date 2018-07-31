const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  confirmed: { type: Boolean, default: false },
  avatar: { type: String, default: "https://image.flaticon.com/icons/svg/32/32438.svg" },
  confirmationCode: { type: String, unique: true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
