import { Component, OnInit } from "@angular/core";

import { Group } from "../Group";
import { RecentGroupService } from "../recent-group.service";

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
    this.recentGroupService
      .getRecentGroupsInOrder()
      .then(data => (this.recentGroups = data))
      .catch(value => console.error(value)); // TODO error handling
  }
}
