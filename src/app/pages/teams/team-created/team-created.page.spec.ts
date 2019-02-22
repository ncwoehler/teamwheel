import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCreatedPage } from './team-created.page';

describe('TeamCreatedPage', () => {
  let component: TeamCreatedPage;
  let fixture: ComponentFixture<TeamCreatedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCreatedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCreatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
