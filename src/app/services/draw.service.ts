import { Injectable } from "@angular/core";
import { Member } from "../domain/Member";
import nanoid from "nanoid";
import { Team } from "../domain/Team";
import { Draw } from "../domain/Draw";
import { Storage } from "@ionic/storage";

const STORAGE_KEY = "drawKey";

@Injectable({
  providedIn: "root"
})
export class DrawService {
  private lastDraw: Draw = new Draw("1", null, "Example Draw Result", [
    new Team("1", "Superhelden", [
      new Member(null, "Spiderman", null),
      new Member(null, "Ironman", null),
      new Member(null, "Wonder Woman", null),
      new Member(null, "Ultron", null)
    ]),
    new Team("2", "Dichter", [
      new Member(null, "Goethe", null),
      new Member(null, "Mozart", null),
      new Member(null, "Bach", null)
    ]),
    new Team("3", "BBT", [
      new Member(null, "Howard", null),
      new Member(null, "Sheldon", null),
      new Member(null, "Rajid", null),
      new Member(null, "Lennard", null)
    ]),
    new Team("4", "Friends", [
      new Member(null, "Ross", null),
      new Member(null, "Rachel", null),
      new Member(null, "Phoebe", null)
    ])
  ]);

  private lastSegmentOption: string = "teams";
  private lastSelectedSize: number = 4;

  constructor(private storage: Storage) {}

  async drawTeam(
    groupId: string,
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

    let drawResult: Draw;
    if (!segmentSelection || segmentSelection === "teams") {
      drawResult = this.drawByNumberOfTeams(selectedSize, availableMembers);
    } else {
      drawResult = this.drawByNumberOfMembers(selectedSize, availableMembers);
    }
    drawResult.groupId = groupId;
    return drawResult;
  }

  setLastDraw(lastDraw: Draw) {
    this.lastDraw = lastDraw;
  }

  getLastDraw(): Draw {
    return this.lastDraw;
  }

  async reshuffle(): Promise<Draw> {
    const members: Member[] = this.lastDraw.teams
      .map(team => team.members)
      .reduce((prev, curr) => prev.concat(curr));

    return await this.drawTeam(
      this.lastDraw.groupId,
      members,
      [],
      this.lastSelectedSize,
      this.lastSegmentOption
    );
  }

  async loadAllDrawsByGroupId(groupId: string): Promise<Draw[]> {
    const allDraws = await this.loadAllDraws();
    return allDraws.filter(draw => draw.groupId === groupId);
  }

  async loadAllDraws() {
    const allDraws = await this.storage.get(STORAGE_KEY);
    if (!allDraws) {
      return [];
    }
    return allDraws;
  }

  async saveDraw(newDraw: Draw) {
    const allDraws = await this.loadAllDraws();
    allDraws.push(newDraw);
    return this.storage.set(STORAGE_KEY, allDraws);
  }

  async getDrawById(drawId: string): Promise<Draw> {
    const allDraws = await this.loadAllDraws();
    return allDraws.find(draw => draw.id === drawId);
  }

  async deleteDraw(id: string) {
    const result = await this.loadAllDraws();
    if (!result) {
      return; // TODO error handling
    }
    const selectedDrawIndex = result
      ? result.findIndex(group => group.id === id)
      : -1;
    if (selectedDrawIndex > -1) {
      result.splice(selectedDrawIndex, 1);
      this.storage.set(STORAGE_KEY, result);
    } else {
      // TODO error handling
    }
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
    let newDate = new Date().toLocaleString();
    return new Draw(
      nanoid(),
      null,
      newDate,
      createdTeams.filter(team => team.members.length > 0)
    );
  }

  private drawByNumberOfMembers(selectedSize: number, availableMembers) {
    const numberOfTeams = Math.round(availableMembers.length / selectedSize);
    return this.drawByNumberOfTeams(numberOfTeams, availableMembers);
  }
}
