import { User } from "src/domain/model/user";
import { UserEntity } from '../repositories/user/entities/user.entity';

export class UserMapper {
    static toDomain(userEntity: UserEntity): User {
        if(!userEntity) {
            return null;
        }
        const user = new User(
            userEntity.id,
            userEntity.email,
            userEntity.password,
            userEntity.firstName,
            userEntity.lastName,
            userEntity.mobileNumber,
            userEntity.refreshToken
        );
        return user;
    }
}