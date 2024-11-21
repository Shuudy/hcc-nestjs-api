import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberDto } from './member.dto';
import { MemberEntity } from './member.entity';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';

@Controller('members')
export class MemberController {

    constructor(private readonly memberService: MemberService) {}

    @Get()
    async getMembers(): Promise<MemberEntity[]> {
        return await this.memberService.getMembers();
    }

    @Get(':id')
    async getMember(@Param('id', ParseIntPipe) id: number): Promise<MemberEntity> {
        return await this.memberService.getMember(id);
    }
    
    @Post('add')
    async addMember(@Body() memberDto: MemberDto): Promise<MemberEntity> {
        return await this.memberService.addMember(memberDto);
    }
}