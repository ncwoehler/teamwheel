import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DrawDisplayComponent } from "./draw-display.component";
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
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";


describe("DrawDisplayComponent", () => {
  let component: DrawDisplayComponent;
  let fixture: ComponentFixture<DrawDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawDisplayComponent],
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
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [TranslateService, TranslateStore, TranslateLoader, TranslateCompiler]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
