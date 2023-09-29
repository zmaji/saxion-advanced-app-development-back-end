import type { User } from '../Typings/User';

import mongoose, { Schema } from 'mongoose';

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
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
}, {
  collection: 'users',
  versionKey: false
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;