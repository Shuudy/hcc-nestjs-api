import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MatchEntity } from './match.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from '../member/member.entity';
import { MatchDto } from './match.dto';
import { EditMatchDto } from './edit-match.dto';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(MatchEntity)
        private matchRepository: Repository<MatchEntity>,

        @InjectRepository(MemberEntity)
        private memberRepository: Repository<MemberEntity>
    ) {}

    async getAllMatches(): Promise<MatchEntity[]> {
        return await this.matchRepository
        .createQueryBuilder('match')
        .leftJoinAndSelect('match.members', 'member')
        .select([
            'match.id',
            'match.team1_score',
            'match.team2_score',
            'match.match_date', 
            'member.id'
        ])
        .getMany();
    }

    async getOneMatch(id: number): Promise<MatchEntity> {
        const match = await this.matchRepository
        .createQueryBuilder('match')
        .leftJoinAndSelect('match.members', 'member')
        .select([
            'match.id',
            'match.team1_score',
            'match.team2_score',
            'match.match_date', 
            'member.id'
        ])
        .where('match.id = :id', { id })
        .getOne();
        
        if (!match) {
            throw new NotFoundException(`Match avec l'ID ${id} non trouvé`); 
        }
        
        return match;
    }

    async registerMemberToMatch(matchId: number, memberId: number): Promise<{ matchId: number, memberId: number }> {
        const match = await this.matchRepository.findOne({ where: { id: matchId }, relations: ['members'] });
        if (!match) {
            throw new NotFoundException('Match non trouvé');
        }

        const member = await this.memberRepository.findOne({ where: { id: memberId } });
        if (!member) {
            throw new NotFoundException();
        }

        if (match.members.some((m) => m.id === member.id)) {
            throw new BadRequestException('Vous êtes déjà inscrit à ce match');
        }

        match.members.push(member);
        await this.matchRepository.save(match);

        return { matchId: match.id, memberId: member.id };
    }

    async unregisterMemberToMatch(matchId: number, memberId: number): Promise<{ matchId: number, memberId: number }> {
        const match = await this.matchRepository.findOne({ where: { id: matchId }, relations: ['members'] });
        if (!match) {
            throw new NotFoundException('Match non trouvé');
        }

        const member = await this.memberRepository.findOne({ where: { id: memberId } });
        if (!member) {
            throw new NotFoundException();
        }

        if (!match.members.some((m) => m.id === member.id)) {
            throw new BadRequestException('Vous n\'êtes pas inscrit à ce match');
        }

        match.members = match.members.filter((m) => m.id !== member.id);
        await this.matchRepository.save(match);

        return { matchId: match.id, memberId: member.id };
    }

    async addMatch(matchDto: MatchDto): Promise<MatchEntity> {
        const matchDate = await this.validateAndCheckDate(matchDto.match_date);

        const newMatchEntity = this.matchRepository.create({ match_date: matchDate });
        return await this.matchRepository.save(newMatchEntity);
    }

    async editMatch(id: number, matchDto: EditMatchDto): Promise<MatchEntity> {        
        const match = await this.matchRepository.findOne({ where: { id } });
        if (!match) {            
            throw new NotFoundException();
        }

        if (!matchDto.match_date && !matchDto.team1_score && !matchDto.team2_score) {
            throw new BadRequestException('Aucune donnée à modifier');
        }

        if (matchDto.match_date) {
            const matchDate = await this.validateAndCheckDate(matchDto.match_date);
            match.match_date = matchDate;
        }

        if (typeof matchDto.team1_score === 'number') { 
            match.team1_score = matchDto.team1_score;
        }
    
        if (typeof matchDto.team2_score === 'number') {
            match.team2_score = matchDto.team2_score;
        }

        return await this.matchRepository.save(match);
    }

    private async validateAndCheckDate(date: Date): Promise<Date> {
        const matchDate = new Date(date);
        if (isNaN(matchDate.getTime())) {
            throw new BadRequestException('Date invalide');
        }

        const matchDay = matchDate.toISOString().split('T')[0];

        const existingMatch = await this.matchRepository
        .createQueryBuilder('match')
        .where('DATE(match.match_date) = :matchDay', { matchDay })
        .getOne();

        if (existingMatch) {
            throw new BadRequestException('Un match existe déjà pour cette date');
        }

        return matchDate;
    }
}