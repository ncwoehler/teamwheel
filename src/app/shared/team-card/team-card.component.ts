import { Component, Input, OnInit } from "@angular/core";
import { Team } from "../../domain/Team";

@Component({
  selector: "app-team-card",
  templateUrl: "./team-card.component.html",
  styleUrls: ["./team-card.component.scss"]
})
export class TeamCardComponent implements OnInit {
  @Input() team;
  @Input() allowEdit;

  constructor() {}

  ngOnInit() {}

  setTeamName($event: string) {
    this.team.name = $event;
  }

  reorder($event, team: Team) {
    const movedMember = team.members[$event.detail.from];
    team.members.splice($event.detail.from, 1);
    team.members.splice($event.detail.to, 0, movedMember);
    $event.detail.complete();
  }
}
