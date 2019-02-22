import { Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { Group } from "../../domain/Group";
import { ActivatedRoute } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";

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
    private navController: NavController
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
      header: `Gruppe '${this.group.name}' löschen`,
      message:
        "<b style='color: #dc3545'>WARNUNG:</b><br/> Dieser Schritt kann NICHT rückgängig gemacht werden.",
      buttons: [
        {
          text: "Abbrechen",
          role: "cancel",
          cssClass: "cancel"
        },
        {
          text: "Löschen",
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
