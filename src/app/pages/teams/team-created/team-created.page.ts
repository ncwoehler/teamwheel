import { Component, OnInit } from "@angular/core";
import { TeamService } from "../../../services/team.service";
import { Team } from "../../../domain/Team";
import { Member } from "../../../domain/Member";

@Component({
  selector: "app-team-created",
  templateUrl: "./team-created.page.html",
  styleUrls: ["./team-created.page.scss"]
})
export class TeamCreatedPage {

  teams: Team[];

  constructor(private teamService: TeamService) {}

  ionViewWillEnter() {
    this.teams = this.teamService.getLastCreatedTeams();
  }

  reshuffle() {
    this.teams = this.teamService.reshuffle();
  }
}
