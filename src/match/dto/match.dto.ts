import { ApiProperty } from "@nestjs/swagger";

export class MatchDto {
    @ApiProperty({ example: '2024-11-24T17:09:17.000Z', description: 'The date of the match.' })
    match_date: Date;
}