import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({example: 'someemail@emai.com', description: ''})
    readonly email:string;

    @ApiProperty({example: '12345', description: ''})
    readonly password:string;

}