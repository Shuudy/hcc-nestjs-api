import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchEntity } from './match.entity';
import { AuthGuard } from '../auth/auth.guard';
import { MatchDto } from './dto/match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/role.enum';

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
    @Roles(RoleEnum.PLAYER)
    @Post(':id/registration')
    async registerToMatch(@Param('id', ParseIntPipe) id: number, @Request() req: Request) {
        const { matchId: registeredMatchId, memberId: registeredMemberId } = await this.matchService.registerMemberToMatch(id, req['member'].id);

        return this.createResponse(`Inscription réussie au match n°${registeredMatchId}`, { matchId: registeredMatchId, memberId: registeredMemberId });
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnum.PLAYER)
    @Delete(':id/registration')
    async unregisterToMatch(@Param('id', ParseIntPipe) id: number, @Request() req: Request) {
        const { matchId: unregisteredMatchId, memberId: unregisteredMemberId } = await this.matchService.unregisterMemberToMatch(id, req['member'].id);

        return this.createResponse(`Désinscription réussie du match n°${unregisteredMatchId}`, { matchId: unregisteredMatchId, memberId: unregisteredMemberId });
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnum.COACH)
    @Post()
    async addMatch(@Body() matchDto: MatchDto): Promise<MatchEntity> {
        return await this.matchService.addMatch(matchDto);
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnum.COACH)
    @Patch(':id')
    async updateMatch(@Param('id', ParseIntPipe) id: number, @Body() matchDto: UpdateMatchDto): Promise<MatchEntity> {
        return await this.matchService.updateMatch(id, matchDto);
    }

    private createResponse(message: string, data: Record<string, any>)
    : { status: string, message: string, data: Record<string, any> } {
        return {
            status: 'success',
            message,
            data
        };
    }
}