import { Injectable } from "@nestjs/common";
import { CompareStrategy } from "src/application/auth/strategies/compare.strategy";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptCompareStrategy implements CompareStrategy {
    async compare(given: string, expected: string): Promise<boolean> {
        return await bcrypt.compare(given, expected);
    }
}