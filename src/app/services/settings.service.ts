import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";
import { Settings } from "../domain/Settings";

const STORAGE_KEY = "settings";
const SUPPORTED_LANGS = ["en", "de"];

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  appseeActive: boolean;

  constructor(
    private storage: Storage,
    private translateService: TranslateService
  ) {}

  initialize() {
    this.translateService.setDefaultLang("en");
    this.storage.ready().then(() => {
      this.storage.get(STORAGE_KEY).then(settings => {
        if (!settings || !settings.language) {
          this.storeDefaultSettings().then(settings =>
            this.translateService.use(settings.language)
          );
        } else {
          this.translateService.use(settings.language);
        }
      });
    });
  }

  async loadSettings(): Promise<Settings> {
    return await this.storage.get(STORAGE_KEY);
  }

  async storeSettings(settings: Settings) {
    return await this.storage.set(STORAGE_KEY, settings);
  }

  async deleteSettings() {
    await this.storage.set(STORAGE_KEY, undefined);
    this.initialize();
  }

  async changeLanguage(language: string) {
    const settings = await this.loadSettings();
    settings.language = language;
    this.storeSettings(settings);
    this.translateService.use(language);
  }

  private async storeDefaultSettings(): Promise<Settings> {
    const browserLang = this.translateService.getBrowserLang();
    const defaultSettings = {
      language:
        SUPPORTED_LANGS.find(lang => lang === browserLang) || SUPPORTED_LANGS[0]
    };
    return await this.storeSettings(defaultSettings);
  }
}
