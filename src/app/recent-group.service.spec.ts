import { TestBed } from '@angular/core/testing';

import { RecentGroupService } from './recent-group.service';

describe('RecentGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecentGroupService = TestBed.get(RecentGroupService);
    expect(service).toBeTruthy();
  });
});
