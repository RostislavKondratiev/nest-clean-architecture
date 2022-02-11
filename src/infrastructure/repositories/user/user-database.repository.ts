import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/domain/model/user";
import { UserRepository } from "src/domain/repositories/user.repository";
import { UserMapper } from "src/infrastructure/mapper/user.mapper";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserDatabaseRepository implements UserRepository {

    constructor(@InjectModel('User') private userModel: Model<UserEntity>) {}

    async saveUser(user: User): Promise<User> {
        const userCreated = await new this.userModel(user).save();
        return UserMapper.toDomain(userCreated);
    }
    async getUser(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        return UserMapper.toDomain(user);
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).exec();
        return UserMapper.toDomain(user);
    }

    async setRefreshToken(id: string, refreshToken: string): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(id, { refreshToken }).exec();
        return UserMapper.toDomain(user);
    }

}