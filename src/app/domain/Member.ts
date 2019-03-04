export class Member implements WithId {
  id: string;
  name: string;
  avatar: string;

  constructor(name: string, avatar: string) {
    this.name = name;
    this.avatar = avatar;
  }
}
