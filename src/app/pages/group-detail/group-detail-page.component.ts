import { Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { Group } from "../../domain/Group";
import { ActivatedRoute } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-group",
  templateUrl: "./group-detail-page.component.html",
  styleUrls: ["./group-detail-page.component.scss"]
})
export class GroupDetailPage {
  group: Group;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private navController: NavController,
    private translateService: TranslateService
  ) {}

  ionViewWillEnter() {
    this.getGroup();
  }

  getGroup() {
    const groupId: string = this.route.snapshot.paramMap.get("groupId");
    this.groupService
      .getGroupById(groupId)
      .then(value => (this.group = value))
      .catch(value => console.error(value)); // TODO error handling
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
            this.groupService
              .deleteGroup(this.group.id)
              .then(value => this.openGroupsOverview())
              .catch(error => console.error(error)); // TODO error handling
          }
        }
      ]
    });

    await alert.present();
  }

  openGroupsOverview() {
    this.navController.navigateRoot(["/groups", "all"]);
  }
}
