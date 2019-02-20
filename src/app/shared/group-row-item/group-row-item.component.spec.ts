import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRowItemComponent } from './group-row-item.component';

describe('GroupRowItemComponent', () => {
  let component: GroupRowItemComponent;
  let fixture: ComponentFixture<GroupRowItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupRowItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
