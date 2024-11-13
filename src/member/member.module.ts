import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { NewsEntity } from '../news/news.entity';
import { MatchEntity } from '../match/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity, NewsEntity, MatchEntity])],
  providers: [MemberService]
})
export class MemberModule {}
