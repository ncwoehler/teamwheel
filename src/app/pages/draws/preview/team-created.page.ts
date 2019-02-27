import { Component } from "@angular/core";
import { DrawService } from "../../../services/draw.service";
import { Draw } from "../../../domain/Draw";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-team-created",
  templateUrl: "./team-created.page.html",
  styleUrls: ["./team-created.page.scss"]
})
export class TeamCreatedPage {
  draw: Draw;

  constructor(private drawService: DrawService, private nav: NavController) {}

  ionViewWillEnter() {
    this.draw = this.drawService.getLastDraw();
  }

  reshuffle() {
    this.drawService.reshuffle().then(draw => {
      this.drawService.setLastDraw(draw);
      this.draw = draw;
    });
  }

  saveDraw() {
    this.drawService.saveDraw(this.draw).then(draw =>
      this.nav.navigateRoot(["groups", this.draw.groupId], {
        animated: true
      })
    );
  }

  setDrawName(drawName: string) {
    this.draw.name = drawName;
  }
}
