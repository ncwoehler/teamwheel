import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TeamCardMemberActionsComponent } from "./team-card-member-actions.component";

describe("TeamCardMemberActionsComponent", () => {
  let component: TeamCardMemberActionsComponent;
  let fixture: ComponentFixture<TeamCardMemberActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamCardMemberActionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCardMemberActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
