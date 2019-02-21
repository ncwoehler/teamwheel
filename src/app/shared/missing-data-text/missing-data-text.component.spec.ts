import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingDataTextComponent } from './missing-data-text.component';

describe('MissingDataTextComponent', () => {
  let component: MissingDataTextComponent;
  let fixture: ComponentFixture<MissingDataTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingDataTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingDataTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
