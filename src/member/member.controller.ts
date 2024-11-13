import { Body, Controller, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberDto } from './member.dto';
import { MemberEntity } from './member.entity';

@Controller('members')
export class MemberController {

    constructor(private readonly memberService: MemberService) {}

    @Post('add')
    async addMember(@Body() memberDto: MemberDto): Promise<MemberEntity> {
        return await this.memberService.addMember(memberDto);
    }
}