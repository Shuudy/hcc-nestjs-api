import { NewsEntity } from '../news/news.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum MemberRole {
    COACH = 'coach',
    PLAYER = 'player',
    CONTRIBUTOR = 'contributor'
}

@Entity('members')
export class MemberEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;
    
    @Column()
    registration_date: Date;

    @OneToMany(() => NewsEntity, (NewsEntity) => NewsEntity.member)
    news: NewsEntity[];
}