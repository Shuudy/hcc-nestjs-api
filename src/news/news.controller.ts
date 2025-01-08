import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsEntity } from './news.entity';
import { NewsDto } from './dto/news.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RoleEnum } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('news')
export class NewsController {

    constructor(private readonly newsService: NewsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all news' })
    async getAllNews(): Promise<NewsEntity[]> {
        return await this.newsService.getAllNews();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get specific news' })
    async getOneNews(@Param('id', ParseIntPipe) id: number): Promise<NewsEntity> {
        return await this.newsService.getOneNews(id);
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnum.CONTRIBUTOR)
    @Post()
    @ApiOperation({ summary: 'Publish a news' })
    async publishNews(@Body() newsDto: NewsDto, @Request() req: Request): Promise<NewsEntity> {
        return await this.newsService.publishNews(newsDto, req['member'].id);
    }
}