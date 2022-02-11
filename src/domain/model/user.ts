import { UnauthorizedException } from "../exceptions/exceptions";
import { UserRepository } from "../repositories/user.repository";

export class User {
    id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;

    private _refreshToken?: string;

    constructor(
        id: string, 
        email: string, 
        password: string,
        firstName: string,
        lastName: string,
        mobileNumber: string,
        refreshToken?: string
    ) {
        this.id = id;;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobileNumber = mobileNumber;
        this._refreshToken = refreshToken;
    }

    public get refreshToken(): string {
        return this._refreshToken;
    }

    public async setRefreshToken(repository: UserRepository, refreshToken: string): Promise<void> {
        try {
            await repository.setRefreshToken(this.id, refreshToken);
            this._refreshToken = refreshToken;
        } catch (err) {
            throw new UnauthorizedException('Cannot authenticate user');
        }
    }
}