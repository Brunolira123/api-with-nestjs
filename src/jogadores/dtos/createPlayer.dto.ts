import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreatePlayerDTO {

    @IsNotEmpty()
    readonly telefoneCelular: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly nome: string;
}