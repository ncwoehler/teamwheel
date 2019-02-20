import { Component, OnInit } from "@angular/core";
import { Group } from "../Group";
import { RecentGroupService } from "../recent-group.service";
import { GroupService } from "../group.service";

@Component({
  selector: "app-all-groups",
  templateUrl: "./all-groups.page.html",
  styleUrls: ["./all-groups.page.scss"]
})
export class AllGroupsPage implements OnInit {
  allGroups: Group[];

  constructor(private groupService: GroupService) {}

  ngOnInit() {
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
