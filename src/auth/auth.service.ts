import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from '../member/member.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        
        @InjectRepository(MemberEntity)
        private memberRepository: Repository<MemberEntity>,
      ) {}

    async signIn(email: string, password: string): Promise<string> {

        if (!email || !password) {
            throw new BadRequestException();
        }

        const member = await this.memberRepository.findOne({ where: { email: email } });

        if (!member) {
            throw new NotFoundException('Adhérent non trouvé.');
        }

        const isPasswordValid = await bcrypt.compare(password, member.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Mot de passe invalide.');
        }

        const payload = {
            id: member.id,
            email: member.email,
            role: member.role
        };
        return await this.jwtService.signAsync(payload);
    }
}
