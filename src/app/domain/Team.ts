import { Member } from "./Member";

export class Team {
  id: string;
  createdAt: number;
  members: Member[];

  constructor(id: string, createdAt: number, members: Member[]) {
    this.id = id;
    this.createdAt = createdAt;
    this.members = members;
  }
}
