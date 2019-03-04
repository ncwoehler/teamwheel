import { Component, OnInit } from "@angular/core";

import { Group } from "../../domain/Group";
import { RecentGroupService } from "../../services/recent-group.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  recentGroups: Group[];

  constructor(private recentGroupService: RecentGroupService) {}

  ionViewWillEnter() {
    this.getRecentGroups();
  }

  getRecentGroups(): void {
    this.recentGroupService.getRecentGroupsInOrder().subscribe(
      next => (this.recentGroups = next),
      error1 => console.error(error1) // TODO error handling
    );
  }
}
