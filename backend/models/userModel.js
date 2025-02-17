const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: 'String',
      required: true,
      default:
        'https://res.cloudinary.com/dbed2fwkj/image/upload/v1684473904/chat%20system-101/user-default_r9lvjd.png',
    },
  },

  {
    timeStamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// to save password in hash or incrypted format
userSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
