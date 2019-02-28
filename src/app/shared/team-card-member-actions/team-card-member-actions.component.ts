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
  @Input() member: Member;
  @Input() currentTeam: Team;
  @Input() otherTeams: Team[];
  @Input() pop: PopoverController;

  selectedTeam: string;

  constructor() {}

  ngOnInit() {
    const firstTeam: Team = this.otherTeams.entries().next().value[1];
    if (firstTeam) {
      this.selectedTeam = firstTeam.name;
    }
  }

  selectedTeamChanged($event) {
    this.selectedTeam = $event.detail.value;
  }

  moveToTeam() {
    const oldIndex = this.currentTeam.members.findIndex(
      m => m.name === this.member.name
    );
    this.currentTeam.members.splice(oldIndex, 1);

    this.otherTeams
      .find(t => t.name === this.selectedTeam)
      .members.push(this.member);
    this.pop.dismiss();
  }

  close() {
    this.pop.dismiss();
  }
}
