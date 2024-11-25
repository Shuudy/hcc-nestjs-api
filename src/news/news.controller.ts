import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsEntity } from './news.entity';
import { NewsDto } from './news.dto';

@Controller('news')
export class NewsController {

    constructor(private readonly newsService: NewsService) {}

    @Get()
    async getAllNews(): Promise<NewsEntity[]> {
        return await this.newsService.getAllNews();
    }

    @Get(':id')
    async getOneNews(@Param('id', ParseIntPipe) id: number): Promise<NewsEntity> {
        return await this.newsService.getOneNews(id);
    }

    @Post('publish')
    async publishNews(@Body() newsDto: NewsDto): Promise<NewsEntity> {
        return await this.newsService.publishNews(newsDto);
    }
}