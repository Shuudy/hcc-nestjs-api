import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './member/member.entity';

@Module({
  imports: [MemberModule, 
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [MemberEntity],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
