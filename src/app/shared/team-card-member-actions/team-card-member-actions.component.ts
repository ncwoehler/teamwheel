import { Component, Input, OnInit } from "@angular/core";
import { Team } from "../../domain/Team";
import { Member } from "../../domain/Member";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-team-card-member-actions",
  templateUrl: "./team-card-member-actions.component.html",
  styleUrls: ["./team-card-member-actions.component.scss"]
})
export class TeamCardMemberActionsComponent implements OnInit {
  @Input() memberId: string;
  @Input() currentTeam: Team;
  @Input() otherTeams: Team[];
  @Input() pop: PopoverController;

  selectedTeam: string;

  constructor() {}

  ngOnInit() {
    let teamIterator = this.otherTeams.entries().next();
    const firstTeam: Team = teamIterator.value && teamIterator.value[1];
    this.selectedTeam = firstTeam && firstTeam.name || '';
  }

  selectedTeamChanged($event) {
    this.selectedTeam = $event.detail.value;
  }

  moveToTeam() {
    const oldIndex = this.currentTeam.memberIds.findIndex(
      m => m === this.memberId
    );
    this.currentTeam.memberIds.splice(oldIndex, 1);

    this.otherTeams
      .find(t => t.name === this.selectedTeam)
      .memberIds.push(this.memberId);
    this.pop.dismiss();
  }

  close() {
    this.pop.dismiss();
  }
}
