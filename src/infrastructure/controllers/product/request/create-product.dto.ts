import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsDefined()
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDefined()
    @IsNumber()
    price: number;
}
