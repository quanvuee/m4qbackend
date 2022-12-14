import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUser } from './dto/create-user';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  removePassword(user: UserDocument): User {
    const resUser = user.toJSON();
    delete resUser.hashPassword;
    return resUser;
  }
  async findOne(username: string): Promise<User | undefined> {
    const findUser = await this.userModel.findOne({ username: username });
    return this.removePassword(findUser);
  }

  async signUp(userDto: CreateUser): Promise<any> {
    if (await this.userModel.findOne({ username: userDto.username })) {
      throw new ConflictException();
    }
    const hassPw = await bcrypt.hash(userDto.password, 10);
    const userData = { username: userDto.username, hashPassword: hassPw };
    const createUser = await this.userModel.create(userData);
    return this.removePassword(createUser);
  }

  async findAll(): Promise<User[]> {
    const findUsers = await this.userModel.find().exec();
    const resUsers: User[] = [];
    if (findUsers) {
      findUsers.forEach((user) => {
        resUsers.push(this.removePassword(user));
      });
    }
    return resUsers;
  }

  async delete(username: string) {
    await this.userModel.findOneAndDelete({ username: username });
  }

  async findOneWithHassPw(username:string){
    const findUser = await this.userModel.findOne({ username });
    return findUser && findUser.toJSON();
  }
}
