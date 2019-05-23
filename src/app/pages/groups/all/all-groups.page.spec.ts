import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AllGroupsPage } from "./all-groups.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AvatarModule } from "ngx-avatar";
import {
  TranslateCompiler,
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore
} from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";
import { IonicStorageModule } from "@ionic/storage";

describe("AllGroupsPage", () => {
  let component: AllGroupsPage;
  let fixture: ComponentFixture<AllGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllGroupsPage],
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AvatarModule.forRoot(),
        TranslateModule.forChild(
          {
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }
        ),
        IonicStorageModule.forRoot(),
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [TranslateService, TranslateStore, TranslateLoader, TranslateCompiler]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
