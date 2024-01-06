import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';


import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { exec } from 'node:child_process';

@Injectable()
export class UsersService {
    constructor(
        @Inject('MONGO') private db: Db,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}


    getUsers() {
        return this.db.collection('users').find().toArray();
    }

    getUser(id: string) {
        if (!ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }
        const _id = new ObjectId(id);
        return this.db.collection('users').findOne({ _id });
    }

    findByEmail(email: string) {
        return this.userModel.findOne({ email }).exec();
    }

    async create(data: User): Promise<UserWithoutPassword> {
        const newModel = new this.userModel(data);
        const hashPassword = await bcrypt.hash(newModel.password, 10);
        newModel.password = hashPassword;
        const model = await newModel.save();
        const { password, ...rta } = model.toJSON();
        return rta;
      }


      update(id: string, changes: UpdateUserDto) {
        return this.userModel
          .findByIdAndUpdate(id, { $set: changes }, { new: true })
          .exec();
      }



}


