import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}