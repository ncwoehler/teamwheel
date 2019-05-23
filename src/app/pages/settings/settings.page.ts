import { Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { AlertController, NavController } from "@ionic/angular";
import { SettingsService } from "../../services/settings.service";
import { Settings } from "../../domain/Settings";
import { TranslateService } from "@ngx-translate/core";
import { DrawService } from "../../services/draw.service";

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
    private drawService: DrawService,
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
    // delete groups
    const allGroups = await this.groupService.getAllGroups();
    await Promise.all(
      allGroups.map(group => this.groupService.deleteGroup(group.id))
    );

    // delete draws
    const allDraws = await this.drawService.loadAllDraws();
    await Promise.all(
      allDraws.map(draw => this.drawService.deleteDraw(draw.id))
    );

    await this.settingsService.deleteSettings();
    this.nav.navigateRoot("home");
  }

  languageChanged($event) {
    this.settings.language = $event.detail.value;
    this.settingsService.changeLanguage(this.settings.language);
  }
}
