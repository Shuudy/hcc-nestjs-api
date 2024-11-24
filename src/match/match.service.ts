import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MatchEntity } from './match.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from '../member/member.entity';

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
}