import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DrawDisplayComponent } from "./draw-display.component";


describe("DrawDisplayComponent", () => {
  let component: DrawDisplayComponent;
  let fixture: ComponentFixture<DrawDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawDisplayComponent]
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
