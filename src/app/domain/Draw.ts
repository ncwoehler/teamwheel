import { Team } from './Team';

export class Draw {
  id: string;
  groupId: string;
  createdAt: number;

  name: string;
  teams: Team[];

  constructor(id: string, groupId: string, name: string, teams: Team[]) {
    this.id = id;
    this.groupId = groupId;
    this.name = name;
    this.createdAt = new Date().getTime();
    this.teams = teams;
  }
}
