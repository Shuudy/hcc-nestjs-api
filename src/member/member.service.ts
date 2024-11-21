import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async getMembers(): Promise<MemberEntity[]> {
        return await this.memberRepository
        .createQueryBuilder('member')
        .leftJoinAndSelect('member.matches', 'match')
        .select([
            'member.id',
            'member.firstname', 
            'member.lastname', 
            'member.email', 
            'member.registration_date', 
            'member.role',
            'match.id', 
            'match.match_date'
        ])
        .getMany();
    }

    async getMember(id: number): Promise<MemberEntity> {
        const member = await this.memberRepository
        .createQueryBuilder('member')
        .leftJoinAndSelect('member.matches', 'match')
        .select([
            'member.id',
            'member.firstname', 
            'member.lastname', 
            'member.email', 
            'member.registration_date', 
            'member.role',
            'match.id', 
            'match.match_date'
        ])
        .where('member.id = :id', { id })
        .getOne();

        if (!member) {
            throw new NotFoundException(`Membre avec l'ID ${id} non trouvé`);
        }

        return member;
    }
    
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
