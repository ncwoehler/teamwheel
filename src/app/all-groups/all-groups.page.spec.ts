import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AllGroupsPage } from "./all-groups.page";

describe("AllGroupsPage", () => {
  let component: AllGroupsPage;
  let fixture: ComponentFixture<AllGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllGroupsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
