import { Body, Controller, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberDto } from './dto/member.dto';
import { MemberEntity } from './member.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('members')
export class MemberController {

    constructor(private readonly memberService: MemberService) {}

    @Get()
    @ApiOperation({ summary: 'Get all members' })
    async getAllMembers(): Promise<MemberEntity[]> {
        return await this.memberService.getAllMembers();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get specific member by id' })
    async getOneMember(@Param('id', ParseIntPipe) id: number): Promise<MemberEntity> {
        return await this.memberService.getOneMember(id);
    }
    
    @Post()
    @ApiOperation({ summary: 'Add member' })
    async addMember(@Body() memberDto: MemberDto): Promise<MemberEntity> {
        return await this.memberService.addMember(memberDto);
    }
}