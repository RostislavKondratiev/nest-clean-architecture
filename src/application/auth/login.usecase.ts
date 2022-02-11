import { UnauthorizedException } from "src/domain/exceptions/exceptions";
import { UserRepository } from "src/domain/repositories/user.repository";
import { LoginCommand } from "./command/login.command";
import { CompareStrategy } from "./strategies/compare.strategy";
import { HashStrategy } from "./strategies/hash.strategy";
import { TokenStrategy } from "./strategies/token.strategy";

export class LoginUseCase {
    constructor(
        private userRepository: UserRepository,
        private compareStrategy: CompareStrategy,
        private tokenStrategy: TokenStrategy,
        private hashStrategy: HashStrategy
    ) {
    }

    async execute(loginCommand: LoginCommand) {
        const user = await this.userRepository.getUserByEmail(loginCommand.email);
        if (!user) {
            throw new UnauthorizedException('Cannot login with specified credentials');
        }
        if (await this.compareStrategy.compare(loginCommand.password, user.password)) {
            const token = this.tokenStrategy.sign({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName })
            const refreshToken = this.tokenStrategy.signRefresh({id: user.id});
            const encryptedRefreshToken = await this.hashStrategy.hash(refreshToken);
            await user.setRefreshToken(this.userRepository, encryptedRefreshToken);
            return { user, token, refreshToken };
        } else {
            throw new UnauthorizedException('Cannot login with specified credentials');
        }
    }
}