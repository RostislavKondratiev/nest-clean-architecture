import { Exclude, Expose } from "class-transformer";
import { User } from "src/domain/model/user";

@Exclude()
export class AuthPresenter {
    @Expose()
    user: Partial<User>;

    @Expose()
    token: string;

    @Expose()
    refreshToken: string;


    constructor(user: User, token: string, refreshToken: string) {
        this.user = {
            id: user.id,
            email: user.email
        }
        this.token = token;
        this.refreshToken = refreshToken;
    }
}