import { Component, OnInit } from "@angular/core";

import { Group } from "../../domain/Group";
import { GroupService } from "../../services/group.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  recentGroups: Group[];

  constructor(private groupService: GroupService) {}

  ionViewWillEnter() {
    this.getRecentGroups();
  }

  getRecentGroups(): void {
    this.groupService.getRecentGroupsInOrder().subscribe(recentGroups => {
      this.recentGroups = recentGroups;
    });
  }
}
