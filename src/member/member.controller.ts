import { Body, Controller, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberDto } from './dto/member.dto';
import { MemberEntity } from './member.entity';

@Controller('members')
export class MemberController {

    constructor(private readonly memberService: MemberService) {}

    @Get()
    async getAllMembers(): Promise<MemberEntity[]> {
        return await this.memberService.getAllMembers();
    }

    @Get(':id')
    async getOneMember(@Param('id', ParseIntPipe) id: number): Promise<MemberEntity> {
        return await this.memberService.getOneMember(id);
    }
    
    @Post()
    async addMember(@Body() memberDto: MemberDto): Promise<MemberEntity> {
        return await this.memberService.addMember(memberDto);
    }
}