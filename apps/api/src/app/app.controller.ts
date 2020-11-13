import { Controller, Get, Post, Body, Patch, Delete, Query } from '@nestjs/common';

import { User } from '../../../auth-users/src/app/interfaces/user.interface';
import { Users } from '../../../auth-users/src/app/interfaces/users.interface';
import { Login } from '../../../auth-users/src/app/interfaces/login.interface';

const state: Users = {
  users: [
    {
      id: 1,
      login: 'admin',
      firstname: 'Админ',
      lastname: 'Админ',
      password: 'admiN12',
      status: 'admin',
    },
    {
      id: 2,
      login: 'cj',
      firstname: 'си',
      lastname: 'джей',
      password: 'youWin4',
      status: 'user',
    }
  ]
};

@Controller()
export class AppController {
  @Post('register') public registerUser(@Body() user: User): User {
    const newUser: User = {
      ...user,
      status: 'user',
      id: state.users.length + 1,
    };
    state.users.push(newUser);
    return newUser;
  }

  @Post('login') public loginUser(@Body() user: Login): User | string {
    const find: User = state.users.find((_user: User): boolean => {
        return _user.login === user.login && _user.password === user.password;
      }
    );
    if (find) {
      return find;
    }
    return 'login failed';
  }

  @Get('users') public giveEachUser(): User[] {
    return state.users;
  }

  @Get('user') public getUser(@Query() query: any): User {
    const findedUser: User = state.users.find((user: User): boolean => user.login === query.login);
    return findedUser;
  }

  @Patch('edit-user') public editUser(@Body() user: User): User {
    const findedUserID: number = state.users.find((_user: User): boolean => _user.id === user.id).id;
    state.users[findedUserID - 1] = {
      ...user,
      status: user.status,
    };
    return state.users[findedUserID - 1];
  }

  @Delete('delete') public deleteUser(@Query() query: any): User[] {
    const findedUserID: number = state.users.findIndex((_user: User): boolean => _user.login === query.login);
    state.users.splice(findedUserID, 1);
    state.users.forEach((_user: User, index: number): void => {
      _user.id = index + 1;
    });
    return state.users;
  }

  @Patch('permission') public changeUserPermission(@Body() user: User): User {
    const findedUserID: number = state.users.find((_user: User): boolean => _user.id === user.id).id;
    state.users[findedUserID - 1] = {
      ...user,
    };
    return state.users[findedUserID - 1];
  }
}
