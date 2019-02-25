import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";
import { Settings } from "../domain/Settings";

const STORAGE_KEY = "settings";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  constructor(private storage: Storage, private translate: TranslateService) {
    translate.setDefaultLang("de");
    storage.ready().then(() => {
      storage.get(STORAGE_KEY).then(settings => {
        if (!settings) {
          this.storeDefaultSettings();
        } else {
          translate.use(settings.language);
        }
      });
    });
  }

  async loadSettings(): Promise<Settings> {
    return this.storage.get(STORAGE_KEY);
  }

  storeSettings(settings: Settings) {
    this.storage.set(STORAGE_KEY, settings);
  }

  private storeDefaultSettings() {
    const settings = {
      language: "en"
    };
    this.storeSettings(settings);
  }

  async changeLanguage(language: string) {
    const settings = await this.loadSettings();
    settings.language = language;
    this.storeSettings(settings);
    this.translate.use(language);
  }
}
