import { Injectable } from "@angular/core";
import { Team } from "../domain/Team";
import { Draw } from "../domain/Draw";
import { from, Observable } from "rxjs";
import { RepositoryService } from "./repository.service";
import { filter, first, flatMap, map, reduce } from "rxjs/operators";
import nanoid from "nanoid";

const STORAGE_KEY = "draws";
const LAST_DRAW_KEY = "lastDraw";

@Injectable({
  providedIn: "root"
})
export class DrawService {
  private lastSegmentOption: string = "teams";
  private lastSelectedSize: number = 4;

  constructor(private repo: RepositoryService) {}

  drawTeam(
    groupId: string,
    memberIds: string[],
    disabledMemberIds: string[],
    selectedSize: number,
    segmentSelection: string
  ): Observable<Draw> {
    this.lastSegmentOption = segmentSelection;
    this.lastSelectedSize = selectedSize;

    return Observable.create(subscriber => {
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
      subscriber.next(drawResult);
    });
  }

  saveLastDraw(lastDraw: Draw) {
    return this.getLastDraw().pipe(
      flatMap(lastResult => this.repo.deleteById(LAST_DRAW_KEY, lastResult.id)),
      flatMap(result => this.repo.save(LAST_DRAW_KEY, lastDraw))
    );
  }

  getLastDraw(): Observable<Draw> {
    return this.repo.findAll(LAST_DRAW_KEY).pipe(
      map((lastDraw: Draw) => {
        lastDraw.id = undefined;
        return lastDraw;
      }),
      first()
    );
  }

  reshuffle(): Observable<Draw> {
    return this.getLastDraw().pipe(
      flatMap(lastDraw => {
        return from(lastDraw.teams).pipe(
          map(team => team.memberIds),
          reduce((prev, curr) => prev.concat(curr)),
          flatMap(memberIds =>
            this.drawTeam(
              lastDraw.groupId,
              memberIds,
              [],
              this.lastSelectedSize,
              this.lastSegmentOption
            )
          )
        );
      })
    );
  }

  findAll(): Observable<Draw> {
    return this.repo.findAll(STORAGE_KEY);
  }

  findAllDrawsByGroupId(groupId: string): Observable<Draw> {
    return this.findAll().pipe(filter(draw => draw.groupId === groupId));
  }

  saveDraw(newDraw: Draw) {
    return this.repo.save(STORAGE_KEY, newDraw);
  }

  findById(drawId: string): Observable<Draw> {
    return this.repo.findById(STORAGE_KEY, drawId);
  }

  deleteDraw(id: string) {
    return this.repo.deleteById(STORAGE_KEY, id);
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
