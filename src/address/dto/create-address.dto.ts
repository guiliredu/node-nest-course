import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
    @IsNumber()
    readonly cep: number;

    @IsString()
    readonly address: string;

    @IsString()
    readonly city: string;

    @IsString()
    readonly state: string;
}
