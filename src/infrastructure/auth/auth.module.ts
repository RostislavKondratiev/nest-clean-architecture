import { Module } from "@nestjs/common";
import { RepositoriesModule } from "../repositories/repositories.module";
import { BcryptCompareStrategy } from "./strategies/bcrypt-compare.strategy";
import { BcryptHashStrategy } from "./strategies/bcrypt-hash.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtTokenStrategy } from "./strategies/jwt-token.strategy";

@Module({
    imports: [
        RepositoriesModule,
    ],
    providers: [
        BcryptCompareStrategy,
        BcryptHashStrategy,
        JwtTokenStrategy,
        JwtStrategy
    ],
    exports: [
        BcryptCompareStrategy,
        BcryptHashStrategy,
        JwtTokenStrategy,
        JwtStrategy
    ]
})
export class AuthModule {}