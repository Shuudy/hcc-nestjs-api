import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberEntity)
        private memberEntity: Repository<MemberEntity>
    ) {}
    
}
