import { Component } from "@angular/core";
import { TeamService } from "../../../services/team.service";
import { Draw } from "../../../domain/Draw";

@Component({
  selector: "app-team-created",
  templateUrl: "./team-created.page.html",
  styleUrls: ["./team-created.page.scss"]
})
export class TeamCreatedPage {
  draw: Draw;

  constructor(private teamService: TeamService) {}

  ionViewWillEnter() {
    this.draw = this.teamService.getLastDraw();
  }

  reshuffle() {
    this.teamService.reshuffle().then(draw => (this.draw = draw));
  }
}
