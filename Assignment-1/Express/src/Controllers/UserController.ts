import type { User } from '../Typings/User';

import users from '../Data/Users';

const getUsers = (): User[] => {
  return users;
};

const getUsersByID = (userID: string): User | undefined => {
  return users.find((user) => user.id === userID);
};

const UserController = {
  getUsersByID,
  getUsers
};

export default UserController;