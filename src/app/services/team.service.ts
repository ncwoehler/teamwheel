import { Injectable } from "@angular/core";
import { Group } from "../domain/Group";
import { Member } from "../domain/Member";
import nanoid from "nanoid";
import { Team } from "../domain/Team";
import { Draw } from "../domain/Draw";

@Injectable({
  providedIn: "root"
})
export class TeamService {
  private lastDraw: Draw = new Draw("1", "Draw 1", [
    new Team("1", "Superhelden", [
      new Member("Spiderman"),
      new Member("Ironman"),
      new Member("Wonder Woman"),
      new Member("Ultron")
    ]),
    new Team("2", "Dichter", [
      new Member("Goethe"),
      new Member("Mozart"),
      new Member("Bach")
    ]),
    new Team("3", "BBT", [
      new Member("Howard"),
      new Member("Sheldon"),
      new Member("Rajid"),
      new Member("Lennard")
    ]),
    new Team("4", "Friends", [
      new Member("Ross"),
      new Member("Rachel"),
      new Member("Phoebe")
    ])
  ]);

  private lastSegmentOption: string = "teams";
  private lastSelectedSize: number = 4;

  constructor() {}

  async drawTeam(
    members: Member[],
    disabledMembers: Member[],
    selectedSize: number,
    segmentSelection: string
  ): Promise<Draw> {
    this.lastSegmentOption = segmentSelection;
    this.lastSelectedSize = selectedSize;

    const availableMembers = members.filter(
      m => disabledMembers.findIndex(d => d.name == m.name) < 0
    );

    // shuffle members
    availableMembers.sort(() => Math.random() - 0.5);

    if (!segmentSelection || segmentSelection === "teams") {
      return this.drawByNumberOfTeams(selectedSize, availableMembers);
    } else {
      return this.drawByNumberOfMembers(selectedSize, availableMembers);
    }
  }

  getLastDraw(): Draw {
    return this.lastDraw;
  }

  async reshuffle(): Promise<Draw> {
    const members: Member[] = this.lastDraw.teams
      .map(team => team.members)
      .reduce((prev, curr) => prev.concat(curr));

    return await this.drawTeam(
      members,
      [],
      this.lastSelectedSize,
      this.lastSegmentOption
    );
  }

  private drawByNumberOfTeams(numberOfTeams: number, availableMembers) {
    // create # of teams
    const createdTeams: Team[] = [];
    for (var _i = 0; _i < numberOfTeams; _i++) {
      const id = nanoid();
      const teamMembers = [];
      var newTeam: Team = new Team(id, `Team ${_i + 1}`, teamMembers);
      createdTeams.push(newTeam);
    }

    // add available members to teams
    availableMembers.forEach((member, index) => {
      createdTeams[index % numberOfTeams].members.push(member);
    });

    // filter all teams without a member and create a new draw
    this.lastDraw = new Draw(
      nanoid(),
      new Date().toString(),
      createdTeams.filter(team => team.members.length > 0)
    );
    return this.lastDraw;
  }

  private drawByNumberOfMembers(selectedSize: number, availableMembers) {
    const numberOfTeams = Math.round(availableMembers.length / selectedSize);
    return this.drawByNumberOfTeams(numberOfTeams, availableMembers);
  }
}
