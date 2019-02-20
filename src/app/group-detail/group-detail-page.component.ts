import { Component, OnInit } from "@angular/core";
import { GroupService } from "../group.service";
import { Group } from "../Group";
import { ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-group",
  templateUrl: "./group-detail-page.component.html",
  styleUrls: ["./group-detail-page.component.scss"]
})
export class GroupDetailPage implements OnInit {
  private group: Group;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit() {
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
      header: `'${this.group.name}' löschen`,
      message:
        "<b style='color: red'>WARNUNG:</b><br/> Dieser Schritt kann NICHT rückgängig gemacht werden.",
      buttons: [
        {
          text: "Abbrechen",
          role: "cancel",
          cssClass: "cancel"
        },
        {
          text: "Löschen",
          handler: () => {
            this.groupService.deleteGroup(this.group.id)
                .then(value => console.info(value))
                .catch(error => console.error(error));
          }
        }
      ]
    });

    await alert.present();
  }
}
