import { Inject, Injectable } from "@nestjs/common";
import { MemberOrmRepository } from "src/member/data/member.orm.impl";

@Injectable()
export class MemberGetAllUseCase {
    constructor(
        @Inject("MemberOrmRepository") 
        private readonly memberOrmRepository: MemberOrmRepository
    ) { }

    async execute() {
        return this.memberOrmRepository.getAll();
    }
}