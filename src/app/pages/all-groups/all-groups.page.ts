import { Component, OnDestroy, OnInit } from "@angular/core";
import { Group } from "../../domain/Group";
import { RecentGroupService } from "../../services/recent-group.service";
import { GroupService } from "../../services/group.service";

@Component({
  selector: "app-all-groups",
  templateUrl: "./all-groups.page.html",
  styleUrls: ["./all-groups.page.scss"]
})
export class AllGroupsPage {
  allGroups: Group[];

  constructor(private groupService: GroupService) {}

  ionViewWillEnter() {
    this.getAllGroups();
  }

  getAllGroups(): void {
    this.groupService
      .getAllGroups()
      .then(data => {
        this.allGroups = data;
      })
      .catch(value => console.error(value)); // TODO error handling
  }
}
