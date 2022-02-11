import { Injectable } from "@nestjs/common";
import { HashStrategy } from "src/application/auth/strategies/hash.strategy";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashStrategy implements HashStrategy {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
    
}