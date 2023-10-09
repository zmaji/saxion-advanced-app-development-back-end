import type { User } from '../Typings/User';

import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

const userSchema: Schema<User> = new Schema({
  userID: {
    type: String,
    default: uuidv4(),
    unique: true,
    immutable: true
  },
  userName: {
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
    required: true,
  },
  secret: {
    type: String,
    default: uuidv4(),
    immutable: true
  },
  avatar: {
    type: String,
    required: false,
  },
  roles: {
    type: [String],
    default: ['user'],
    immutable: true,
    required: false
  },
}, {
  collection: 'users',
  versionKey: false
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;