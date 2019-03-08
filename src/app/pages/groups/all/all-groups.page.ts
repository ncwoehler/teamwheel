import { Component, OnDestroy, OnInit } from "@angular/core";
import { Group } from "../../../domain/Group";
import { GroupService } from "../../../services/group.service";
import { map, toArray } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-all-groups",
  templateUrl: "./all-groups.page.html",
  styleUrls: ["./all-groups.page.scss"]
})
export class AllGroupsPage {
  allGroups$: Observable<Group[]>;

  constructor(private groupService: GroupService) {}

  ionViewWillEnter() {
    this.getAllGroups();
  }

  getAllGroups(): void {
    this.allGroups$ = this.groupService.getAllGroups().pipe(
      toArray(),
      map(data => data.sort((a, b) => a.name.localeCompare(b.name)))
    );
  }
}
