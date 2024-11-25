import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NewsEntity } from './news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsDto } from './news.dto';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(NewsEntity)
        private newsRepository: Repository<NewsEntity>
    ) {}

    async getAllNews(): Promise<NewsEntity[]> {
        return await this.newsRepository
        .createQueryBuilder('news')
        .leftJoinAndSelect('news.member', 'member')
        .select([
            'news.id',
            'news.name',
            'news.content',
            'news.created_at',
            'member.id'
        ])
        .getMany();
    }

    async getOneNews(id: number): Promise<NewsEntity> {
        const news = await this.newsRepository
        .createQueryBuilder('news')
        .leftJoinAndSelect('news.member', 'member')
        .select([
            'news.id',
            'news.name',
            'news.content',
            'news.created_at',
            'member.id'
        ])
        .where('news.id = :id', { id })
        .getOne();
        
        if (!news) {
            throw new NotFoundException(`Actualité avec l'ID ${id} non trouvée`);
        }
        
        return news;
    }

    async publishNews(newsDto: NewsDto): Promise<NewsEntity> {

        if (!newsDto.name || !newsDto.content) {
            throw new BadRequestException();
        }

        const newNewsEntity = this.newsRepository.create(newsDto);
        return await this.newsRepository.save(newNewsEntity);
    }
}
