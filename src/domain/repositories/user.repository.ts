import { User } from "../model/user";

export interface UserRepository {

    saveUser(user: User): Promise<User>;

    getUser(id: string): Promise<User>;

    getUserByEmail(email: string): Promise<User>;

    setRefreshToken(id: string, refreshToken: string): Promise<User>;
}