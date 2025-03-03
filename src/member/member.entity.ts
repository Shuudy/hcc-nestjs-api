import { ApiProperty } from '@nestjs/swagger';
import { MatchEntity } from '../match/match.entity';
import { NewsEntity } from '../news/news.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum MemberRole {
    COACH = 'coach',
    PLAYER = 'player',
    CONTRIBUTOR = 'contributor',
    PENDING = 'pending',
    ADMIN = 'admin',
}

@Entity('members')
export class MemberEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The unique identifier of the member', example: 1 })
    id: number;

    @Column()
    @ApiProperty({ description: 'The first name of the member', example: 'John' })
    firstname: string;

    @Column()
    @ApiProperty({ description: 'The last name of the member', example: 'Doe' })
    lastname: string;

    @Column({ unique: true })
    @ApiProperty({ description: 'The email address of the member', example: 'johndoe@example.com' })
    email: string;

    @Column()
    @ApiProperty({ description: 'Password of the member' })
    password: string;

    @Column()
    @ApiProperty({ description: 'Role of the member', example: 'player', enum: MemberRole })
    role: string;
    
    @Column({ default: () => 'datetime()' })
    @ApiProperty({ description: 'The registration date of the member', example: '2025-01-08T12:00:00Z' })
    registration_date: Date;

    @OneToMany(() => NewsEntity, (news) => news.member)
    news: NewsEntity[];

    @ManyToMany(() => MatchEntity, (match) => match.members)
    @ApiProperty({ type: () => [Object], description: 'List of matches associated with the member', example: [{ id: 1, matchDate: '2024-11-24T17:09:17.000Z' }, { id: 2, matchDate: '2024-11-26T17:09:17.000Z' }] })
    matches: MatchEntity[];
}