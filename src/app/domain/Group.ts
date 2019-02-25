import { Member } from "./Member";
import { Draw } from "./Draw";

export class Group {
  id: string;
  name: string;
  icon: string;
  lastUsed: number;
  members: Member[];
  draws: Draw[];

  constructor(id: string, name: string, icon: string, members: Member[]) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.members = members;
  }
}
