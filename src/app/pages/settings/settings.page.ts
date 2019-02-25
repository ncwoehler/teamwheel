import { Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { AlertController, NavController } from "@ionic/angular";
import { SettingsService } from "../../services/settings.service";
import { Settings } from "../../domain/Settings";
import set = Reflect.set;
import { TranslateService } from "@ngx-translate/core";

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
    private alertController: AlertController,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.settingsService.loadSettings().then(settings => {
      this.settings = settings;
    });
  }

  async deleteAllData() {
    const alert = await this.alertController.create({
      header: this.translateService.instant("settings.deleteAllHeader"),
      message: this.translateService.instant("settings.deleteAllMsg"),
      buttons: [
        {
          text: this.translateService.instant("settings.deleteCancel"),
          role: "cancel",
          cssClass: "cancel"
        },
        {
          text: this.translateService.instant("settings.deleteConfirm"),
          handler: () => this.deleteAll()
        }
      ]
    });

    await alert.present();
  }

  private async deleteAll() {
    const allGroups = await this.groupService.getAllGroups();

    for (let group of allGroups) {
      await this.groupService.deleteGroup(group.id);
    }

    await this.settingsService.deleteSettings();
    this.nav.navigateRoot("home");
  }

  languageChanged($event) {
    this.settings.language = $event.detail.value;
    this.settingsService.changeLanguage(this.settings.language);
  }
}
