import { Injectable } from '@nestjs/common';
import { NewsEntity } from './news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(NewsEntity)
        private newsEntity: Repository<NewsEntity>
    ) {}
}
