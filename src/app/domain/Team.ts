import { Idable } from "./Idable";

export class Team implements Idable {
  id: string;
  createdAt: number;
  name: string;
  memberIds: string[];

  constructor(id: string, name: string, memberIds: string[]) {
    this.id = id;
    this.createdAt = new Date().getTime();
    this.name = name;
    this.memberIds = memberIds;
  }
}
