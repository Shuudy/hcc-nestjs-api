import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from '../member/member.entity';
import { MatchEntity } from './match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity, MatchEntity])],
  providers: [MatchService]
})
export class MatchModule {}
