import { Component } from '@angular/core';
import { DrawService } from '../../../services/draw.service';
import { Draw } from '../../../domain/Draw';
import { NavController } from '@ionic/angular';
import { Group } from '../../../domain/Group';
import { GroupService } from '../../../services/group.service';

@Component({
  selector: 'app-team-created',
  templateUrl: './team-created.page.html',
  styleUrls: ['./team-created.page.scss']
})
export class TeamCreatedPage {
  draw: Draw;
  group: Group;
  reorderingEnabled = false;

  constructor(
    private drawService: DrawService,
    private groupService: GroupService,
    private nav: NavController
  ) {}

  ionViewWillEnter() {
    this.draw = this.drawService.getLastDraw();
    this.groupService
      .getGroupById(this.draw.groupId)
      .then(group => (this.group = group))
      .catch(error => console.error(error)); // TODO error handling
  }

  reshuffle() {
    this.drawService.reshuffle().then(draw => {
      this.drawService.setLastDraw(draw);
      this.draw = draw;
    });
  }

  saveDraw() {
    this.drawService.saveDraw(this.draw).then(draw =>
      this.nav.navigateRoot(['draws', this.draw.id], {
        animated: true
      })
    );
  }

  toggleReordering() {
    this.reorderingEnabled = !this.reorderingEnabled;
  }
}
