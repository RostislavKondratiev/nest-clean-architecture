import { BadRequestException } from "src/domain/exceptions/exceptions";
import { UserRepository } from "src/domain/repositories/user.repository";
import { CreateUserCommand } from "../user/commands/user.command";
import { UserFactory } from "../user/factory/user.factory";
import { HashStrategy } from "./strategies/hash.strategy";
import { TokenStrategy } from "./strategies/token.strategy";

export class RegisterUseCase {
    constructor(
        private userRepository: UserRepository,
        private hashStrategy: HashStrategy,
        private tokenStrategy: TokenStrategy
    ) {
    }

    async execute(userCommand: CreateUserCommand) {
        const userToFound = await this.userRepository.getUserByEmail(userCommand.email);
        if (userToFound) {
            throw new BadRequestException('User already exists');
        }
        userCommand.password = await this.hashStrategy.hash(userCommand.password);
        const user = await this.userRepository.saveUser(UserFactory.create(userCommand));
        const token = this.tokenStrategy.sign(
            {id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
        )
        const refreshToken = this.tokenStrategy.signRefresh({id: user.id});
        const encryptedRefreshToken = await this.hashStrategy.hash(refreshToken);
        await user.setRefreshToken(this.userRepository, encryptedRefreshToken);

        return { user, token, refreshToken };
    }
}   