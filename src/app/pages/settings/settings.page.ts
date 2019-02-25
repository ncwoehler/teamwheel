import { Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { AlertController, NavController } from "@ionic/angular";
import { SettingsService } from "../../services/settings.service";
import { Settings } from "../../domain/Settings";
import set = Reflect.set;

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  settings: Settings;

  constructor(
    private settingsService: SettingsService,
    private groupService: GroupService,
    private nav: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.settingsService.loadSettings().then(settings => {
      this.settings = settings;
    });
  }

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
          handler: () => this.deleteAllGroups()
        }
      ]
    });

    await alert.present();
  }

  private async deleteAllGroups() {
    const allGroups = await this.groupService.getAllGroups();

    for (let group of allGroups) {
      await this.groupService.deleteGroup(group.id);
    }

    this.nav.navigateRoot("home");
  }

  languageChanged($event) {
    this.settings.language = $event.detail.value;
    this.settingsService.changeLanguage(this.settings.language);
  }
}
