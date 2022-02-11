import { DynamicModule, Module } from "@nestjs/common";
import { LoginUseCase } from "src/application/auth/login.usecase";
import { IException } from "src/domain/exceptions/exceptions.interface";
import { RepositoriesModule } from "../repositories/repositories.module";
import { UserDatabaseRepository } from "../repositories/user/user-database.repository";
import { BcryptCompareStrategy } from "../auth/strategies/bcrypt-compare.strategy";
import { UseCaseProxy } from "./use-case-proxy";
import { AuthModule } from "../auth/auth.module";
import { JwtTokenStrategy } from "../auth/strategies/jwt-token.strategy";
import { BcryptHashStrategy } from "../auth/strategies/bcrypt-hash.strategy";
import { RegisterUseCase } from "src/application/auth/register.usecase";
import { HashStrategy } from "src/application/auth/strategies/hash.strategy";
import { RefreshTokenUseCase } from "src/application/auth/refresh-token.usecase";
import { LogoutUseCase } from "src/application/auth/logout.usecase";

@Module({
    imports: [
        RepositoriesModule,
        AuthModule,
    ]
})
export class AuthUseCaseProxyModule {
    static LOGIN_USECASE_PROXY = 'loginUsecaseProxy';
    static REGISTER_USECASE_PROXY = 'registerUsecaseProxy';
    static REFRESH_ACCESS_TOKEN_USECASE_PROXY = 'refreshAccessTokenUsecaseProxy';
    static LOGOUT_USECASE_PROXY = 'logoutUsecaseProxy';

    static register(): DynamicModule {
        return {
            module: AuthUseCaseProxyModule,
            providers: [
                {
                    inject: [UserDatabaseRepository, BcryptCompareStrategy, JwtTokenStrategy, BcryptHashStrategy],
                    provide: AuthUseCaseProxyModule.LOGIN_USECASE_PROXY,
                    useFactory: (repository: UserDatabaseRepository, compareStrategy: BcryptCompareStrategy, tokenStrategy: JwtTokenStrategy, hashStrategy: BcryptHashStrategy ) => {
                        return new UseCaseProxy(new LoginUseCase(repository, compareStrategy, tokenStrategy, hashStrategy));
                    }
                },
                {
                    inject: [UserDatabaseRepository, BcryptHashStrategy, JwtTokenStrategy],
                    provide: AuthUseCaseProxyModule.REGISTER_USECASE_PROXY,
                    useFactory: (repository: UserDatabaseRepository, hashStrategy: BcryptHashStrategy, tokenStrategy: JwtTokenStrategy) => {
                        return new UseCaseProxy(new RegisterUseCase(repository, hashStrategy, tokenStrategy));
                    }
                },
                {
                    inject: [UserDatabaseRepository, JwtTokenStrategy, BcryptCompareStrategy, BcryptHashStrategy],
                    provide: AuthUseCaseProxyModule.REFRESH_ACCESS_TOKEN_USECASE_PROXY,
                    useFactory: (repository: UserDatabaseRepository, tokenStrategy: JwtTokenStrategy, compareStrategy: BcryptCompareStrategy, hashStrategy: BcryptHashStrategy) => {
                        return new UseCaseProxy(new RefreshTokenUseCase(repository, tokenStrategy, compareStrategy, hashStrategy));
                    }
                },
                {
                    inject: [UserDatabaseRepository, JwtTokenStrategy],
                    provide: AuthUseCaseProxyModule.LOGOUT_USECASE_PROXY,
                    useFactory: (repository: UserDatabaseRepository, tokenStrategy: JwtTokenStrategy) => {
                        return new UseCaseProxy(new LogoutUseCase(repository, tokenStrategy))
                    }
                }
            ],
            exports: [
                AuthUseCaseProxyModule.LOGIN_USECASE_PROXY,
                AuthUseCaseProxyModule.REGISTER_USECASE_PROXY,
                AuthUseCaseProxyModule.REFRESH_ACCESS_TOKEN_USECASE_PROXY,
                AuthUseCaseProxyModule.LOGOUT_USECASE_PROXY
            ]
        }
    }
}