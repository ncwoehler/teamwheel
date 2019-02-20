import { Member } from "./Member";

export class Group {
  id: string;
  name: string;
  lastUsed: number;
  members: Member[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public addMember(name: string) {
    this.members.push(new Member(name));
  }
}
