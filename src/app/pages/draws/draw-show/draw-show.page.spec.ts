import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DrawShowPage } from "./draw-show.page";

describe("DrawShowPage", () => {
  let component: DrawShowPage;
  let fixture: ComponentFixture<DrawShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawShowPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
