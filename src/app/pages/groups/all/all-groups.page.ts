import { Component } from "@angular/core";
import { Group } from "../../../domain/Group";
import { GroupService } from "../../../services/group.service";
import { map, tap, toArray } from "rxjs/operators";

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
      .pipe(
        tap(values => console.info(values)),
        toArray(),
        map(data => data.sort((a, b) => a.name.localeCompare(b.name)))
      )
      .subscribe(next => (this.allGroups = next));
  }
}
