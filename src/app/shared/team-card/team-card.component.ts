import { Component, Input, OnInit } from "@angular/core";
import { Team } from "../../domain/Team";
import { PopoverController } from "@ionic/angular";
import { TeamCardMemberActionsComponent } from "../team-card-member-actions/team-card-member-actions.component";
import { Member } from "../../domain/Member";
import { Draw } from "../../domain/Draw";
import { Group } from "../../domain/Group";

@Component({
  selector: "app-team-card",
  templateUrl: "./team-card.component.html",
  styleUrls: ["./team-card.component.scss"]
})
export class TeamCardComponent implements OnInit {
  @Input() draw: Draw;
  @Input() team: Team;
  @Input() group: Group;
  @Input() allowEdit = false;
  @Input() allowReorder = false;

  constructor(public popoverController: PopoverController) {}

  ngOnInit() {}

  setTeamName($event: string) {
    this.team.name = $event;
  }

  reorder($event, team: Team) {
    const movedMember = team.memberIds[$event.detail.from];
    team.memberIds.splice($event.detail.from, 1);
    team.memberIds.splice($event.detail.to, 0, movedMember);
    $event.detail.complete();
  }

  async presentPopover(ev: any, memberId: string) {
    const popover = await this.popoverController.create({
      component: TeamCardMemberActionsComponent,
      componentProps: {
        pop: this.popoverController,
        memberId: memberId,
        currentTeam: this.team,
        otherTeams: this.draw.teams.filter(t => t.name !== this.team.name)
      },
      event: ev,
      translucent: false
    });
    return await popover.present();
  }
}
