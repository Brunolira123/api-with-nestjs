import { IsNotEmpty } from 'class-validator'

export class UpdatePlayerDTO {

    @IsNotEmpty()
    readonly telefoneCelular: string;
    @IsNotEmpty()
    readonly nome: string;
}