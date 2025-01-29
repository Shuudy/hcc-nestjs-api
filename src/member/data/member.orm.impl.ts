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
    
    async getAll(): Promise<Member[]> {
        const members = await this.repository.find();
        return members.map((member) => {
            return {
                id: member.id,
                firstname: member.firstname,
                lastname: member.lastname,
                email: member.email,
                password: member.password,
            };
        });
    }
}