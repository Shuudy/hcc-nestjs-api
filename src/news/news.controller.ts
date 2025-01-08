import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsEntity } from './news.entity';
import { NewsDto } from './dto/news.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RoleEnum } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('news')
export class NewsController {

    constructor(private readonly newsService: NewsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all news' })
    @ApiResponse({ status: 200, description: 'List of all news.', type: [NewsEntity] })
    async getAllNews(): Promise<NewsEntity[]> {
        return await this.newsService.getAllNews();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get specific news' })
    @ApiResponse({ status: 200, description: 'The news data.', type: NewsEntity })
    @ApiResponse({ status: 404, description: 'News not found.' })
    async getOneNews(@Param('id', ParseIntPipe) id: number): Promise<NewsEntity> {
        return await this.newsService.getOneNews(id);
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnum.CONTRIBUTOR)
    @Post()
    @ApiOperation({ summary: 'Publish a news' })
    @ApiResponse({ status: 201, description: 'News successfully published.', type: NewsEntity })
    @ApiResponse({ status: 400, description: 'Invalid news data.' })
    async publishNews(@Body() newsDto: NewsDto, @Request() req: Request): Promise<NewsEntity> {
        return await this.newsService.publishNews(newsDto, req['member'].id);
    }
}