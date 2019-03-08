import { Component } from "@angular/core";
import { GroupService } from "../../../services/group.service";
import { Group } from "../../../domain/Group";
import { ActivatedRoute } from "@angular/router";
import {
  AlertController,
  LoadingController,
  NavController
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Draw } from "../../../domain/Draw";
import { DrawService } from "../../../services/draw.service";
import { map, mergeMap, toArray } from "rxjs/operators";

@Component({
  selector: "app-group",
  templateUrl: "./group-detail-page.component.html",
  styleUrls: ["./group-detail-page.component.scss"]
})
export class GroupDetailPage {
  group: Group;
  draws: Draw[];
  loading: boolean;

  constructor(
    private groupService: GroupService,
    private drawService: DrawService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private navController: NavController,
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
          this.loadData();
        });
    });
  }

  loadData() {
    const groupId: string = this.route.snapshot.paramMap.get("groupId");
    this.groupService
      .getGroupById(groupId)
      .pipe(
        mergeMap(group => {
          this.group = group;
          return this.drawService.loadAllDrawsByGroupId(groupId).pipe(
            toArray(),
            map(draws => draws.sort((d1, d2) => d2.createdAt - d1.createdAt))
          );
        })
      )
      .subscribe(draws => (this.draws = draws));
  }

  async initDeletion() {
    const alert = await this.alertController.create({
      header: this.translateService.instant("groupDetails.deleteHeader"),
      message: this.translateService.instant("groupDetails.deleteMsg"),
      buttons: [
        {
          text: this.translateService.instant("groupDetails.deleteCancel"),
          role: "cancel",
          cssClass: "cancel"
        },
        {
          text: this.translateService.instant("groupDetails.deleteConfirm"),
          handler: () => {
            this.groupService.deleteGroup(this.group.id).subscribe(
              () => this.openGroupsOverview(),
              error => console.error(error) // TODO error handling
            );
          }
        }
      ]
    });

    await alert.present();
  }

  openGroupsOverview() {
    this.navController.navigateRoot(["groups", "all"]);
  }
}
