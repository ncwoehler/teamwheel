import { TestBed } from '@angular/core/testing';

import { DrawService } from './draw.service';
import { IonicStorageModule } from '@ionic/storage';

describe('DrawService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicStorageModule.forRoot(),
    ]
  }));

  it('should be created', () => {
    const service: DrawService = TestBed.get(DrawService);
    expect(service).toBeTruthy();
  });
});
