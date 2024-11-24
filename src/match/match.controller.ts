import { Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchEntity } from './match.entity';
import { AuthGuard } from '../auth/auth.guard';

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

    @UseGuards(AuthGuard)
    @Post(':id/register')
    async registerToMatch(@Param('id', ParseIntPipe) id: number, @Request() req: Request) {
        const { matchId: registeredMatchId, memberId: registeredMemberId } = await this.matchService.registerMemberToMatch(id, req['member'].id);

        return {
            status: 'success',
            message: `Inscription réussie au match n°${registeredMatchId}`,
            data: {
                matchId: registeredMatchId,
                memberId: registeredMemberId
            }
        };
    }
}