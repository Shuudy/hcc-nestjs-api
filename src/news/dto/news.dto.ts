import { ApiProperty } from "@nestjs/swagger";

export class NewsDto {
    @ApiProperty({ example: 'The rules of handball are changing', description: 'The news name' })
    name: string;

    @ApiProperty({ example: 'In fact, the sport is set to change...', description: 'The news content' })
    content: string;
}