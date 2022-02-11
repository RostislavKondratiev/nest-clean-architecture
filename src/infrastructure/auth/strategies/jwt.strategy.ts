import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UnauthorizedException } from "src/domain/exceptions/exceptions";
import { UserDatabaseRepository } from "src/infrastructure/repositories/user/user-database.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private repository: UserDatabaseRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    async validate(payload: any, done: VerifiedCallback) {
        console.log(payload);
        const user = await this.repository.getUserByEmail(payload.email);
        if (!user) {
            return done(new UnauthorizedException('Session expired'), false);
        }
        return done(null, user, payload.iat);
    }
}