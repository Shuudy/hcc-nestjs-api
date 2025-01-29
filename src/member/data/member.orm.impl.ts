import { Repository } from 'typeorm';
import { MemberEntity } from '../member.entity';
import { MemberRepository } from '../domain/interfaces/member.repository';
import { Member } from '../domain/models/member';
import { InjectRepository } from '@nestjs/typeorm';

export class MemberOrmRepository implements MemberRepository {
    constructor(
        @InjectRepository(MemberEntity)
        private readonly repository: Repository<MemberEntity>
    ) { }
    
    getAll(): Promise<Member[]> {
        return this.repository.find();
    }
}