import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { Repository } from 'typeorm';
import { MemberDto } from './member.dto';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberEntity)
        private memberRepository: Repository<MemberEntity>
    ) {}
    
    async addMember(memberDto: MemberDto): Promise<MemberEntity> {

        if (!memberDto.firstname || !memberDto.lastname || !memberDto.email || !memberDto.password) {
            throw new BadRequestException();
        }

        const existingMember = await this.memberRepository.findOne({ where: { email: memberDto.email } })
        if (existingMember) {
            throw new BadRequestException("Adresse e-mail déjà utilisée");
        }

        const newMemberEntity = this.memberRepository.create({ role: 'contributor', ...memberDto});
        return await this.memberRepository.save(newMemberEntity);
    }
}
