import { TestBed } from "@angular/core/testing";

import { SettingsService } from "./settings.service";
import { IonicStorageModule } from "@ionic/storage";
import {
  TranslateCompiler,
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore
} from "@ngx-translate/core";

describe("SettingsService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicStorageModule.forRoot(),
      TranslateModule.forChild(
        {
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }
      ),
    ],
    providers: [TranslateService, TranslateStore, TranslateLoader, TranslateCompiler]
  }));

  it("should be created", () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service).toBeTruthy();
  });
});
