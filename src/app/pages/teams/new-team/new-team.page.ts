import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";
import { GroupService } from "../../../services/group.service";
import { Group } from "../../../domain/Group";
import { Member } from "../../../domain/Member";
import { TeamService } from "../../../services/team.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-new-team",
  templateUrl: "./new-team.page.html",
  styleUrls: ["./new-team.page.scss"]
})
export class NewTeamPage implements OnInit {
  group: Group;
  segmentSelection: string;

  selectedSize: number;
  maxSize: number;

  disabledMembers: Member[] = [];

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private teamService: TeamService,
    private nav: NavController
  ) {
    this.segmentSelection = "teams";
  }

  rangeChanged(event) {
    this.selectedSize = event.detail.value;
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(filter(params => params.forGroup))
      .subscribe(params => {
        this.getGroup(params.forGroup).then(() => {
          if (this.group && this.group.members) {
            this.maxSize = this.group.members.length;
            this.selectedSize = Math.round(this.maxSize / 2);
          }
        });
      });
  }

  async getGroup(groupId: string) {
    return this.groupService
      .getGroupById(groupId)
      .then(value => (this.group = value))
      .catch(value => console.error(value)); // TODO error handling
  }

  toggleDisable(member: Member) {
    const index = this.findDisabledMember(member);
    if (index > -1) {
      this.disabledMembers.splice(index, 1);
    } else {
      this.disabledMembers.push(member);
    }
  }

  isDisabled(member: Member) {
    return this.findDisabledMember(member) > -1;
  }

  async createTeam() {
    await this.teamService.createTeam(
      this.group.members,
      this.disabledMembers,
      this.selectedSize,
      this.segmentSelection
    );
    this.nav.navigateForward(["teams", "created"]);
  }

  private findDisabledMember(member: Member) {
    return this.disabledMembers.findIndex(m => m.name === member.name);
  }
}
