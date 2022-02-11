import { Injectable } from "@nestjs/common";
import { sign, decode, verify } from "jsonwebtoken";
import { SignCommand } from "src/application/auth/command/sign.command";
import { TokenStrategy } from "src/application/auth/strategies/token.strategy";
import { UnauthorizedException } from "src/domain/exceptions/exceptions";

@Injectable()
export class JwtTokenStrategy implements TokenStrategy {
    sign(signCommand: SignCommand): string {
        return sign(signCommand, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    }

    signRefresh(signCommand: { id: string }): string {
        return sign(signCommand, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });
    }

    decode(token: string): any {
        return decode(token);
    }

    verify(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            verify(token, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
                if (err) {
                    throw new UnauthorizedException('Cannot verify refresh token')
                }
                resolve(decoded);
            })
        });
    }
}