import { Member } from "./Member";

export class Group {
  id: string;
  name: string;
  lastUsed: number;
  members: Member[];

  constructor(id: string, name: string, members: Member[]) {
    this.id = id;
    this.name = name;
    this.members = members;
  }

}
