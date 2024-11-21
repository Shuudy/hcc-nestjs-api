import { Injectable, NotFoundException } from '@nestjs/common';
import { MatchEntity } from './match.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(MatchEntity)
        private matchRepository: Repository<MatchEntity>
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
}
