import { Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  constructor(
    private groupService: GroupService,
    private nav: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async deleteAllData() {
    const alert = await this.alertController.create({
      header: `Alle Daten löschen`,
      message:
        "<b style='color: #dc3545'>WARNUNG:</b><br/> Dieser Schritt kann NICHT rückgängig gemacht werden.",
      buttons: [
        {
          text: "Abbrechen",
          role: "cancel",
          cssClass: "cancel"
        },
        {
          text: "Alles löschen",
          handler: () => {
            this.groupService.getAllGroups().then(groups => {
              groups.forEach(group => this.groupService.deleteGroup(group.id));
              this.nav.navigateRoot("home");
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
