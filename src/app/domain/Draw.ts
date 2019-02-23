import { Team } from "./Team";

export class Draw {
  id: string;
  createdAt: number;
  teams: Team[];

  constructor(id: string, name: string, teams: Team[]) {
    this.id = id;
    this.createdAt = new Date().getTime();
    this.teams = teams;
  }
}
