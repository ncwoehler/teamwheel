import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TeamCardMemberActionsComponent } from "./team-card-member-actions.component";
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
import { RouterModule } from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("TeamCardMemberActionsComponent", () => {
  let component: TeamCardMemberActionsComponent;
  let fixture: ComponentFixture<TeamCardMemberActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamCardMemberActionsComponent],
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
        RouterModule.forChild([])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [TranslateService, TranslateStore, TranslateLoader, TranslateCompiler]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCardMemberActionsComponent);
    component = fixture.componentInstance;
    component.otherTeams = [];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
