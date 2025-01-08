import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchEntity } from './match.entity';
import { AuthGuard } from '../auth/auth.guard';
import { MatchDto } from './dto/match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/role.enum';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('matches')
export class MatchController {

    constructor(private readonly matchService: MatchService) {}

    @UseGuards(AuthGuard)
    @Get()
    @ApiOperation({ summary: 'Get all matches' })
    @ApiResponse({ status: 200, description: 'List of all matches.', type: [MatchEntity] })
    async getAllMatches(): Promise<MatchEntity[]> {
        return await this.matchService.getAllMatches();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Get specific match' })
    @ApiResponse({ status: 200, description: 'The match data.', type: MatchEntity })
    @ApiResponse({ status: 404, description: 'Match not found.' })
    async getOneMatch(@Param('id', ParseIntPipe) id: number): Promise<MatchEntity> {
        return await this.matchService.getOneMatch(id);
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnum.PLAYER)
    @Post(':id/registration')
    @ApiOperation({ summary: 'Register to specific match' })
    @ApiResponse({ status: 201, description: 'Successfully registered for the match.', schema: {
        type: 'object',
        properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'Inscription réussie au match n°6' },
            data: { type: 'object', example: { matchId: 6, memberId: 2 } },
        },
    }})
    @ApiResponse({ status: 400, description: 'Invalid match or member data.' })
    async registerToMatch(@Param('id', ParseIntPipe) id: number, @Request() req: Request) {
        const { matchId: registeredMatchId, memberId: registeredMemberId } = await this.matchService.registerMemberToMatch(id, req['member'].id);

        return this.createResponse(`Inscription réussie au match n°${registeredMatchId}`, { matchId: registeredMatchId, memberId: registeredMemberId });
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnum.PLAYER)
    @Delete(':id/registration')    
    @ApiOperation({ summary: 'Unregister to specific match' })
    @ApiResponse({ status: 200, description: 'Successfully unregistered from the match.', schema: {
        type: 'object',
        properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'Désinscription réussie du match n°6' },
            data: { type: 'object', example: { matchId: 6, memberId: 2 } },
        },
    }})
    @ApiResponse({ status: 400, description: 'Invalid match or member data.' })
    async unregisterToMatch(@Param('id', ParseIntPipe) id: number, @Request() req: Request) {
        const { matchId: unregisteredMatchId, memberId: unregisteredMemberId } = await this.matchService.unregisterMemberToMatch(id, req['member'].id);

        return this.createResponse(`Désinscription réussie du match n°${unregisteredMatchId}`, { matchId: unregisteredMatchId, memberId: unregisteredMemberId });
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnum.COACH)
    @Post()
    @ApiOperation({ summary: 'Add match' })
    @ApiResponse({ status: 201, description: 'Match successfully added.', type: MatchEntity })
    @ApiResponse({ status: 400, description: 'Invalid match data.' })
    async addMatch(@Body() matchDto: MatchDto): Promise<MatchEntity> {
        return await this.matchService.addMatch(matchDto);
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnum.COACH)
    @Patch(':id')
    @ApiOperation({ summary: 'Update specific match' })
    @ApiResponse({ status: 200, description: 'Match successfully updated.', type: MatchEntity })
    @ApiResponse({ status: 400, description: 'Invalid data provided for match update.' })
    @ApiResponse({ status: 404, description: 'Match not found.' })
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