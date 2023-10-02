import type { User } from '../Typings/User';

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema: Schema<User> = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  secret: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  roles: {
    type: [String],
    default: []
  },
}, {
  collection: 'users',
  versionKey: false
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password') || !user.password) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;