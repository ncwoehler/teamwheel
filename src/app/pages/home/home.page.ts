import { Component, OnInit } from '@angular/core';

import { Group } from '../../domain/Group';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  recentGroups: Group[];

  constructor(private groupService: GroupService) {}

  ionViewWillEnter() {
    this.getRecentGroups();
  }

  getRecentGroups(): void {
    this.groupService
      .getRecentGroupsInOrder()
      .then(data => (this.recentGroups = data))
      .catch(value => console.error(value)); // TODO error handling
  }
}
