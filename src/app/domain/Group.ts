import { Idable } from "./Idable";

export class Group implements Idable {
  id: string;
  name: string;
  icon: string;
  lastUsed: number;
  members: string[];

  constructor(name: string, icon: string, members: string[]) {
    this.name = name;
    this.icon = icon;
    this.members = members;
  }
}
