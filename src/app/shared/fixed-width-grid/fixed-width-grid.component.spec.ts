import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FixedWidthGridComponent } from "./fixed-width-grid.component";

describe("FixedWidthGridComponent", () => {
  let component: FixedWidthGridComponent;
  let fixture: ComponentFixture<FixedWidthGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FixedWidthGridComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedWidthGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
