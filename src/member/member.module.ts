import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { NewsEntity } from '../news/news.entity';
import { MatchEntity } from '../match/match.entity';
import { MemberController } from './presentation/member.controller';
import { MemberGetAllUseCase } from './domain/usecases/member.get-all.usecase';
import { MemberOrmRepository } from './data/member.orm.impl';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity, NewsEntity, MatchEntity])],
  providers: [MemberService,
    MemberGetAllUseCase,
    {
      provide: 'MemberOrmRepository',
      useClass: MemberOrmRepository
    }
  ],
  controllers: [MemberController]
})
export class MemberModule {}
