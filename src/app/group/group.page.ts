import { Component, OnInit } from "@angular/core";
import { GroupService } from "../group.service";
import { Group } from "../Group";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-group",
  templateUrl: "./group.page.html",
  styleUrls: ["./group.page.scss"]
})
export class GroupPage implements OnInit {
  private group: Group;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getGroup();
  }

  getGroup() {
    const groupId: string = this.route.snapshot.paramMap.get("groupId");
    this.groupService
      .getGroupById(groupId)
      .then(value => (this.group = value))
      .catch(value => console.error(value));// TODO error handling
  }
}
