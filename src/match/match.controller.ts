import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchEntity } from './match.entity';

@Controller('matches')
export class MatchController {

    constructor(private readonly matchService: MatchService) {}

    @Get()
    async getAllMatches(): Promise<MatchEntity[]> {
        return await this.matchService.getAllMatches();
    }

    @Get(':id')
    async getOneMatch(@Param('id', ParseIntPipe) id: number): Promise<MatchEntity> {
        return await this.matchService.getOneMatch(id);
    }
}
