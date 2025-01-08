import { ApiProperty } from "@nestjs/swagger";
import { MemberEntity } from "../member/member.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('news')
export class NewsEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The unique identifier of the news', example: 1 })
    id: number;

    @Column()
    @ApiProperty({ description: 'The name or title of the news article', example: 'New handball event announced!' })
    name: string;

    @Column('text')
    @ApiProperty({ description: 'The content of the news article', example: 'Details about the upcoming match and team news.' })
    content: string;

    @Column({ default: () => 'datetime()' })
    @ApiProperty({ description: 'The date and time when the news was created', example: '2025-01-08T12:00:00Z' })
    created_at: Date;

    @ManyToOne(() => MemberEntity, (member) => member.news)
    @JoinColumn({ name: 'member_id' })
    @ApiProperty({ type: () => [Object], description: 'Member associated with the news', example: [{ id: 1 }] })
    member: MemberEntity;
}