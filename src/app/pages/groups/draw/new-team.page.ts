import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GroupService } from "../../../services/group.service";
import { Group } from "../../../domain/Group";
import { Member } from "../../../domain/Member";
import { DrawService } from "../../../services/draw.service";
import { NavController } from "@ionic/angular";

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
    private drawService: DrawService,
    private nav: NavController
  ) {
    this.segmentSelection = TEAMS;
  }

  ngOnInit() {
    const groupId: string = this.route.snapshot.paramMap.get("groupId");
    this.getGroup(groupId).then(() => {
      this.setDefaultSettingsForGroup();
      this.updateFakeResults();
    });
  }

  rangeChanged(event) {
    this.selectedSize = event.detail.value;
    this.updateFakeResults();
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
    const fakeDraw = await this.drawService.drawTeam(
      null,
      this.getMemberIds(this.group.members),
      this.getMemberIds(this.disabledMembers),
      this.selectedSize,
      this.segmentSelection
    );
    this.fakeDrawResultTeams = fakeDraw.teams.length;
    this.fakeDrawResultMembers = fakeDraw.teams
      .map(t => t.memberIds.length)
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
    const lastDraw = await this.drawService.drawTeam(
      this.group.id,
      this.getMemberIds(this.group.members),
      this.getMemberIds(this.disabledMembers),
      this.selectedSize,
      this.segmentSelection
    );
    this.drawService.setLastDraw(lastDraw);
    this.nav.navigateForward(["draws", "preview"]);
  }

  private setDefaultSettingsForGroup() {
    if (this.group && this.group.members) {
      this.maxSize = this.group.members.length;
      this.selectedSize = Math.min(4, Math.round(this.maxSize / 2));
    }
  }

  private getMemberIds(members: Member[]): string[] {
    let memberIds = members.map(member => member.id);
    return memberIds;
  }

  private findDisabledMember(member: Member) {
    return this.disabledMembers.findIndex(m => m.name === member.name);
  }
}
