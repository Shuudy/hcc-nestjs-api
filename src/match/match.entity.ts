import { MemberEntity } from "../member/member.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('matches')
export class MatchEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    match_date: Date;

    @ManyToMany(() => MemberEntity, (member) => member.matches)
    @JoinTable({
        name: 'member_match',
        joinColumn: {
            name: 'match_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'member_id',
            referencedColumnName: 'id'
        }
    })
    members: MemberEntity[];
}