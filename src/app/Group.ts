import { Member } from "./Member";

export class Group {
  id: string;
  name: string;
  members: Member[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addMember(name: string) {
    this.members.push(new Member(name));
  }
}
