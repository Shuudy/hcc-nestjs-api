import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './member/member.entity';
import { NewsModule } from './news/news.module';
import { NewsEntity } from './news/news.entity';

@Module({
  imports: [MemberModule, 
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [MemberEntity, NewsEntity],
      synchronize: true
    }), NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
