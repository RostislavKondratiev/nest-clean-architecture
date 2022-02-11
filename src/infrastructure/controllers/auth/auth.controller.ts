import { Body, Headers, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { LoginUseCase } from "src/application/auth/login.usecase";
import { LogoutUseCase } from "src/application/auth/logout.usecase";
import { RefreshTokenUseCase } from "src/application/auth/refresh-token.usecase";
import { RegisterUseCase } from "src/application/auth/register.usecase";
import { AuthUseCaseProxyModule } from "src/infrastructure/use-cases-proxy/auth-use-case-proxy.module";
import { UseCaseProxy } from "src/infrastructure/use-cases-proxy/use-case-proxy";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { AuthPresenter } from "./presenters/auth.presenter";
import { LoginDto } from "./request/login.dto";
import { RefreshTokenDto } from "./request/refresh-token.dto";
import { RegisterUserDto } from "./request/register-user.dto";

@Controller('auth')
export class AuthController {

    constructor(
        @Inject(AuthUseCaseProxyModule.LOGIN_USECASE_PROXY)
        private readonly loginUseCase: UseCaseProxy<LoginUseCase>,
        @Inject(AuthUseCaseProxyModule.REGISTER_USECASE_PROXY)
        private readonly registerUseCase: UseCaseProxy<RegisterUseCase>,
        @Inject(AuthUseCaseProxyModule.REFRESH_ACCESS_TOKEN_USECASE_PROXY)
        private readonly refreshTokenUseCase: UseCaseProxy<RefreshTokenUseCase>,
        @Inject(AuthUseCaseProxyModule.LOGOUT_USECASE_PROXY)
        private readonly logoutUseCase: UseCaseProxy<LogoutUseCase>,
    ) {
        
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        const { user, token, refreshToken } = await this.registerUseCase.getInstance().execute(registerUserDto);
        return new AuthPresenter(user, token, refreshToken);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const { user, token, refreshToken } = await this.loginUseCase.getInstance().execute(loginDto);
        return new AuthPresenter(user, token, refreshToken);
    }

    @Post('refreshToken')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        const { user, token, refreshToken } = await this.refreshTokenUseCase.getInstance().execute(refreshTokenDto.refreshToken);
        return new AuthPresenter(user, token, refreshToken);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Headers('Authorization') accessToken: string) {
        await this.logoutUseCase.getInstance().execute(accessToken.replace('Bearer ', ''))
        return 'Successfully logged out';
    }
}