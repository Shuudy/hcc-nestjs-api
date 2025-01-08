import { ApiProperty } from "@nestjs/swagger";
import { MemberEntity } from "../member/member.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('matches')
export class MatchEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The unique identifier of the match', example: 1 })
    id: number;

    @Column()
    @ApiProperty({ description: 'The date of the match', example: '2024-08-12T13:30:00Z' })
    match_date: Date;

    @Column({ nullable: true })
    @ApiProperty({ description: 'The score of team 1', example: 25, nullable: true })
    team1_score: number;

    @Column({ nullable: true })
    @ApiProperty({ description: 'The score of team 2', example: 30, nullable: true })
    team2_score: number;

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
    @ApiProperty({ type: () => [Object], description: 'List of member IDs participating in the match', example: [{ id: 1 }, { id: 2 }] })
    members: MemberEntity[];
}