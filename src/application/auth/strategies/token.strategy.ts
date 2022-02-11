import { SignCommand } from "../command/sign.command";

export interface TokenStrategy {
    sign(signCommand: SignCommand): string;

    signRefresh(signCommand: { id: string }): string

    decode(token: string): any;

    verify(token: string): any
}