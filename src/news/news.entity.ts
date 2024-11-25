import { MemberEntity } from "../member/member.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('news')
export class NewsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    content: string;

    @Column({ default: () => 'datetime()' })
    created_at: Date;

    @ManyToOne(() => MemberEntity, (member) => member.news)
    @JoinColumn({ name: 'member_id' })
    member: MemberEntity;
}