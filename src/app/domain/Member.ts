import { Idable } from "./Idable";

export class Member implements Idable {
  id: string;
  name: string;
  avatar?: string;

  constructor(name: string, avatar?: string, id?: string) {
    this.name = name;
    this.avatar = avatar;
    this.id = id;
  }
}
