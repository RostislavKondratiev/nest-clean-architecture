import { UnauthorizedException } from "src/domain/exceptions/exceptions";
import { UserRepository } from "src/domain/repositories/user.repository";
import { CompareStrategy } from "./strategies/compare.strategy";
import { HashStrategy } from "./strategies/hash.strategy";
import { TokenStrategy } from "./strategies/token.strategy";

export class RefreshTokenUseCase {
    constructor(
        private userRepository: UserRepository,
        private tokenStrategy: TokenStrategy,
        private compareStrategy: CompareStrategy,
        private hashStrategy: HashStrategy,
    ) {}

    async execute(refreshToken: string) {
        const { id } = this.tokenStrategy.decode(refreshToken);
        const user = await this.userRepository.getUser(id);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        console.log(refreshToken);
        console.log(user.refreshToken);
        if (!await this.compareStrategy.compare(refreshToken, user.refreshToken)) {
            throw new UnauthorizedException('Refresh token is not match');
        }
        await this.tokenStrategy.verify(refreshToken);
        const token = this.tokenStrategy.sign({id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName })
        const newRefreshToken = this.tokenStrategy.signRefresh({id: user.id});
        const encryptedRefreshToken = await this.hashStrategy.hash(newRefreshToken);
        await user.setRefreshToken(this.userRepository, encryptedRefreshToken);
        return { user, token, refreshToken };
    }
}