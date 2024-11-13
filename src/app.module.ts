import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './member/member.entity';
import { NewsModule } from './news/news.module';
import { NewsEntity } from './news/news.entity';
import { MatchModule } from './match/match.module';
import { MatchEntity } from './match/match.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MemberModule, 
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [MemberEntity, NewsEntity, MatchEntity],
      synchronize: true
    }), NewsModule, MatchModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
