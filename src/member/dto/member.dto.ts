import { ApiProperty } from "@nestjs/swagger";

export class MemberDto {
    @ApiProperty({ example: 'John', description: 'The member\'s first name' })
    firstname: string;

    @ApiProperty({ example: 'Doe', description: 'The member\'s last name' })
    lastname: string;

    @ApiProperty({ example: 'johndoe@gmail.com', description: 'The member\'s email' })
    email: string;

    @ApiProperty({ description: 'The member\'s password' })
    password: string;
}