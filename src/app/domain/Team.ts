import { Member } from "./Member";

export class Team {
  id: string;
  createdAt: number;
  name: string;
  members: Member[];

  constructor(id: string, name: string, members: Member[]) {
    this.id = id;
    this.createdAt = new Date().getTime();
    this.name = name;
    this.members = members;
  }
}
