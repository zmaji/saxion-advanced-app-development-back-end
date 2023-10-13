import type { User } from '../../../Typings/User';

import { v4 as uuidv4 } from 'uuid';

export const userIndexData: User[] = [
  {
    userID: '5459313b-7db5-4565-8710-8aeece7c7f79',
    userName: 'zmaji',
    email: 'admin@saxion.nl',
    password: 'adminPassword',
    secret: uuidv4(),
    avatar: 'test',
    roles: [
      'user',
      'admin',
    ],
  },
  {
    userID: 'a913eae9-0dd5-4a3e-8b5e-e72ba158bedf',
    userName: 'Gardif',
    email: 'user@saxion.nl',
    password: 'userPassword',
    secret: uuidv4(),
    avatar: 'test',
    roles: [
      'user',
    ],
  },
];
