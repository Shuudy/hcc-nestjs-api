import { ApiProperty } from "@nestjs/swagger";

export class UpdateMatchDto {
    @ApiProperty({ example: '2024-11-24T17:09:17.000Z', description: 'The date of the match.' })
    match_date?: Date;

    @ApiProperty({ example: 5, description: 'The first team score.' })
    team1_score?: number;

    @ApiProperty({ example: 8, description: 'The second team score.' })
    team2_score?: number;
}