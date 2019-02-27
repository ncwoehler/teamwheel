import { Component, OnInit } from "@angular/core";
import { Draw } from "../../../domain/Draw";
import { DrawService } from "../../../services/draw.service";
import {
  AlertController,
  LoadingController,
  NavController
} from "@ionic/angular";
import { GroupService } from "../../../services/group.service";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-draw-show",
  templateUrl: "./draw-show.page.html",
  styleUrls: ["./draw-show.page.scss"]
})
export class DrawShowPage {
  draw: Draw;
  loading: boolean;

  constructor(
    private drawService: DrawService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    public loadingController: LoadingController
  ) {}

  ionViewWillEnter() {
    this.loading = true;
    this.translateService.get("loading").subscribe(translation => {
      this.loadingController
        .create({
          message: translation
        })
        .then(l => {
          l.present();
          this.loadData()
            .catch(value => console.error(value)) // TODO error handling
            .finally(() => {
              this.loadingController.dismiss();
              this.loading = false;
            });
        });
    });
  }

  async loadData() {
    const drawId: string = this.route.snapshot.paramMap.get("drawId");
    this.draw = await this.drawService.getDrawById(drawId);
    console.info(this.draw);
  }
}
