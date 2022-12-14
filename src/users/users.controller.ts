import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUser } from './dto/create-user';
import { UserDocument } from './schema/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @Get(':username')
  async findOne(@Param() param) {
    return this.userService.findOne(param.username);
  }
  @Delete(':username')
  async delete(@Param() { username }) {
    return this.userService.delete(username);
  }
}
