import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SettingsService } from './services/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

declare var Appsee: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private settingsService: SettingsService,
    private translateService: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const appseeInstalled: boolean = typeof Appsee !== 'undefined';
      if (appseeInstalled) {
        if (environment.production) {
          Appsee.start('0348edf890704229a089c62fc9e9083e');
        } else {
          Appsee.start('e0be93f64d1d419ea0df7491e783032c');
        }
      }
      this.settingsService.appseeActive = appseeInstalled;
    });
    this.settingsService.initialize();
    this.loadAppPages();
    this.translateService.onLangChange.subscribe(() => this.loadAppPages());
  }

  loadAppPages() {
    this.translateService
      .get(['menuHome', 'menuGroups', 'menuSettings'])
      .subscribe(translation => {
        this.appPages = [
          {
            title: translation.menuHome,
            url: '/home',
            icon: 'home'
          },
          {
            title: translation.menuGroups,
            url: '/groups/all',
            icon: 'people'
          },
          {
            title: translation.menuSettings,
            url: '/settings',
            icon: 'settings'
          }
        ];
      });
  }
}
