import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TeamCardComponent } from "./team-card.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  TranslateCompiler, TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore
} from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AvatarModule } from "ngx-avatar";
import { RouterModule } from "@angular/router";
import { Draw } from "../../domain/Draw";
import { Group } from "../../domain/Group";
import { Team } from "../../domain/Team";
import { Member } from "../../domain/Member";

describe("TeamCardComponent", () => {
  let component: TeamCardComponent;
  let fixture: ComponentFixture<TeamCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamCardComponent],
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
    fixture = TestBed.createComponent(TeamCardComponent);
    component = fixture.componentInstance;
    const member : Member = new Member("id", "Name");
    component.group = new Group("id", "Group", "", [member]);
    component.team = new Team("id", "Team", [member]);
    component.draw = new Draw("id", "groupId", "Draw", [component.team]);
    component.allowEdit = false;
    component.allowReorder = false;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
