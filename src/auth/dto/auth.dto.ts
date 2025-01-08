import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({ example: 'johndoe@gmail.com', description: 'The member\'s email' })
    email: string;

    @ApiProperty({ description: 'The member\'s password' })
    password: string;
}