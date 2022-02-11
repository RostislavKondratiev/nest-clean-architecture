import { NotFoundException } from "src/domain/exceptions/exceptions";
import { UserRepository } from "src/domain/repositories/user.repository";
import { TokenStrategy } from "./strategies/token.strategy";

export class LogoutUseCase {
    constructor(
        private userRepository: UserRepository,
        private tokenStrategy: TokenStrategy,
    ) {}

    async execute(token: string) {
        try {
            console.log(token);
            const { id } = this.tokenStrategy.decode(token);
            await this.userRepository.setRefreshToken(id, null);
        } catch {
            throw new NotFoundException('Cannot logout specified user')
        }
    }
}