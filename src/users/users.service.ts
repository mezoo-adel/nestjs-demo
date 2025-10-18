import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class UsersService {
  private users: UpdateUserDto[];
  private fileName = path.resolve('src/public/data/users.json');

  constructor() {
    this.users = JSON.parse(
      fs.readFileSync(this.fileName, 'utf-8'),
    ) as UpdateUserDto[];
  }

  create(createUserDto: CreateUserDto) {
    return { message: 'This action adds a new user', createUserDto };
  }

  findAll() {
    return this.users;
  }

  findOne(id: number): UpdateUserDto {
    const target = this.users.find((user: UpdateUserDto) => user.id == id);
    if (!target) {
      throw new NotFoundException('User not found');
    }
    return target;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const target: UpdateUserDto = this.findOne(id);
    const { name, email, role, age } = updateUserDto;
    Object.assign(target, { name, email, role, age });
    fs.writeFileSync(this.fileName, JSON.stringify(this.users, null, 2));
    return {
      message: `User with id ${id} has been updated`,
      target,
    };
  }

  remove(id: number) {
    const userIndex = this.users.findIndex(
      (user: UpdateUserDto) => user.id === id,
    );
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      fs.writeFileSync(this.fileName, JSON.stringify(this.users, null, 2));
      return { message: `User with id ${id} has been removed` };
    }
    throw new NotFoundException('User not found');
  }
}
