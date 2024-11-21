import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './news.entity';
import { NewsService } from './news.service';
import { MemberEntity } from '../member/member.entity';
import { NewsController } from './news.controller';

@Module({
    imports: [TypeOrmModule.forFeature([NewsEntity, MemberEntity])],
    providers: [NewsService],
    controllers: [NewsController]
})
export class NewsModule {}
