import { Component, OnDestroy, OnInit } from "@angular/core";
import { Group } from "../../../domain/Group";
import { RecentGroupService } from "../../../services/recent-group.service";
import { GroupService } from "../../../services/group.service";
import { toArray } from "rxjs/operators";

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
      .pipe(toArray())
      .subscribe(
        data => {
          this.allGroups = data;
        },
        error1 => console.error(error1) // TODO error handling
      );
  }
}
