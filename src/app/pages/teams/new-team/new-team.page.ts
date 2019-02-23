import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";
import { GroupService } from "../../../services/group.service";
import { Group } from "../../../domain/Group";
import { Member } from "../../../domain/Member";
import { TeamService } from "../../../services/team.service";
import { NavController } from "@ionic/angular";
import { Draw } from "../../../domain/Draw";

const TEAMS = "teams";

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
  fakeDrawResultTeams: number;
  fakeDrawResultMembers: number[];

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private teamService: TeamService,
    private nav: NavController
  ) {
    this.segmentSelection = TEAMS;
  }

  rangeChanged(event) {
    this.selectedSize = event.detail.value;
    this.updateFakeResults();
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(filter(params => params.forGroup))
      .subscribe(params => {
        this.getGroup(params.forGroup).then(() => {
          this.setDefaultSettingsForGroup();
          this.updateFakeResults();
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
    this.updateFakeResults();
  }

  segmentChanged($event) {
    this.segmentSelection = $event.detail.value;
    this.updateFakeResults();
  }

  async updateFakeResults() {
    const fakeDraw = await this.teamService.drawTeam(
      this.group.members,
      this.disabledMembers,
      this.selectedSize,
      this.segmentSelection
    );
    this.fakeDrawResultTeams = fakeDraw.teams.length;
    this.fakeDrawResultMembers = fakeDraw.teams
      .map(t => t.members.length)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a - b);
    if (this.fakeDrawResultMembers.length > 2) {
      this.fakeDrawResultMembers.splice(
        1,
        this.fakeDrawResultMembers.length - 2
      );
    }
  }

  isDisabled(member: Member) {
    return this.findDisabledMember(member) > -1;
  }

  async drawTeams() {
    await this.teamService.drawTeam(
      this.group.members,
      this.disabledMembers,
      this.selectedSize,
      this.segmentSelection
    );
    this.nav.navigateForward(["teams", "created"]);
  }

  private setDefaultSettingsForGroup() {
    if (this.group && this.group.members) {
      this.maxSize = this.group.members.length;
      this.selectedSize = Math.min(4, Math.round(this.maxSize / 2));
    }
  }

  private findDisabledMember(member: Member) {
    return this.disabledMembers.findIndex(m => m.name === member.name);
  }
}
