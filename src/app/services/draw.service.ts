import { Injectable } from "@angular/core";
import { Team } from "../domain/Team";
import { Draw } from "../domain/Draw";
import { Storage } from "@ionic/storage";
import nanoid from "nanoid";
import { Observable } from "rxjs";

const STORAGE_KEY = "draws";

@Injectable({
  providedIn: "root"
})
export class DrawService {
  private lastDraw: Draw;

  private lastSegmentOption: string = "teams";
  private lastSelectedSize: number = 4;

  constructor(private storage: Storage) {}

  async drawTeam(
    groupId: string,
    memberIds: string[],
    disabledMemberIds: string[],
    selectedSize: number,
    segmentSelection: string
  ): Promise<Draw> {
    this.lastSegmentOption = segmentSelection;
    this.lastSelectedSize = selectedSize;

    const availableMembers = memberIds.filter(
      m => disabledMemberIds.findIndex(d => d == m) < 0
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
    const memberIds: string[] = this.lastDraw.teams
      .map(team => team.memberIds)
      .reduce((prev, curr) => prev.concat(curr));

    return await this.drawTeam(
      this.lastDraw.groupId,
      memberIds,
      [],
      this.lastSelectedSize,
      this.lastSegmentOption
    );
  }

  loadAllDrawsByGroupId(groupId: string): Observable<Draw> {
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
      ? result.findIndex(draw => draw.id === id)
      : -1;
    if (selectedDrawIndex > -1) {
      result.splice(selectedDrawIndex, 1);
      this.storage.set(STORAGE_KEY, result);
    } else {
      // TODO error handling
    }
  }

  private drawByNumberOfTeams(
    numberOfTeams: number,
    availableMembers: string[]
  ) {
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
      createdTeams[index % numberOfTeams].memberIds.push(member);
    });

    // filter all teams without a member and create a new draw
    let newDate = new Date().toLocaleString();
    return new Draw(
      nanoid(),
      null,
      newDate,
      createdTeams.filter(team => team.memberIds.length > 0)
    );
  }

  private drawByNumberOfMembers(
    selectedSize: number,
    availableMembers: string[]
  ) {
    const numberOfTeams = Math.round(availableMembers.length / selectedSize);
    return this.drawByNumberOfTeams(numberOfTeams, availableMembers);
  }
}
