import { Injectable } from '@nestjs/common';
import { MatchEntity } from './match.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(MatchEntity)
        private matchRepository: Repository<MatchEntity>
    ) {}

}
