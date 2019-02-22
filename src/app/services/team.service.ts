import { Injectable } from "@angular/core";
import { Group } from "../domain/Group";
import { Member } from "../domain/Member";
import nanoid from "nanoid";
import { Team } from "../domain/Team";

@Injectable({
  providedIn: "root"
})
export class TeamService {
  //private lastCreatedTeams: Team[];

    lastCreatedTeams: Team[] = [
        new Team("1", new Date().getTime(), [
            new Member("Spiderman"),
            new Member("Ironman"),
            new Member("Wonder Woman"),
            new Member("Ultron")
        ]),
        new Team("2", new Date().getTime(), [
            new Member("Goethe"),
            new Member("Mozart"),
            new Member("Bach"),
        ]),
        new Team("3", new Date().getTime(), [
            new Member("Howard"),
            new Member("Sheldon"),
            new Member("Rajid"),
            new Member("Lennard")
        ]),
        new Team("4", new Date().getTime(), [
            new Member("Ross"),
            new Member("Rachel"),
            new Member("Phoebe"),
        ])
    ];

  constructor() {}

  async createTeam(
    members: Member[],
    disabledMembers: Member[],
    selectedSize: number,
    segmentSelection: string
  ) {
    const availableMembers = members.filter(
      m => disabledMembers.findIndex(d => d.name == m.name) < 0
    );

    // shuffle members
    availableMembers.sort(() => Math.random() - 0.5);

    const createdTeams: Team[] = [];
    if (!segmentSelection || segmentSelection === "teams") {
      for (var _i = 0; _i < selectedSize; _i++) {
        const id = nanoid();
        const teamMembers = [];
        var newTeam: Team = new Team(id, new Date().getTime(), teamMembers);
        createdTeams.push(newTeam);
      }

      availableMembers.forEach((member, index) => {
        createdTeams[index % selectedSize].members.push(member);
      });
    }

    // filter all teams without a member
    this.lastCreatedTeams = createdTeams.filter(
      team => team.members.length > 0
    );
  }

  getLastCreatedTeams(): Team[] {
    return this.lastCreatedTeams;
  }

  reshuffle(): Team[] {
    const members: Member[] = this.lastCreatedTeams
      .map(team => team.members)
      .reduce((prev, curr) => prev.concat(curr));

    this.createTeam(members, [], this.lastCreatedTeams.length, undefined);
    return this.getLastCreatedTeams();
  }
}
