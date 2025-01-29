import { Member } from "../models/member";

export interface MemberRepository  {
    getAll(): Promise<Member[]>;
}