import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NoGroupComponent } from "./no-group.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";

describe("NoGroupComponent", () => {
  let component: NoGroupComponent;
  let fixture: ComponentFixture<NoGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoGroupComponent],
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
