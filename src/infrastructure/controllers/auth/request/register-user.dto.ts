import { IsDefined, IsEmail, IsString, MinLength } from "class-validator";


export class RegisterUserDto {
    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @MinLength(6)
    password: string;

    @IsDefined()
    @IsString()
    firstName: string;

    @IsDefined()
    @IsString()
    lastName: string;

    @IsDefined()
    @IsString()
    mobileNumber: string
}