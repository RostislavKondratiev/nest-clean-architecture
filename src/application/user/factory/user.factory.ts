import { User } from "src/domain/model/user";
import { CreateUserCommand } from "../commands/user.command";

export class UserFactory {
    static create(user: CreateUserCommand): User {
        return new User(
            '',
            user.email,
            user.password,
            user.firstName,
            user.lastName,
            user.mobileNumber
        )
    }
}